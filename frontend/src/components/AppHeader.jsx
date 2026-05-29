import { motion } from "framer-motion";
import {
  Bug,
  LoaderCircle,
  Shield,
  Sparkles,
  Zap,
  Braces,
  Gauge,
} from "lucide-react";

const FEATURE_CHIPS = [
  { icon: Sparkles, label: "Gemini 2.5 Flash" },
  { icon: Shield, label: "Security scan" },
  { icon: Braces, label: "7 languages" },
  { icon: Gauge, label: "Performance hints" },
];

function AppHeader({ loading, errorCount }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="app-header"
    >
      <div className="app-header__glow" aria-hidden="true" />

      <div className="app-header__inner">
        <div className="app-header__brand">
          <div className="app-header__logo" aria-hidden="true">
            <span className="app-header__logo-bracket">{"{"}</span>
            <Zap size={20} className="app-header__logo-icon" strokeWidth={2.5} />
            <span className="app-header__logo-bracket">{"}"}</span>
          </div>

          <div className="app-header__titles">
            <p className="app-header__eyebrow">Intelligent code analysis</p>
            <h1 className="app-header__title">
              <span className="app-header__title-main">Valid</span>
              <span className="app-header__title-accent">raft</span>
            </h1>
            <p className="app-header__tagline">
              Catch bugs, fix syntax, and ship optimized code — in seconds.
            </p>
          </div>
        </div>

        <div className="app-header__aside">
          {!loading && errorCount > 0 && (
            <div className="app-header__issues">
              <Bug size={14} />
              <span>
                {errorCount} finding{errorCount !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          <div
            className={`app-header__status ${loading ? "app-header__status--busy" : ""}`}
          >
            <span className="app-header__status-dot" aria-hidden="true" />
            <span className="app-header__status-icon">
              {loading ? (
                <LoaderCircle size={15} className="animate-spin" />
              ) : (
                <Zap size={15} />
              )}
            </span>
            <div className="app-header__status-text">
              <span className="app-header__status-label">
                {loading ? "Analyzing" : "System"}
              </span>
              <span className="app-header__status-value">
                {loading ? "Review in progress…" : "Ready to validate"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="app-header__chips">
        {FEATURE_CHIPS.map(({ icon: Icon, label }) => (
          <span key={label} className="app-header__chip">
            <Icon size={12} strokeWidth={2} />
            {label}
          </span>
        ))}
      </div>
    </motion.header>
  );
}

export default AppHeader;
