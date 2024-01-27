import { useEffect, useState } from "react";
import { useFile } from "../lib/store";
import DragDrop from "./DragDrop";

export default function FileUpload() {
  const {
    fileName,
    fileContent,
    fileStatus,
    setFileContent,
    setFileName,
    setFileStatus,
  } = useFile();

  const [lines, setLines] = useState(0);
  const [lineTranslated, setLineTranslated] = useState(1);

  const file_upload = (e: File) => {
    if (e) {
      setFileStatus("loading");
      setFileName(e?.name.split(".")[0]);

      const reader = new FileReader();
      reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
        // check if readerEvent is not null - just to fix typescript error
        if (readerEvent?.target?.result) {
          setFileContent(readerEvent.target.result);
          setFileStatus("loading");
        }
      };

      reader.readAsText(e);
    }
  };

  const startTranslation = async () => {
    if (fileStatus == "loading" && typeof fileContent === "string") {
      setFileStatus("complete");
      const lines = fileContent.split("\n");

      setLines(lines.length);

      for (let i = 2; i < lines.length; i++) {
        setLineTranslated(i);
        if (lines[i].length == 0) {
          i += 2;
        } else {
          const translated = await translate(lines[i]);
          try {
            lines[i] = translated?.translation.toString();
          } catch (error) {
            console.log(error);
          }
        }
      }

      setFileContent(lines.join("\n"));
      setFileStatus("complete");
    } else {
      alert("file not loaded successfully");
    }
  };

  async function translate(line: string) {
    const result = await fetch(
      "https://translator-api.glosbe.com/translateByLangWithScore?sourceLang=en&targetLang=ckb",
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.6",
          "content-type": "text/plain;charset=UTF-8",
          "sec-ch-ua":
            '"Not_A Brand";v="8", "Chromium";v="120", "Brave";v="120"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "sec-gpc": "1",
          Referer: "https://glosbe.com/",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: line,
        method: "POST",
      }
    );
    const ready = await result.json();
    return ready;
  }

  const downloadFile = () => {
    // Create element with <a> tag
    const link = document.createElement("a");

    // Create a blog object with the file content which you want to add to the file
    const file = new Blob([fileContent], { type: "text/plain" });

    // Add file content in the object URL
    link.href = URL.createObjectURL(file);

    // Add file name
    link.download = "translated.srt";

    // Add click event to <a> tag to save file.
    link.click();
    URL.revokeObjectURL(link.href);
  };
  return (
    <div className="flex flex-col gap-5 h-full justify-center items-center">
      {/* File name */}
      {fileName && <p>ناوی فایل: {fileName}</p>}

      {/* Drag Drop */}
      <DragDrop onFileSelect={file_upload} />

      {/* Status */}
      <div>
        <p className={fileStatus === "complete" ? "hidden" : ""}>
          {fileStatus == "noFile" ? "هیج فایەلەک دەستنیشان نەکراوە" : ""}
          {fileStatus == "loading" ? "فایەلەکە وا دەکرێتەوە" : ""}
          {fileStatus == "complete" ? "فایەلەکە کراوەتەوە" : ""}
        </p>

        <p
          className={
            fileStatus === "complete" ? "text-xl md:text-3xl" : "hidden"
          }
          dir="rtl"
        >
          {lineTranslated} دێر وەرگێراوە لە {lines} دێرە
        </p>
      </div>

      {/* Download */}
      <button
        onClick={downloadFile}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer disabled:bg-gray-400"
      >
        دابەزاندن
      </button>
      <p className={fileStatus === "complete" ? "" : "hidden"}>
        {/* Refresh */}
        <button
          onClick={() => window.location.reload()}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer disabled:bg-gray-400"
        >
          ژێرنووسی تر وەرگێرە
        </button>
      </p>

      {/* Translate */}
      <button
        onClick={startTranslation}
        disabled={fileStatus != "loading"}
        className={
          "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer disabled:bg-gray-400"
        }
      >
        وەرگێران
      </button>
    </div>
  );
}
