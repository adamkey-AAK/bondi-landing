import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function Logo(){
return(
<div className="brand">
<div className="icon">
<div className="left"></div>
<div className="right"></div>
</div>
<div className="text">bondi<span>.</span></div>
</div>
)
}

function App(){
return(
<main>
<div className="bg"></div>

<header>
<Logo/>
</header>

<section className="hero">
<div className="content">
<p className="small">COMING SOON</p>
<h1>Human connection,<br/><span>reimagined</span></h1>
<p className="line">be a hero for a hero</p>

<div className="card">
<h3>Stay in touch</h3>
<input placeholder="Your email"/>
<button>Stay connected</button>
</div>
</div>
</section>
</main>
)
}

createRoot(document.getElementById("root")).render(<App/>)
