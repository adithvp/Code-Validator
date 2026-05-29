import { motion } from "framer-motion";
import {
  AlertOctagon,
  AlertTriangle,
  CircleAlert,
  Info,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

const severityConfig = {
  low: {
    icon: Info,
    tone: "text-sky-400",
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/25",
    cardClass: "error-card--low",
    titleColor: "text-sky-300",
    messageColor: "text-zinc-300",
  },
  medium: {
    icon: AlertTriangle,
    tone: "text-amber-400",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    cardClass: "error-card--medium",
    titleColor: "text-amber-300",
    messageColor: "text-zinc-300",
  },
  high: {
    icon: CircleAlert,
    tone: "text-orange-400",
    badge: "bg-orange-500/15 text-orange-300 border-orange-500/25",
    cardClass: "error-card--high",
    titleColor: "text-orange-300",
    messageColor: "text-zinc-300",
  },
  critical: {
    icon: AlertOctagon,
    tone: "text-red-400",
    badge: "bg-red-500/15 text-red-300 border-red-500/25",
    cardClass: "error-card--critical",
    titleColor: "text-red-300",
    messageColor: "text-zinc-300",
  },
};

function ErrorPanel({ errors, loading }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel flex h-full flex-col rounded-2xl p-5 md:p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
            <ShieldAlert size={16} className="text-amber-400" />
          </div>
          <div>
            <p className="section-label">Analysis</p>
            <h2 className="section-title">Findings</h2>
          </div>
        </div>
        {!loading && errors.length > 0 && (
          <span className="rounded-full border border-zinc-700 bg-zinc-800/80 px-2.5 py-0.5 text-xs font-semibold text-zinc-300">
            {errors.length}
          </span>
        )}
      </div>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="skeleton h-24" />
          ))}
        </div>
      )}

      {!loading && errors.length === 0 && (
        <div className="empty-state flex flex-1 flex-col items-center justify-center gap-3 py-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-800/50">
            <CheckCircle2 size={22} className="text-zinc-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-400">No issues yet</p>
            <p className="mt-1 max-w-[220px] text-xs leading-relaxed text-zinc-500">
              Run validation to see syntax, logic, security, and performance
              findings.
            </p>
          </div>
        </div>
      )}

      {!loading && errors.length > 0 && (
        <div className="custom-scroll max-h-[53vh] space-y-3 overflow-y-auto pr-1">
          {errors.map((error, index) => {
            const severity = (error.severity || "low").toLowerCase();
            const config = severityConfig[severity] || severityConfig.low;
            const SeverityIcon = config.icon;

            return (
              <motion.div
                key={`${error.error_type}-${index}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`error-card ${config.cardClass}`}
              >
                <div className="mb-2.5 flex items-start justify-between gap-2">
                  <h3
                    className={`text-sm font-semibold leading-snug ${config.titleColor}`}
                  >
                    {error.error_type || "Validation Error"}
                  </h3>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${config.badge}`}
                  >
                    <SeverityIcon size={11} className={config.tone} />
                    {error.severity || "Low"}
                  </span>
                </div>

                <p className={`mb-2 text-sm leading-relaxed ${config.messageColor}`}>
                  {error.error_message || "No error message provided."}
                </p>

                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span
                    className="rounded bg-zinc-800/80 px-1.5 py-0.5 font-mono text-zinc-400"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  >
                    L{error.line_number ?? "—"}
                  </span>
                </div>

                {error.suggested_fix && (
                  <div className="mt-3 rounded-lg border border-violet-500/15 bg-violet-500/5 px-3 py-2">
                    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-400/80">
                      Suggested fix
                    </p>
                    <p className="text-xs leading-relaxed text-violet-200/90">
                      {error.suggested_fix}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.aside>
  );
}

export default ErrorPanel;
