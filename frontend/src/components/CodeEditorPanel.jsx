import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { Eraser, Play, LoaderCircle, FileCode2 } from "lucide-react";

const monacoLanguageMap = {
  python: "python",
  javascript: "javascript",
  typescript: "typescript",
  java: "java",
  cpp: "cpp",
  go: "go",
  rust: "rust",
};

function CodeEditorPanel({
  code,
  setCode,
  language,
  setLanguage,
  supportedLanguages,
  onValidate,
  onClear,
  loading,
}) {
  const lineCount = code ? code.split("\n").length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel flex h-full flex-col rounded-2xl p-5 md:p-6"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
            <FileCode2 size={16} className="text-violet-400" />
          </div>
          <div>
            <p className="section-label">Input</p>
            <h2 className="section-title">Source Code</h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            className="select-input"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
          >
            {supportedLanguages.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onValidate}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Play size={16} fill="currentColor" />
            )}
            Validate
          </button>
          <button
            type="button"
            onClick={onClear}
            disabled={loading}
            className="btn-secondary"
          >
            <Eraser size={16} />
            Clear
          </button>
        </div>
      </div>

      <div className="editor-container min-h-[42vh] flex-1 md:min-h-[50vh]">
        <Editor
          value={code}
          onChange={(value) => setCode(value ?? "")}
          language={monacoLanguageMap[language] ?? "plaintext"}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: '"JetBrains Mono", "Cascadia Code", Consolas, monospace',
            fontLigatures: true,
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true,
            lineNumbers: "on",
            padding: { top: 16, bottom: 16 },
            scrollBeyondLastLine: false,
            renderLineHighlight: "line",
            cursorBlinking: "smooth",
            smoothScrolling: true,
          }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
        <span style={{ fontFamily: '"JetBrains Mono", monospace' }}>
          {language.toUpperCase()}
        </span>
        <span>
          {lineCount} line{lineCount !== 1 ? "s" : ""}
        </span>
      </div>
    </motion.div>
  );
}

export default CodeEditorPanel;
