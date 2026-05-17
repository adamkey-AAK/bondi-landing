import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import "./styles.css";

const letters = "be a hero for a hero".split("");

function BondiLogo() {
  return (
    <motion.div
      className="brand"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="logo-mark">
        <span className="logo-left" />
        <span className="logo-right" />
        <span className="logo-overlap" />
      </div>

      <div className="brand-word">
        bondi<span>.</span>
      </div>
    </motion.div>
  );
}

function Background() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 3 + 1
  }));

  return (
    <div className="bg">
      <div className="bg-gradient"></div>

      <svg className="lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M6 20 L14 28 L22 18 L31 36" />
        <path d="M60 14 L72 24 L81 16 L90 30" />
        <path d="M18 70 L26 62 L34 76 L44 84" />
        <path d="M64 68 L76 60 L86 74 L95 70" />
      </svg>

      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.s,
            height: star.s,
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

function App() {
  return (
    <main>
      <Background />

      <div className="page">
        <header className="header">
          <BondiLogo />
        </header>

        <section className="hero">
          <p className="coming">COMING SOON</p>

          <h1>
            Human connection,<br />
            <span>reimagined</span>
          </h1>

          <div className="typing">
            {letters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + i * 0.05 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          <div className="card">
            <h3>Stay in touch</h3>
            <input placeholder="Your email" />
            <button>Stay connected</button>
          </div>
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
