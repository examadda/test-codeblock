import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CodeGroupExtension } from "../../extensions/CodeGroupExtension";
import "./editor.css";

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, CodeGroupExtension],
    content: "<p>Write your DSA blog post...</p>",
  });

  const insertCodeGroup = () => {
    editor
      .chain()
      .focus()
      .insertContent({
        type: "codeGroup",
        attrs: {
          languages: {
          python: "",
          java: "",
          },
        },
      })
      .run();
  };

  return (
    <div className="editor-wrapper">
      <button className="add-btn" onClick={insertCodeGroup}>
        Add Multi-Language Code Block
      </button>

      <div className="editor-content">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;
