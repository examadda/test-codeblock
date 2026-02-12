import React, { useState } from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

const CodeBlockComponent = ({ node }) => {
  const [copied, setCopied] = useState(false);

  const language = node.attrs.language || "plaintext";

  const copyCode = async () => {
    const text = node.textContent;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <NodeViewWrapper className="codeblock-wrapper">
      <div className="codeblock-header">
        <span className="codeblock-language">{language}</span>
        <button className="copy-button" onClick={copyCode}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <pre className="codeblock-body">
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
