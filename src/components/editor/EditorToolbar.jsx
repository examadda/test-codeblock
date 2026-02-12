import React from "react";
import { supportedLanguages } from "../../lib/editorLanguages";

const EditorToolbar = ({ editor }) => {
  if (!editor) return null;

  const insertCode = (language) => {
    editor.chain().focus().toggleCodeBlock({ language }).run();
  };

  return (
    <div className="editor-toolbar">
      <button
        className={editor.isActive("bold") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        Bold
      </button>

      <button
        className={editor.isActive("italic") ? "active" : ""}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        Italic
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        H2
      </button>

      <select onChange={(e) => insertCode(e.target.value)}>
        <option value="">Insert Code</option>
        {supportedLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EditorToolbar;
