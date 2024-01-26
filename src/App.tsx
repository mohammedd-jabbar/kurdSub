import FileUpload from "./components/FileUpload";

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
