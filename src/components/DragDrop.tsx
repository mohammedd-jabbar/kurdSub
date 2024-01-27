/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDropzone } from "react-dropzone";

export default function DragDrop({ onFileSelect }: any) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/srt": [".srt", ".vtt"],
    },
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        onFileSelect(selectedFile);
      }
    },

    multiple: false, // Allow only one file
  });

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.name}>
  //     {file.name} - {file.size} bytes
  //   </li>
  // ));

  return (
    <div
      {...getRootProps()}
      className={`bg-gray-800 text-white border-dashed border-2 border-gray-600 rounded-lg p-8 text-center cursor-pointer ${
        isDragActive ? "bg-gray-700 border-blue-400" : ""
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-lg">
        {isDragActive
          ? "فایلەکە لێرە دابنێ"
          : "فایلی وەرگێرانەکەت (سەبتاتیتڵەکەت) ڕابکێشە بۆ ئێرە، یان کلیک بکە بۆ هەڵبژاردنی فایلەکە"}
      </p>
    </div>
  );
}
