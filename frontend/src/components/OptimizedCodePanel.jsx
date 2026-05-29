import Editor from "@monaco-editor/react";
import { Copy, Download } from "lucide-react";
import toast from "react-hot-toast";

function OptimizedCodePanel({ code, language }) {
  const content =
    code ||
    "// Optimized output appears here after validation.\n// The backend returns corrected and improved code.";

  const hasOutput = Boolean(code?.trim());

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    toast.success("Optimized code copied");
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `optimized-code.${language || "txt"}`;
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("Download started");
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-zinc-500">
          {hasOutput
            ? "Review and export the improved version below"
            : "Validated output will appear here"}
        </p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={handleCopy} className="btn-ghost-emerald">
            <Copy size={14} />
            Copy
          </button>
          <button type="button" onClick={handleDownload} className="btn-ghost-emerald">
            <Download size={14} />
            Download
          </button>
        </div>
      </div>
      <div className="editor-container-optimized h-[260px] md:h-[280px]">
        <Editor
          value={content}
          language={language || "plaintext"}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: '"JetBrains Mono", "Cascadia Code", Consolas, monospace',
            fontLigatures: true,
            automaticLayout: true,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            padding: { top: 14, bottom: 14 },
            renderLineHighlight: "none",
          }}
        />
      </div>
    </div>
  );
}

export default OptimizedCodePanel;
