import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import AppHeader from "./components/AppHeader";
import CodeEditorPanel from "./components/CodeEditorPanel";
import ErrorPanel from "./components/ErrorPanel";
import OptimizedCodePanel from "./components/OptimizedCodePanel";
import { validateCode } from "./services/api";

const LANGUAGES = [
  "python",
  "javascript",
  "typescript",
  "java",
  "cpp",
  "go",
  "rust",
];

const DEFAULT_CODE = `def is_even(number):
    if number % 2 == 0
        return True
    return False`;

const toastOptions = {
  style: {
    background: "#12121c",
    color: "#f4f4f5",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    fontSize: "0.875rem",
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  },
  success: {
    iconTheme: { primary: "#34d399", secondary: "#12121c" },
  },
  error: {
    iconTheme: { primary: "#f87171", secondary: "#12121c" },
  },
};

function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [optimizedCode, setOptimizedCode] = useState("");

  const handleClear = useCallback(() => {
    setCode("");
    setErrors([]);
    setOptimizedCode("");
    toast("Editor cleared");
  }, []);

  const handleValidate = useCallback(async () => {
    if (!code.trim()) {
      toast.error("Please paste code before validating.");
      return;
    }

    setLoading(true);
    setErrors([]);
    setOptimizedCode("");

    try {
      const response = await validateCode({ code, language });
      setErrors(response.errors ?? []);
      setOptimizedCode(response.optimized_code ?? "");
      toast.success("Validation complete");
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        "Validation failed. Check backend server and API key.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [code, language]);

  const errorCount = errors.length;

  return (
    <div className="app-bg relative min-h-screen text-zinc-100">
      <Toaster position="top-right" toastOptions={toastOptions} />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-[1680px] flex-col gap-5 px-4 py-5 md:px-8 md:py-7">
        <AppHeader loading={loading} errorCount={errorCount} />

        <section className="grid flex-1 grid-cols-1 gap-5 xl:grid-cols-12">
          <motion.div
            className="xl:col-span-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <CodeEditorPanel
              code={code}
              setCode={setCode}
              language={language}
              setLanguage={setLanguage}
              supportedLanguages={LANGUAGES}
              onValidate={handleValidate}
              onClear={handleClear}
              loading={loading}
            />
          </motion.div>

          <motion.div
            className="xl:col-span-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <ErrorPanel errors={errors} loading={loading} />
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="glass-panel rounded-2xl p-5 md:p-6"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/25 bg-emerald-500/10">
                <Sparkles size={16} className="text-emerald-400" />
              </div>
              <div>
                <p className="section-label text-emerald-500/70">Output</p>
                <h2 className="section-title text-emerald-50">Optimized Code</h2>
              </div>
            </div>
          </div>
          <OptimizedCodePanel code={optimizedCode} language={language} />
        </motion.section>

        <footer className="pb-2 text-center text-xs text-zinc-600">
          Paste your code, choose a language, and hit Validate
        </footer>
      </main>
    </div>
  );
}

export default App;
