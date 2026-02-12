import React from "react";
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import lowlight from "../../lib/editorLanguages";
import EditorToolbar from "./EditorToolbar";
import CodeBlockComponent from "./CodeBlockComponent";

import "highlight.js/styles/atom-one-dark.css";
import "./editor.css";

const RichTextEditor = ({ onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }).extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }),
    ],
    content: "<p>Start writing your professional article...</p>",
    onUpdate({ editor }) {
      onChange && onChange(editor.getHTML());
    },
  });

  return (
    <div className="editor-container">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
};

export default RichTextEditor;
