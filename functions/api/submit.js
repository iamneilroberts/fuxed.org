// POST /api/submit — emails a case submission to the editor.
//
// Config comes from Cloudflare Pages secrets (never hard-coded):
//   RESEND_API_KEY   – a Resend API key (send permission)
//   FUXED_NOTIFY_TO  – the address that receives submissions
//   FUXED_FROM       – the verified sender, e.g. "Fuxed <fuxed@example.com>"
// Native form POST friendly: returns a styled HTML thank-you page (no JS needed).

export async function onRequestPost(context) {
  const { request, env } = context;
  let data = {};
  try {
    const ct = request.headers.get("content-type") || "";
    if (ct.includes("application/json")) data = await request.json();
    else data = Object.fromEntries(await request.formData());
  } catch (_) { data = {}; }

  // Honeypot: bots fill the hidden "company" field. Accept silently, send nothing.
  if ((data.company || "").toString().trim()) return thanks();

  const clip = (v, n) => (v == null ? "" : v.toString().slice(0, n));
  const wasnt = clip(data.wasnt, 4000);
  const fix = clip(data.fix, 4000);
  const result = clip(data.result, 4000);
  const sources = clip(data.sources, 4000);
  const email = clip(data.email, 200).trim();
  const newsletter = data.newsletter ? "yes" : "no";

  if (!wasnt && !fix && !result) return new Response("Empty submission", { status: 400 });

  const text =
    `New FUXED case submission\n\n` +
    `WHAT WASN'T BROKEN:\n${wasnt || "(blank)"}\n\n` +
    `THE FIX:\n${fix || "(blank)"}\n\n` +
    `THE RESULT:\n${result || "(blank)"}\n\n` +
    `SOURCES / LINKS:\n${sources || "(none)"}\n\n` +
    `Submitter email: ${email || "(none provided)"}\n` +
    `Newsletter opt-in: ${newsletter}\n`;
  const subject = `[Fuxed] New case: ${(wasnt || fix || "submission").slice(0, 80)}`;

  // Store in D1 (if bound) so the /admin queue can see it.
  if (env.DB) {
    try {
      await env.DB.prepare(
        "INSERT INTO submissions (wasnt,fix,result,sources,email,newsletter,ip,ua,status) VALUES (?,?,?,?,?,?,?,?,'new')"
      ).bind(wasnt, fix, result, sources, email, newsletter,
        request.headers.get("cf-connecting-ip") || "", request.headers.get("user-agent") || "").run();
    } catch (_) {}
  }

  let sent = false;
  try { sent = await sendEmail(env, { subject, text, replyTo: email }); } catch (_) {}

  const res = thanks();
  res.headers.set("X-Email-Sent", String(sent));
  return res;
}

// Reject non-POST cleanly.
export const onRequestGet = () =>
  new Response("Method not allowed — submit the form on /submit.", { status: 405 });

async function sendEmail(env, { subject, text, replyTo }) {
  const to = (env.FUXED_NOTIFY_TO || "").trim();
  const from = env.FUXED_FROM || "Fuxed Tip Line <onboarding@resend.dev>";
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
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Case received — FUXED</title></head>
<body style="font-family:Georgia,'Times New Roman',serif;background:#0a1f44;color:#fff;margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px">
<div style="max-width:540px">
<div style="font:800 44px Impact,'Arial Narrow',sans-serif;letter-spacing:1px">FUXED<span style="color:#B22234">★</span></div>
<h1 style="font-size:30px;margin:20px 0 12px">Case received.</h1>
<p style="font-size:18px;line-height:1.55;color:#cdd6e8">Thanks — your tip is on its way to the Fuxed Desk. If it holds up, we research it, cite it, and file it. Not everything makes the cut.</p>
<p style="margin-top:26px"><a href="/" style="color:#ffd27a;font:700 14px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;text-decoration:none">&larr; Back to the front page</a></p>
</div></body></html>`;
  return new Response(html, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
}
