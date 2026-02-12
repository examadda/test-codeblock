import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import CodeGroupNode from "../components/editor/CodeGroupNode";

export const CodeGroupExtension = Node.create({
  name: "codeGroup",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      languages: {
        default: {
          python: "",
          java: "",
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
    return ReactNodeViewRenderer(CodeGroupNode);
  },
});
