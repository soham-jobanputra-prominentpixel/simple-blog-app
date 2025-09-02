import RichTextEditor from "./components/RichTextEditor.tsx";

function App() {
  return (
    <div className="w-full mx-auto lg:w-2/3 p-4">
      <div className="w-full h-full">
        <RichTextEditor onChange={(html) => console.log(html)} />
      </div>
    </div>
  );
}

export default App;
