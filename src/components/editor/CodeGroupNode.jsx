import React, { useState, useEffect, useMemo, useCallback } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import Editor from "@monaco-editor/react";
import { SUPPORTED_LANGUAGES } from "../../lib/supportedLanguages";

const CodeGroupNode = ({ node, updateAttributes }) => {
  const languages = node.attrs.languages || {};

  // 🔹 Preferred Language Logic
  const storedLang = localStorage.getItem("preferred_language");

  const initialLang = useMemo(() => {
    if (storedLang && languages[storedLang]) return storedLang;
    return Object.keys(languages)[0];
  }, [languages, storedLang]);

  const [activeLang, setActiveLang] = useState(initialLang);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem("preferred_language", activeLang);
  }, [activeLang]);

  // 🔹 Code Update
  const handleChange = useCallback(
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

  // 🔹 Add Language
  const addLanguage = useCallback(
    (lang) => {
      if (!lang || languages[lang]) return;

      updateAttributes({
        languages: {
          ...languages,
          [lang]: "",
        },
      });

      setActiveLang(lang);
    },
    [languages, updateAttributes]
  );

  // 🔹 Remove Language
  const removeLanguage = useCallback(
    (lang) => {
      const updated = { ...languages };
      delete updated[lang];

      updateAttributes({ languages: updated });

      const remaining = Object.keys(updated);
      if (remaining.length) setActiveLang(remaining[0]);
    },
    [languages, updateAttributes]
  );

  // 🔹 Copy Code
  const copyCode = async () => {
    await navigator.clipboard.writeText(languages[activeLang] || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // 🔥 RUN CODE (API Integration)
  const runCode = async () => {
    try {
      setIsRunning(true);
      setOutput("Running...");

      // 1️⃣ Send Run Request
      const runRes = await fetch("http://ide.examadda.org/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: activeLang,
          code: languages[activeLang] || "",
        }),
      });

      const runData = await runRes.json();

      if (!runData.id) {
        throw new Error("Invalid run response");
      }

      const runId = runData.id;

      // 2️⃣ Poll Result
      let resultData = null;

      while (true) {
        const resultRes = await fetch(
          `http://ide.examadda.org/result/${runId}`
        );
        resultData = await resultRes.json();

        if (resultData.status === "completed") break;

        await new Promise((res) => setTimeout(res, 1000));
      }

      setOutput(resultData.output || "No output");
    } catch (err) {
      console.error(err);
      setOutput("Error running code");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <NodeViewWrapper className="codegroup-container">
      {/* HEADER */}
      <div className="codegroup-header">
        <div className="tabs">
          {Object.keys(languages).map((lang) => (
            <div
              key={lang}
              className={`tab ${activeLang === lang ? "active" : ""}`}
              onClick={() => setActiveLang(lang)}
            >
              {lang.toUpperCase()}
              {Object.keys(languages).length > 1 && (
                <span
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeLanguage(lang);
                  }}
                >
                  ×
                </span>
              )}
            </div>
          ))}

          <select
            className="add-select"
            onChange={(e) => {
              addLanguage(e.target.value);
              e.target.value = "";
            }}
            value=""
          >
            <option value="" disabled>
              + Add
            </option>
            {SUPPORTED_LANGUAGES.filter(
              (l) => !languages[l.value]
            ).map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <div className="actions">
          <button className="copy-btn" onClick={copyCode}>
            {copied ? "Copied!" : "Copy"}
          </button>

          <button
            className="run-btn"
            onClick={runCode}
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      {/* MONACO EDITOR */}
      <Editor
        height="320px"
        theme="vs-dark"
        language={activeLang}
        value={languages[activeLang]}
        onChange={handleChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />

      {/* OUTPUT PANEL */}
      {output && (
        <div className="output-panel">
          <strong>Output:</strong>
          <pre>{output}</pre>
        </div>
      )}
    </NodeViewWrapper>
  );
};

export default CodeGroupNode;
