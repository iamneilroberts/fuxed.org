// POST /api/subscribe — emails a newsletter signup to the editor.
// Config via Cloudflare Pages secrets: RESEND_API_KEY, FUXED_NOTIFY_TO, FUXED_FROM.
// No list management yet; signups are forwarded by email for now.

export async function onRequestPost(context) {
  const { request, env } = context;
  let data = {};
  try {
    const ct = request.headers.get("content-type") || "";
    if (ct.includes("application/json")) data = await request.json();
    else data = Object.fromEntries(await request.formData());
  } catch (_) { data = {}; }

  if ((data.company || "").toString().trim()) return thanks(); // honeypot

  const email = (data.email || "").toString().slice(0, 200).trim();
  if (!email.includes("@")) return new Response("A valid email is required.", { status: 400 });

  if (env.DB) {
    try {
      await env.DB.prepare("INSERT INTO subscribers (email,ip) VALUES (?,?)")
        .bind(email, request.headers.get("cf-connecting-ip") || "").run();
    } catch (_) {}
  }

  let sent = false;
  try {
    sent = await sendEmail(env, {
      subject: `[Fuxed] Newsletter signup: ${email}`,
      text: `New Weekly Fuxed signup\n\nEmail: ${email}\n`,
      replyTo: email,
    });
  } catch (_) {}

  const res = thanks();
  res.headers.set("X-Email-Sent", String(sent));
  return res;
}

export const onRequestGet = () =>
  new Response("Method not allowed — use the signup form.", { status: 405 });

async function sendEmail(env, { subject, text, replyTo }) {
  const to = (env.FUXED_NOTIFY_TO || "").trim();
  const from = env.FUXED_FROM || "Fuxed Newsletter <onboarding@resend.dev>";
  if (!env.RESEND_API_KEY || !to) return false;
  const body = { from, to: [to], subject, text };
  if (replyTo && replyTo.includes("@")) body.reply_to = replyTo;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return r.ok;
}

function thanks() {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Signed up — FUXED</title></head>
<body style="font-family:Georgia,'Times New Roman',serif;background:#0a1f44;color:#fff;margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px">
<div style="max-width:540px">
<div style="font:800 44px Impact,'Arial Narrow',sans-serif;letter-spacing:1px">FUXED<span style="color:#B22234">★</span></div>
<h1 style="font-size:30px;margin:20px 0 12px">You're on the list.</h1>
<p style="font-size:18px;line-height:1.55;color:#cdd6e8">One working thing, ruined, every Sunday. Citations included. Unsubscribe anytime.</p>
<p style="margin-top:26px"><a href="/" style="color:#ffd27a;font:700 14px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;text-decoration:none">&larr; Back to the front page</a></p>
</div></body></html>`;
  return new Response(html, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
}
