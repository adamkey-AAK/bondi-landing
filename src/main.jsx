import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import "./styles.css";

const letters = "be a hero for a hero".split("");

function BondiIcon() {
  return (
    <motion.div
      className="bondi-mark"
      animate={{ y: [0, -1.5, 0] }}
      transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bondiLeft" x1="19" y1="10" x2="52" y2="86" gradientUnits="userSpaceOnUse">
            <stop stopColor="#79A879" />
            <stop offset="1" stopColor="#5F9367" />
          </linearGradient>
          <linearGradient id="bondiRight" x1="44" y1="26" x2="84" y2="82" gradientUnits="userSpaceOnUse">
            <stop stopColor="#88B486" />
            <stop offset="1" stopColor="#6D9F72" />
          </linearGradient>
          <linearGradient id="bondiOverlap" x1="42" y1="30" x2="58" y2="82" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5D9365" stopOpacity="0.86" />
            <stop offset="1" stopColor="#497A58" stopOpacity="0.92" />
          </linearGradient>
        </defs>
        <path
          d="M14 27C14 17.06 22.06 9 32 9H36C49.255 9 60 19.745 60 33V66C60 78.15 50.15 88 38 88C24.745 88 14 77.255 14 64V27Z"
          fill="url(#bondiLeft)"
        />
        <path
          d="M39 34C39 21.85 48.85 12 61 12C73.15 12 83 21.85 83 34V64C83 77.255 72.255 88 59 88H39V34Z"
          fill="url(#bondiRight)"
        />
        <path
          d="M39 34C39 27.65 41.68 21.94 45.97 17.92C54.25 22.02 60 30.56 60 40.47V66C60 74.98 54.63 82.72 46.92 86.16C42.11 81.77 39 75.32 39 68V34Z"
          fill="url(#bondiOverlap)"
        />
      </svg>
    </motion.div>
  );
}
function ConstellationBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 58 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      s: Math.random() * 2.2 + 0.7,
      d: Math.random() * 5 + 3,
      delay: Math.random() * 4,
    }));
  }, []);

  return (
    <div className="bg">
      <div className="bg-base" />
      <motion.div
        className="bg-grid"
        animate={{ backgroundPosition: ["0px 0px", "90px 140px"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      />

      <svg className="bg-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M8 62 C22 48, 31 74, 45 42 S72 20, 91 34"
          stroke="rgba(159,191,159,0.34)"
          strokeWidth="0.13"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.8, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M14 25 C29 16, 41 28, 52 18 S75 12, 88 21"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="0.1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4.6, delay: 1.2, ease: "easeInOut" }}
        />
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
          animate={{ opacity: [0.2, 0.85, 0.2], scale: [1, 1.6, 1] }}
          transition={{ duration: star.d, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 2800);
    return () => clearTimeout(timer);
  }, [submitted]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
  }

  return (
    <main>
      <ConstellationBackground />

      <div className="page">
        <header className="header">
          <motion.div
            className="brand"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BondiIcon />
            <div className="brand-word">
              bondi<span>.</span>
            </div>
          </motion.div>

          <motion.div
            className="stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            early stage project
          </motion.div>
        </header>

        <section className="hero">
          <div className="layout">
            <div className="copy">
              <motion.p
                className="eyebrow"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 }}
              >
                coming soon
              </motion.p>

              <h1>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 38 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  Human
                </motion.span>
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 38 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
                >
                  connection,
                </motion.span>
                <motion.span
                  className="block green italic"
                  initial={{ opacity: 0, filter: "blur(12px)", y: 24 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 1.35, delay: 1.35, ease: "easeOut" }}
                >
                  reimagined
                </motion.span>
              </h1>

              <div className="letterline">
                {letters.map((char, index) => (
                  <motion.span
                    key={`${char}-${index}`}
                    initial={{ opacity: 0, y: 9 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 2.35 + index * 0.045 + (index % 5) * 0.035,
                      duration: 0.42,
                      ease: "easeOut",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.div
              className="form-outer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.9 }}
            >
              <div className="glow" />
              <form onSubmit={handleSubmit} className="form">
                <div className="form-intro">
                  <h2>Stay in touch</h2>
                  <p>
                    Leave your contact and we’ll share quiet updates when Bondi starts taking shape.
                  </p>
                </div>

                <div className="fields">
                  <label>
                    <span>Name</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </label>

                  <label>
                    <span>Email</span>
                    <input
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <button type="submit">{submitted ? "Thank you" : "Stay connected"}</button>
                <p className="small">Occasional updates. No spam.</p>
              </form>
            </motion.div>
          </div>
        </section>

        <footer>
          <span>© {new Date().getFullYear()} bondi.</span>
          <span>human connection, reimagined</span>
        </footer>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
