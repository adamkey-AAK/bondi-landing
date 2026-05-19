import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request) {
  try {
    const { name, email, company } = await request.json();

    // Simple anti-spam honeypot: real visitors never fill this hidden field.
    if (company) {
      return Response.json({ ok: true });
    }

    if (!email || !String(email).includes("@")) {
      return Response.json({ ok: false, error: "Missing or invalid email." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return Response.json({ ok: false, error: "Missing RESEND_API_KEY." }, { status: 500 });
    }

    const safeName = escapeHtml(name || "No name");
    const safeEmail = escapeHtml(email);

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM || "Bondi <hello@bondi.cz>",
      to: [process.env.CONTACT_TO || "adamkroc1@gmail.com"],
      replyTo: safeEmail,
      subject: `New Bondi contact: ${name || email}`,
      html: `
        <h2>New Bondi form submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
      `,
    });

    if (error) {
      console.error(error);
      return Response.json({ ok: false, error: "Email could not be sent." }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: "Unexpected server error." }, { status: 500 });
  }
}
