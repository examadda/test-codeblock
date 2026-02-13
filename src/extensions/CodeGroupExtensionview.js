import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeGroupNodeViews from "../components/editor/CodeGroupNodeViews";

export const CodeGroupExtensionView = Node.create({
    name: "codeGroup",
    group: "block",
    atom: true,

    addAttributes() {
        return {
            languages: {
                default: {
                    python: ""
                },
            },
        };
    },

    parseHTML() {
        return [{ tag: "code-group" }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["code-group", HTMLAttributes];
    },

    addNodeView() {
        return ReactNodeViewRenderer(CodeGroupNodeViews);
    },
});
