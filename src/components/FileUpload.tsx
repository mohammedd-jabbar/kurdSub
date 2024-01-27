import { useState } from "react";
import { useFile } from "../lib/store";
import DragDrop from "./DragDrop";
import { translate } from "../lib/hooks";

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

  const onUploadFile = (eventTargetFile: File) => {
    if (eventTargetFile) {
      setFileStatus("fileIsReady");
      setFileName(eventTargetFile?.name.split(".")[0]);

      const reader = new FileReader();
      reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
        // check if readerEvent is not null - just to fix typescript error
        if (readerEvent?.target?.result) {
          setFileContent(readerEvent.target.result);
        }
      };

      reader.readAsText(eventTargetFile);
    }
  };

  const onRemove = () => {
    setFileStatus("noFile");
    setFileName("");
    setFileContent("");
  };

  const onTranslate = async () => {
    if (fileStatus == "fileIsReady" && typeof fileContent === "string") {
      setFileStatus("loading");
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

  const onDownload = () => {
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
  console.log(fileContent, fileName, fileStatus);
  return (
    <div className="max-w-lg mx-auto p-6 border-4 border-blue-500 rounded-md shadow-lg">
      {/* File Name */}

      <p className="text-lg font-bold mb-4 text-blue-500">
        ناوی فایل: {fileName || "(بەتاڵ)"}
      </p>

      {/* Drag and Drop */}
      <DragDrop onFileSelect={onUploadFile} />

      {/* Status */}
      <p
        className={fileStatus === "complete" ? "text-xl md:text-3xl" : "hidden"}
        dir="rtl"
      >
        {lineTranslated} دێر وەرگێراوە لە {lines} دێرە
      </p>

      <div className="flex items-center justify-start gap-4">
        {/* Translate Button */}
        <button
          onClick={onTranslate}
          disabled={fileStatus !== "fileIsReady"}
          className="bg-blue-500 text-white font-semibold py-2 px-4 border border-blue-600 rounded-md shadow-md mr-2 hover:bg-blue-600 transition duration-300 cursor-pointer hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
        >
          Translate
        </button>

        {/* Download Button */}
        <button
          onClick={onDownload}
          disabled={fileStatus !== "complete"}
          className="bg-green-500 text-white font-semibold py-2 px-4 border border-green-600 rounded-md shadow-md hover:bg-green-600 transition duration-300 cursor-pointer hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
        >
          Download
        </button>
        {/* remove file */}
        <button
          onClick={onRemove}
          disabled={fileStatus !== "complete"}
          className="bg-red-500 text-white font-semibold py-2 px-4 border border-red-600 rounded-md shadow-md hover:bg-red-600 transition duration-300 cursor-pointer hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
