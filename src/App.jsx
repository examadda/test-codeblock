import React from "react";
import RichTextEditor from "./components/editor/RichTextEditor";

export default function App() {
  return (
    <div style={{
      background: "#0f172a",
      minHeight: "100vh",
      padding: "20px",
      color: "white"
    }}>

      <RichTextEditor />
    </div>
  );
}
