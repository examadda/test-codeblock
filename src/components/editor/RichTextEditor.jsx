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

  return (
    <div>
      <button onClick={insertCodeGroup}>
        Add Code Block

      </button>

      <EditorContent editor={editor} />

    </div>

  );

};

export default RichTextEditor;
