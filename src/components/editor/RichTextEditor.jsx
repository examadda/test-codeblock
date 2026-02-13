import React from "react";

import {
  useEditor,
  EditorContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { CodeGroupExtension } from "../../extensions/CodeGroupExtension";
import "./editor.css";
const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, CodeGroupExtension,],
    content: "<p>Write DSA article...</p>",
  });
  const insertCodeGroup = () => {
    editor.chain().focus().insertContent({
      type: "codeGroup",
      attrs: {
        languages: {
          python: "",
           java: "",
        },
      },
    }).run();
  };


  const saveDocument = async () => {
    const content = editor.getJSON();
    console.log(content, "text")
    // const contentHindi = editor.getHTML();
    // const res = await fetch("http://localhost:5000/document/save", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     id: docId,
    //     content,
    //   }),
    // });
    // const data = await res.json();
    // setDocId(data._id);
    alert("Saved");
  }

  return (
    <div>
      <button onClick={insertCodeGroup}>
        Add Code Block

      </button>
       <button onClick={saveDocument}>
        Save
      </button>

      <EditorContent editor={editor} />

    </div>

  );

};

export default RichTextEditor;
