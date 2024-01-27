import Container from "./components/Container";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <Container>
      <div className="flex flex-col md:flex-row  text-white gap-3">
        <FileUpload />
      </div>
    </Container>
  );
}

export default App;
