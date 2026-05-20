import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import "./styles.css";

const letters = "be a hero for a hero".split("");

function BondiLogo() {
  return (
    <motion.img
      className="bondi-logo"
      src="/bondi-logo.jpeg"
      alt="Bondi"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    />
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
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 2800);
    return () => clearTimeout(timer);
  }, [submitted]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Message could not be sent");
      }

      setSubmitted(true);
      setName("");
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main>
      <ConstellationBackground />

      <div className="page">
        <header className="header">
          <div />
          <BondiLogo />
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

                {submitted && (
                  <motion.div
                    className="success-card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="success-icon">✓</div>
                    <div>
                      <strong>Thanks! You’re on the list.</strong>
                      <span>We’ll be in touch with occasional updates.</span>
                    </div>
                  </motion.div>
                )}

                <button type="submit" disabled={isSending}>
                  {isSending ? "Sending..." : submitted ? "Send another" : "Stay connected"}
                </button>
                {error && <p className="small error-message">{error}</p>}
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
