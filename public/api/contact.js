import { Resend } from "resend";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { name = "", email = "", company = "" } = req.body || {};

    if (company) {
      return res.status(200).json({ ok: true });
    }

    if (!email || !String(email).includes("@")) {
      return res.status(400).json({ ok: false, error: "Missing or invalid email." });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ ok: false, error: "Missing RESEND_API_KEY." });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(name || "No name");
    const safeEmail = escapeHtml(email);

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM || "adam@bondi.cz",
      to: process.env.CONTACT_TO || "adam@bondi.cz",
      reply_to: email,
      subject: `New Bondi contact: ${name || email}`,
      html: `
        <h2>New Bondi form submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ ok: false, error: "Email could not be sent." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ ok: false, error: "Unexpected server error." });
  }
}
