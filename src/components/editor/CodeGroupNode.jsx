import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import { NodeViewWrapper } from "@tiptap/react";

import Editor from "@monaco-editor/react";

import { SUPPORTED_LANGUAGES } from "../../lib/supportedLanguages";

const CodeGroupNode = ({ node, updateAttributes }) => {

  const languages = node.attrs.languages || {};

  /*
   Preferred Language Persistence
  */

  const preferred = localStorage.getItem("preferred_language");

  const initialLang = useMemo(() => {

    if (preferred && languages[preferred]) return preferred;

    return Object.keys(languages)[0];

  }, [languages, preferred]);

  const [activeLang, setActiveLang] = useState(initialLang);

  const [output, setOutput] = useState("");

  const [isRunning, setIsRunning] = useState(false);

  const [copied, setCopied] = useState(false);

  /*
   Persist Language
  */

  useEffect(() => {

    localStorage.setItem("preferred_language", activeLang);

  }, [activeLang]);

  /*
   Update Code
  */

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

  /*
   Add Language
  */

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

  /*
   Remove Language
  */

  const removeLanguage = useCallback(

    (lang) => {

      const updated = { ...languages };

      delete updated[lang];

      updateAttributes({

        languages: updated,

      });

      const remaining = Object.keys(updated);

      if (remaining.length)

        setActiveLang(remaining[0]);

    },

    [languages, updateAttributes]

  );

  /*
   Copy Code
  */

  const copyCode = async () => {

    await navigator.clipboard.writeText(

      languages[activeLang] || ""

    );

    setCopied(true);

    setTimeout(() => setCopied(false), 1500);

  };

  /*
   Run Code
  */

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

      if (!id) throw Error("Invalid");

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

  /*
   Render
  */

  return (

    <NodeViewWrapper className="codegroup">

      {/* HEADER */}

      <div className="header">

        <div className="tabs">

          {

            Object.keys(languages).map(lang => (

              <div

                key={lang}

                className={`tab ${activeLang === lang ? "active" : ""}`}

                onClick={() => setActiveLang(lang)}

              >

                {lang.toUpperCase()}

                {

                  Object.keys(languages).length > 1 &&

                  <span

                    className="remove"

                    onClick={(e) => {

                      e.stopPropagation();

                      removeLanguage(lang);

                    }}

                  >

                    ×

                  </span>

                }

              </div>

            ))

          }

          <select

            className="add"

            onChange={e => {

              addLanguage(e.target.value);

              e.target.value = "";

            }}

          >

            <option value="">+ Add</option>

            {

              SUPPORTED_LANGUAGES

              .filter(

                l => !languages[l.value]

              )

              .map(lang => (

                <option

                  key={lang.value}

                  value={lang.value}

                >

                  {lang.label}

                </option>

              ))

            }

          </select>

        </div>

        <div className="actions">

          <button onClick={copyCode}>

            {copied ? "Copied" : "Copy"}

          </button>

          <button

            onClick={runCode}

            disabled={isRunning}

          >

            {

              isRunning

                ? "Running..."

                : "Run"

            }

          </button>

        </div>

      </div>

      {/* EDITOR */}

      <Editor

        height="350px"

        theme="vs-dark"

        language={activeLang}

        value={languages[activeLang]}

        onChange={updateCode}

        options={{

          fontSize: 14,

          minimap: { enabled: false },

          automaticLayout: true,

          wordWrap: "on",

        }}

      />

      {/* OUTPUT */}

      {

        output && (

          <div className="output">

            <pre>{output}</pre>

          </div>

        )

      }

    </NodeViewWrapper>

  );

};

export default React.memo(CodeGroupNode);
