import React from "react";
import RichTextEditor from "./components/editor/RichTextEditor";

function App() {
  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", padding: "4px" }}>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Industry-Level DSA Editor
      </h1>
      <RichTextEditor />
    </div>
  );
}

export default App;
