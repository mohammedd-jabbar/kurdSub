import { useEffect, useState } from "react";

export default function FileUpload() {
  const [fileName, setFileName] = useState("");
  const [readingFile, setReadingFile] = useState("noFile");
  const [fileContent, setFileContent] = useState<string | ArrayBuffer>("");
  const [translationFinished, setTranslationFinished] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const [lines, setLines] = useState(0);
  const [lineTranslated, setLineTranslated] = useState(1);

  const file_upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setReadingFile("loading");
      setFileName(e.target.files[0].name.split(".")[0]);
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
          // check if readerEvent is not null - just to fix typescript error
          if (readerEvent?.target?.result) {
            setFileContent(readerEvent.target.result);
            setReadingFile("file_loaded");
          }
        };

        reader.readAsText(file);
      }
    }
  };

  const startTranslation = async () => {
    if (readingFile == "file_loaded" && typeof fileContent === "string") {
      setIsTranslating(true);
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
      setTranslationFinished(true);
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
  useEffect(() => {
    if (translationFinished) {
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
      setIsTranslating(false);
    }
  }, [fileContent, translationFinished]);

  const downloadFile = () => {
    // Create element with <a> tag
    const link = document.createElement("a");

    // Create a blog object with the file content which you want to add to the file
    const file = new Blob([fileContent], { type: "text/plain" });

    // Add file content in the object URL
    link.href = URL.createObjectURL(file);

    // Add file name
    link.download = "translated.vtt";

    // Add click event to <a> tag to save file.
    link.click();
    URL.revokeObjectURL(link.href);
  };
  return (
    <div className="flex flex-col gap-5  h-full  justify-center items-center ps-5 w-screen ">
      <div className="w-3/3 md:w-1/3">
        <img src="/headerImage.png" className="size-fit" />
      </div>

      <h1 className="text-lg md:text-3xl">
        ژێرنووسی ئنگلیزی لیرە بکە بە کوردی
      </h1>
      <p> {fileName} : فایل</p>

      <div
        className={
          isTranslating
            ? "hidden"
            : "flex items-center justify-center w-full md:w-1/3"
        }
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">کلیک بکە بۆ ئەپڵۆد</span> یاخود
              دراگ و درۆپ بکە
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              .SRT تەنها
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => {
              file_upload(e);
            }}
          />
        </label>
      </div>

      <p className={isTranslating ? "hidden" : ""}>
        {readingFile == "noFile" ? "هیج فایەلەک دەستنیشان نەکراوە" : ""}
        {readingFile == "loading" ? "فایەلەکە وا دەکرێتەوە" : ""}
        {readingFile == "file_loaded" ? "فایەلەکە کراوەتەوە" : ""}
      </p>

      <p className={isTranslating ? "text-xl md:text-3xl" : "hidden"} dir="rtl">
        {lineTranslated} دێر وەرگێراوە لە {lines} دێرە
      </p>

      <p className={translationFinished ? "" : "hidden"}>
        <button
          onClick={downloadFile}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer disabled:bg-gray-400"
        >
          دابەزاندن
        </button>
        <br />
        <br />

        <button
          onClick={() => window.location.reload()}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer disabled:bg-gray-400"
        >
          ژێرنووسی تر وەرگێرە
        </button>
      </p>

      <button
        onClick={startTranslation}
        disabled={readingFile != "file_loaded"}
        className={
          translationFinished
            ? "hidden"
            : "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer disabled:bg-gray-400"
        }
      >
        وەرگێران
      </button>
    </div>
  );
}
