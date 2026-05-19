import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import "./styles.css";

const letters = "be a hero for a hero".split("");

function BondiIcon() {
  return (
    <motion.div
      className="bondi-icon"
      animate={{
        boxShadow: [
          "0 0 24px rgba(159,191,159,0.14)",
          "0 0 52px rgba(159,191,159,0.28)",
          "0 0 24px rgba(159,191,159,0.14)",
        ],
      }}
      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.svg
        width="27"
        height="27"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ rotate: [0, 2, 0, -2, 0], scale: [1, 1.035, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M21 11C21 9.343 22.343 8 24 8H28C29.657 8 31 9.343 31 11V28.2C34.255 24.808 38.71 22.75 43.6 22.75C53.056 22.75 60 29.716 60 38.9C60 48.084 52.992 56 41.4 56H24C22.343 56 21 54.657 21 53V11Z"
          fill="#9fbf9f"
        />
        <path
          d="M31 39.2C31 33.84 34.86 30 40.25 30C45.64 30 49.5 33.84 49.5 39.2C49.5 44.56 45.64 48.4 40.25 48.4C34.86 48.4 31 44.56 31 39.2Z"
          fill="#111a17"
          fillOpacity="0.86"
        />
        <path
          d="M7 37.5C7 31.425 11.925 26.5 18 26.5H21V37.5H18C17.448 37.5 17 37.948 17 38.5V53C17 54.657 15.657 56 14 56H10C8.343 56 7 54.657 7 53V37.5Z"
          fill="#9fbf9f"
          fillOpacity="0.72"
        />
      </motion.svg>
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
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => setStatus("idle"), 3200);
    return () => clearTimeout(timer);
  }, [status]);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company }),
      });

      if (!response.ok) throw new Error("Form submit failed");

      setStatus("success");
      setName("");
      setEmail("");
      setCompany("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
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

                <input
                  className="honeypot"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  tabIndex="-1"
                  autoComplete="off"
                  aria-hidden="true"
                  placeholder="Company"
                />

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

                <button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : status === "success" ? "Thank you" : "Stay connected"}
                </button>
                {status === "error" ? (
                  <p className="small error">Something went wrong. Please try again.</p>
                ) : (
                  <p className="small">Occasional updates. No spam.</p>
                )}
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
