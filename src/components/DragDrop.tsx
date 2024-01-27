/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDropzone } from "react-dropzone";

export default function DragDrop({ onFileSelect }: any) {
  const { getRootProps, getInputProps } = useDropzone({
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
      className="border-dashed border-2 border-gray-300 rounded-lg p-8 text-center bg-white text-gray-500"
    >
      <input {...getInputProps()} />
      <p className="text-lg">
        Click to select a .srt file or drag and drop it here.
      </p>
    </div>
  );
}
