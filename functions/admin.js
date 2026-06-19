// GET/POST /admin — password-protected submissions queue for fuxed.org.
//
// Auth: HTTP Basic, checked against Cloudflare Pages secrets ADMIN_USER / ADMIN_PASSWORD.
// Data: the D1 binding `DB` (submissions + subscribers tables; see schema.sql).
//
// Workflow: each submission renders a ready-to-paste prompt for Claude Code. You
// paste it into Claude Code opened in this repo, it researches + writes the
// article in the house voice with real citations, shows you the draft, and
// publishes (build + deploy) only on your approval. The status buttons here are
// bookkeeping for that queue (new -> queued -> published / rejected).

const REALM = 'Basic realm="Fuxed Admin", charset="UTF-8"';

function authed(request, env) {
  const want = env.ADMIN_PASSWORD || "";
  if (!want) return false;
  const h = request.headers.get("Authorization") || "";
  if (!h.startsWith("Basic ")) return false;
  let user = "", pass = "";
  try { const d = atob(h.slice(6)); const i = d.indexOf(":"); user = d.slice(0, i); pass = d.slice(i + 1); }
  catch (_) { return false; }
  return user === (env.ADMIN_USER || "admin") && pass === want;
}
const unauth = () => new Response("Authentication required.", { status: 401, headers: { "WWW-Authenticate": REALM } });

const esc = (s) => (s == null ? "" : String(s)).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!authed(request, env)) return unauth();
  const form = await request.formData();
  const id = parseInt(form.get("id"), 10);
  const action = (form.get("action") || "").toString();
  const allowed = { queued: 1, published: 1, rejected: 1, new: 1 };
  if (env.DB && id && allowed[action]) {
    try { await env.DB.prepare("UPDATE submissions SET status=? WHERE id=?").bind(action, id).run(); } catch (_) {}
  }
  return new Response(null, { status: 303, headers: { Location: "/admin" } });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  if (!authed(request, env)) return unauth();

  let subs = [], news = [];
  if (env.DB) {
    try { subs = (await env.DB.prepare("SELECT * FROM submissions ORDER BY id DESC LIMIT 300").all()).results || []; } catch (_) {}
    try { news = (await env.DB.prepare("SELECT * FROM subscribers ORDER BY id DESC LIMIT 1000").all()).results || []; } catch (_) {}
  }

  const rows = subs.map((s) => {
    const prompt = buildPrompt(s);
    const badge = { new: "#B22234", queued: "#a8731c", published: "#2f5d3a", rejected: "#777" }[s.status] || "#444";
    return `
    <article class="card">
      <div class="meta">
        <span class="badge" style="background:${badge}">${esc(s.status || "new")}</span>
        <b>#${s.id}</b> · ${esc(s.created_at || "")}
        ${s.email ? `· <a href="mailto:${esc(s.email)}">${esc(s.email)}</a>` : "· (no email)"}
        ${s.newsletter === "yes" ? "· ✉ wants newsletter" : ""}
      </div>
      <dl>
        <dt>Wasn't broken</dt><dd>${esc(s.wasnt) || "<i>(blank)</i>"}</dd>
        <dt>The "fix"</dt><dd>${esc(s.fix) || "<i>(blank)</i>"}</dd>
        <dt>The result</dt><dd>${esc(s.result) || "<i>(blank)</i>"}</dd>
        ${s.sources ? `<dt>Sources</dt><dd>${esc(s.sources)}</dd>` : ""}
      </dl>
      <div class="promptbox">
        <div class="promptbar">
          <span>Prompt for Claude Code (run in this repo)</span>
          <button class="copy" data-target="p${s.id}">Copy prompt</button>
        </div>
        <textarea id="p${s.id}" readonly rows="8">${esc(prompt)}</textarea>
      </div>
      <form method="post" action="/admin" class="actions">
        <input type="hidden" name="id" value="${s.id}">
        <button name="action" value="queued">Mark queued</button>
        <button name="action" value="published" class="ok">Mark published</button>
        <button name="action" value="rejected" class="no">Reject</button>
      </form>
    </article>`;
  }).join("");

  const counts = subs.reduce((a, s) => { const k = s.status || "new"; a[k] = (a[k] || 0) + 1; return a; }, {});
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Fuxed Admin — Submissions</title>
<style>
:root{--ink:#16181d;--paper:#fffdf8;--bg:#f5f1e6;--navy:#0a1f44;--red:#B22234;--line:#e3ddcd}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.55 Georgia,serif}
header{background:var(--navy);color:#fff;padding:16px 22px;display:flex;flex-wrap:wrap;gap:14px;align-items:baseline}
header b{font:800 24px Impact,sans-serif;letter-spacing:1px}
header .sub{color:#cdd6e8;font:13px ui-sans-serif,system-ui}
.wrap{max-width:920px;margin:0 auto;padding:22px}
.card{background:var(--paper);border:1px solid var(--line);border-top:4px solid var(--red);border-radius:6px;padding:18px 20px;margin:0 0 20px;box-shadow:0 1px 0 rgba(10,31,68,.06)}
.meta{font:13px ui-sans-serif,system-ui;color:#555;margin-bottom:10px}
.badge{color:#fff;font:700 11px ui-sans-serif;text-transform:uppercase;letter-spacing:.08em;padding:2px 8px;border-radius:999px;margin-right:6px}
dl{margin:0 0 12px;display:grid;grid-template-columns:130px 1fr;gap:4px 14px}
dt{font:700 12px ui-sans-serif,system-ui;text-transform:uppercase;letter-spacing:.06em;color:var(--navy)}
dd{margin:0}
.promptbox{border:1px solid var(--line);border-radius:5px;overflow:hidden;margin:6px 0 14px}
.promptbar{background:#eef0f4;display:flex;justify-content:space-between;align-items:center;padding:6px 10px;font:12px ui-sans-serif,system-ui;color:#444}
.promptbox textarea{width:100%;border:none;border-top:1px solid var(--line);padding:10px;font:12px/1.5 ui-monospace,Menlo,Consolas,monospace;resize:vertical;background:#fbfbf8;color:#222}
button{font:600 13px ui-sans-serif,system-ui;border:1px solid var(--navy);background:#fff;color:var(--navy);padding:7px 12px;border-radius:4px;cursor:pointer}
button:hover{background:var(--navy);color:#fff}
.copy{border-color:#999;color:#333}
.actions{display:flex;gap:8px;flex-wrap:wrap}
.actions .ok{border-color:#2f5d3a;color:#2f5d3a}.actions .ok:hover{background:#2f5d3a;color:#fff}
.actions .no{border-color:#999;color:#777}.actions .no:hover{background:#777;color:#fff}
.empty{color:#777;font-style:italic;padding:30px 0;text-align:center}
.subs{font:13px ui-sans-serif,system-ui;color:#555;margin-top:30px;border-top:1px solid var(--line);padding-top:14px}
.subs code{background:#fff;border:1px solid var(--line);padding:1px 5px;border-radius:3px}
</style></head>
<body>
<header><b>FUXED ★ ADMIN</b><span class="sub">${subs.length} submissions · ${counts.new || 0} new · ${counts.queued || 0} queued · ${counts.published || 0} published · ${news.length} newsletter signups</span></header>
<div class="wrap">
${rows || '<p class="empty">No submissions yet. They\'ll appear here as people use the form on /submit.</p>'}
<div class="subs">
<b>Newsletter signups (${news.length}):</b><br>
${news.map((n) => `<code>${esc(n.email)}</code>`).join(" ") || "<i>none yet</i>"}
</div>
</div>
<script>
document.querySelectorAll(".copy").forEach(function(b){
  b.addEventListener("click",function(){
    var t=document.getElementById(b.dataset.target);t.select();
    navigator.clipboard.writeText(t.value).then(function(){var o=b.textContent;b.textContent="Copied ✓";setTimeout(function(){b.textContent=o},1400)});
  });
});
</script>
</body></html>`;
  return new Response(html, { status: 200, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
}

function buildPrompt(s) {
  return `You are writing a fuxed.org article from a reader submission. Work in this repo (~/dev/fukt).

SUBMISSION #${s.id}:
- What wasn't broken: ${s.wasnt || "(blank)"}
- The "fix": ${s.fix || "(blank)"}
- The result: ${s.result || "(blank)"}
- Sources the reader gave: ${s.sources || "(none)"}
- Submitter email: ${s.email || "(none)"}

DO THIS:
1. Verify it with web search. Find 4-6 real, reputable citations (gov/archives/major press/academic) with working URLs. If you can't source it, tell me and stop.
2. Pick the edition by era: default 2026 (the modern edition) for current events; otherwise the matching 50-year edition (1776/1826/1876/1926/1976).
3. Write ONE article object in the house schema — slug, category, sev (1-5), sevLabel (Cosmetic|Notable|Severe|Catastrophic), headline (punchy, Onion-style), deck, read, wasnt, fix, result, body (<p> HTML with [^n] footnotes mapping 1:1 to refs), pull, pullAttr, refs[] (real HTML links), press[3] — in the era-appropriate deadpan, period-artifact voice. Headlines punchy; the dossier facts and citations stay sober and real.
4. Add it to the right editions/<year>.json (for 2026, add to builtinArticles in build.js). Then show me the finished article for review.
5. ON MY APPROVAL ("publish"), rebuild that edition and deploy, and give me the live URL. Do NOT deploy before I approve.`;
}
