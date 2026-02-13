import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import { NodeViewWrapper } from "@tiptap/react";
import Editor from "@monaco-editor/react";

const CodeGroupNodeViews = ({ node, updateAttributes }) => {

  const languages = node.attrs.languages || {};
  const [isEditable, setIsEditable] = useState(false);

  const preferred = localStorage.getItem("preferred_language");

  const initialLang = useMemo(() => {
    if (preferred && languages[preferred]) return preferred;
    return Object.keys(languages)[0];
  }, [languages, preferred]);

  const [activeLang, setActiveLang] = useState(initialLang);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem("preferred_language", activeLang);
  }, [activeLang]);

  const updateCode = useCallback(
    (value) => {

      updateAttributes({
        languages: {
          ...languages,
          [activeLang]: value || "",
        },
      });

    },
    [activeLang, languages, updateAttributes]
  );

  const copyCode = async () => {

    await navigator.clipboard.writeText(
      languages[activeLang] || ""
    );

    setCopied(true);

    setTimeout(() => setCopied(false), 1500);

  };


  const runCode = async () => {

    try {

      setIsRunning(true);
      setOutput("Running...");

      const runRes = await fetch(
        "http://ide.examadda.org/run",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            language: activeLang,
            code: languages[activeLang],
          }),
        }
      );

      const runData = await runRes.json();

      const id = runData.id;

      let result;

      while (true) {

        const res = await fetch(
          `http://ide.examadda.org/result/${id}`
        );

        result = await res.json();

        if (result.status === "completed")
          break;

        await new Promise(r =>
          setTimeout(r, 1000)
        );

      }

      setOutput(result.output || "No output");

    }
    catch {

      setOutput("Execution failed");

    }
    finally {

      setIsRunning(false);

    }

  };


  const enableEdit = () => {
    setIsEditable(true);
  };
  return (

    <NodeViewWrapper className="codegroup">

      <div className="header">

        <div className="tabs">

          {Object.keys(languages).map(lang => (

            <div
              key={lang}
              className={`tab ${activeLang === lang ? "active" : ""}`}
              onClick={() => setActiveLang(lang)}
            >
              {lang.toUpperCase()}
            </div>

          ))}

        </div>

        <div className="actions">

          <button onClick={copyCode}>
            {copied ? "Copied" : "Copy"}
          </button>

          <button
            onClick={runCode}
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "Run"}
          </button>


          {!isEditable && (

            <button onClick={enableEdit}>
              Edit
            </button>
          )}
        </div>

      </div>

      <Editor
        height="350px"
        theme="vs-dark"
        language={activeLang}
        value={languages[activeLang]}
        onChange={updateCode}
        options={{
          readOnly: !isEditable, // KEY LINE
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
          wordWrap: "on",
        }}
      />

      {output && (

        <div className="output">
          <pre>{output}</pre>
        </div>

      )}

    </NodeViewWrapper>

  );

};

export default React.memo(CodeGroupNodeViews);
