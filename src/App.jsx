import { useState } from "react";
import RichTextEditor from "./components/editor/RichTextEditor";

function App() {
  const [content, setContent] = useState("");

  return (
    <div>
      <RichTextEditor onChange={setContent} />

      <div
        style={{
          maxWidth: "950px",
          margin: "40px auto",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "16px",
        }}
      >
        <h2>Live Preview</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

export default App;
