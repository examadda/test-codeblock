import React,
{
    useState,
    useMemo,
    useCallback
}
    from "react";

import { NodeViewWrapper }
    from "@tiptap/react";

import Editor
    from "@monaco-editor/react";


const CodeGroupNodeViews =
    ({
        node,
        updateAttributes
    }) => {

        /*
          Languages from TipTap node
        */

        const languages =
            node.attrs.languages || {};

        /*
          Edit mode state
        */

        const [isEditable,
            setIsEditable] =
            useState(false);

        /*
          Active language
          Default = first language
        */

        const initialLang =
            useMemo(() => {

                const keys =
                    Object.keys(languages);

                return keys.length
                    ? keys[0]
                    : "javascript";

            },
                [languages]);

        const [activeLang,
            setActiveLang] =
            useState(initialLang);

        /*
          Output state
        */

        const [output,
            setOutput] =
            useState("");

        const [isRunning,
            setIsRunning] =
            useState(false);

        const [copied,
            setCopied] =
            useState(false);

        /*
          Update code in TipTap document
        */

        const updateCode =
            useCallback(
                (value) => {

                    updateAttributes({

                        languages:
                        {
                            ...languages,

                            [activeLang]:
                                value || ""

                        }

                    });

                },
                [
                    activeLang,
                    languages,
                    updateAttributes
                ]);

        /*
          Copy code
        */

        const copyCode =
            async () => {

                await navigator.clipboard
                    .writeText(
                        languages[activeLang] || ""
                    );

                setCopied(true);

                setTimeout(
                    () => setCopied(false),
                    1500
                );

            };

        /*
          Run code
        */

        const runCode =
            async () => {

                try {

                    setIsRunning(true);

                    setOutput("Running...");

                    const runRes =
                        await fetch(
                            "http://ide.examadda.org:8000/run",
                            {
                                method: "POST",

                                headers:
                                {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({
                                        language:
                                            activeLang,

                                        code:
                                            languages[
                                            activeLang
                                            ]
                                    })
                            });

                    const runData =
                        await runRes.json();
                    const runId = runData.data.jobId;

                    if (!runId) {
                        throw new Error("Job ID not received");
                    }


                    let result;
                    let count =0

                    while (count< 1 && true) {
                        count=count+1
                        const res =
                            await fetch(
                                `http://ide.examadda.org:8000/result/${runId}`
                            );

                        result =
                            await res.json();

                        if (
                            result.status ===
                            "completed"
                        )
                            break;

                        await new Promise(
                            r =>
                                setTimeout(r, 2000)
                        );

                    }

                    setOutput(
                        result.output ||
                        "No output"
                    );

                }
                catch {

                    setOutput(
                        "Execution failed"
                    );

                }
                finally {

                    setIsRunning(false);

                }

            };

        /*
          Enable edit mode
        */

        const enableEdit =
            () =>
                setIsEditable(true);

        /*
          Render
        */

        return (

            <NodeViewWrapper
                className="codegroup"
            >

                {/* HEADER */}

                <div className="header">

                    {/* Language Tabs */}

                    <div className="tabs">

                        {

                            Object.keys(
                                languages
                            ).map(lang => (

                                <div

                                    key={lang}

                                    className={
                                        activeLang === lang
                                            ? "tab active"
                                            : "tab"
                                    }

                                    onClick={() =>
                                        setActiveLang(lang)
                                    }

                                >

                                    {lang.toUpperCase()}

                                </div>

                            ))

                        }

                    </div>

                    {/* Actions */}

                    <div className="actions">

                        <button
                            onClick={
                                copyCode
                            }
                        >

                            {
                                copied
                                    ? "Copied"
                                    : "Copy"
                            }

                        </button>

                        <button
                            onClick={
                                runCode
                            }

                            disabled={
                                isRunning
                            }
                        >

                            {
                                isRunning
                                    ? "Running..."
                                    : "Run"
                            }

                        </button>

                        {

                            !isEditable &&

                            <button
                                onClick={
                                    enableEdit
                                }
                            >
                                Edit
                            </button>

                        }

                    </div>

                </div>

                {/* MONACO EDITOR */}

                <Editor

                    height="350px"

                    theme="vs-dark"

                    language={
                        activeLang
                    }

                    value={
                        languages[
                        activeLang
                        ]
                    }

                    onChange={
                        updateCode
                    }

                    options={{
                        readOnly:
                            !isEditable,

                        fontSize: 14,

                        minimap: {
                            enabled: false
                        },

                        automaticLayout: true,

                        wordWrap: "on"

                    }}

                />

                {/* OUTPUT */}

                {

                    output &&

                    <div className="output">

                        <pre>
                            {output}
                        </pre>

                    </div>

                }

            </NodeViewWrapper>

        );

    };

export default
    React.memo(
        CodeGroupNodeViews
    );
