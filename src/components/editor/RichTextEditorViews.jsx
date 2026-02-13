import React from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { CodeGroupExtensionView } from "../../extensions/CodeGroupExtensionview"
import { sampleDoc } from "../../data/sampleDoc";

const RichTextEditor = () => {

    const editor = useEditor({
        extensions: [
            StarterKit,
            CodeGroupExtensionView,
        ],

        content: sampleDoc, // 👈 directly load JSON
        editable: false, // when preview

    });

    if (!editor) return null;

    return (

        <div
            style={{
                background: "#0f172a",
                minHeight: "100vh",
                padding: "20px",
                color: "white",
            }}
        >

            <h2>DSA Article Preview</h2>

            <EditorContent editor={editor} />

        </div>

    );

};

export default RichTextEditor;
