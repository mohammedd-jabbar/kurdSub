import { useState } from "react";
import FileDownload from "./components/fileDownload";
import FileUpload from "./components/fileUpload";
import Status from "./components/status";

function App() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col md:flex-row  text-white gap-3">
  
        <FileUpload />
      </div>
    </>
  );
}

export default App;
