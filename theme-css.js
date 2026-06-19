/* theme-css.js — one base stylesheet + per-era skins (CSS variables).
   css(theme) returns the skin's :root vars followed by the shared BASE, so each
   edition gets a distinct era look from a small palette/font/rule override.
   Used by build.js. Themes: modern, 1776, 1830, 1860, 1900, 1933. */

const SKINS = {
  // 2026 — patriotic flag
  modern: `:root{
    --bg:#f5f1e6; --paper:#fffdf8; --paper2:#efe9da; --ink:#16181d; --ink-soft:#3a3d46; --muted:#6f7480; --line:#e3ddcd;
    --chrome:#0a1f44; --chrome-ink:#dfe4f0; --brand:#B22234; --brand-dk:#8d1a28; --gold:#c9a24a; --gold-dk:#a8842f;
    --disp:Impact,'Haettenschweiler','Arial Narrow Bold',sans-serif; --serif:Georgia,'Times New Roman',serif; --label:ui-sans-serif,system-ui,'Segoe UI',Roboto,sans-serif;
    --h-transform:uppercase; --h-variant:normal; --h-spacing:.5px; --rule-style:solid; --rule-w:2px; --radius:3px;
    --hero-bg:linear-gradient(rgba(10,31,68,.90),rgba(10,31,68,.94)),repeating-linear-gradient(180deg,rgba(255,255,255,.05) 0 18px,rgba(178,34,52,.10) 18px 36px),#0a1f44;
    --hero-ink:#fff; --hero-sub:#cdd6e8; --hero-accent:#ff5d6c; --hero-eyebrow:var(--gold);
    --band-bg:var(--brand); --band-ink:#fff; --band-sub:#ffe2e5; --band-inp:var(--chrome);
    --foot-bg:#0a1f44; --foot-ink:#cdd6e8; --foot-name:#fff; --foot-mut:#aab4cc;
    --bunting:repeating-linear-gradient(90deg,var(--brand) 0 28px,#fff 28px 56px,var(--chrome) 56px 84px);
    --stripes:repeating-linear-gradient(180deg,var(--brand) 0 4px,#fff 4px 8px);
    --motto-bg:#fff; --motto-ink:var(--chrome); --motto-mark:var(--brand);
  }`,
  // 1776 — colonial broadside
  '1776': `:root{
    --bg:#e9ddc0; --paper:#f3ead3; --paper2:#e2d3af; --ink:#2a1d10; --ink-soft:#4a3722; --muted:#7a6647; --line:#cbb98e;
    --chrome:#5e4424; --chrome-ink:#efe6cd; --brand:#7b2114; --brand-dk:#5b160d; --gold:#9c7b3a; --gold-dk:#7c5f28;
    --disp:'Hoefler Text','Baskerville','Goudy Old Style','Palatino Linotype',Garamond,Georgia,serif; --serif:'Hoefler Text','Baskerville','Palatino Linotype',Garamond,Georgia,serif; --label:'Hoefler Text','Baskerville',Georgia,serif;
    --h-transform:uppercase; --h-variant:small-caps; --h-spacing:1px; --rule-style:double; --rule-w:3px; --radius:1px;
    --hero-bg:radial-gradient(at 50% 0%,rgba(90,60,25,.12),transparent 62%),#e2d3af;
    --hero-ink:#2a1d10; --hero-sub:#4a3722; --hero-accent:#7b2114; --hero-eyebrow:#7b2114;
    --band-bg:#7b2114; --band-ink:#f4e4d8; --band-sub:#f4e4d8; --band-inp:var(--ink);
    --foot-bg:#2a1d10; --foot-ink:#e3d6b6; --foot-name:#f3ead3; --foot-mut:#c9bb98;
    --bunting:#e9ddc0; --stripes:#e9ddc0;
    --motto-bg:#f3ead3; --motto-ink:#5e4424; --motto-mark:#7b2114;
  }
  .bunting{border-top:2px solid var(--chrome);border-bottom:1px solid var(--chrome);}
  .stripes{border-bottom:3px double var(--chrome);}`,
  // 1830 — Jacksonian federal (Didone, federal blue + buff + brass)
  '1830': `:root{
    --bg:#efe9d8; --paper:#fbf7ec; --paper2:#e8e0c9; --ink:#20242e; --ink-soft:#3c4150; --muted:#74705f; --line:#d6cdb3;
    --chrome:#2a3b5f; --chrome-ink:#e7e1cd; --brand:#8c2f23; --brand-dk:#6c2018; --gold:#b08d3e; --gold-dk:#8d6f2c;
    --disp:'Bodoni MT','Didot','Playfair Display','Times New Roman',Georgia,serif; --serif:Georgia,'Times New Roman',serif; --label:'Bodoni MT','Didot',Georgia,serif;
    --h-transform:uppercase; --h-variant:small-caps; --h-spacing:1.5px; --rule-style:double; --rule-w:3px; --radius:0px;
    --hero-bg:linear-gradient(rgba(42,59,95,.93),rgba(42,59,95,.96)),#2a3b5f;
    --hero-ink:#f3eede; --hero-sub:#cdd0c0; --hero-accent:#d8b15a; --hero-eyebrow:#d8b15a;
    --band-bg:#8c2f23; --band-ink:#f3eede; --band-sub:#f0ddd6; --band-inp:var(--chrome);
    --foot-bg:#20242e; --foot-ink:#cdd0c0; --foot-name:#f3eede; --foot-mut:#9a9a86;
    --bunting:repeating-linear-gradient(90deg,var(--chrome) 0 40px,var(--gold) 40px 44px);
    --stripes:#efe9d8;
    --motto-bg:#fbf7ec; --motto-ink:#2a3b5f; --motto-mark:#b08d3e;
  }
  .stripes{border-bottom:3px double var(--chrome);}`,
  // 1860 — Civil War broadsheet (slab, newsprint, union near-black)
  '1860': `:root{
    --bg:#e6e0d2; --paper:#f1ece0; --paper2:#ddd6c5; --ink:#1c1a16; --ink-soft:#3a362c; --muted:#6e685a; --line:#c6bda6;
    --chrome:#1f2a44; --chrome-ink:#e8e2d2; --brand:#8a2a2a; --brand-dk:#681e1e; --gold:#7a6a48; --gold-dk:#5f5238;
    --disp:'Rockwell','Playbill','Clarendon',Georgia,serif; --serif:Georgia,'Times New Roman',serif; --label:'Rockwell',Georgia,serif;
    --h-transform:uppercase; --h-variant:normal; --h-spacing:.5px; --rule-style:double; --rule-w:3px; --radius:0px;
    --hero-bg:linear-gradient(rgba(28,26,22,.94),rgba(28,26,22,.96)),#1c1a16;
    --hero-ink:#f1ece0; --hero-sub:#cabf a8; --hero-accent:#c9b27a; --hero-eyebrow:#c9b27a;
    --band-bg:#1f2a44; --band-ink:#f1ece0; --band-sub:#cdd2dd; --band-inp:var(--ink);
    --foot-bg:#1c1a16; --foot-ink:#cabfa6; --foot-name:#f1ece0; --foot-mut:#988f78;
    --bunting:#e6e0d2; --stripes:#e6e0d2;
    --motto-bg:#f1ece0; --motto-ink:#1f2a44; --motto-mark:#8a2a2a;
  }
  .bunting{border-top:3px double var(--ink);border-bottom:1px solid var(--ink);}
  .stripes{border-bottom:4px double var(--ink);}
  .hero-sub{color:#cdc3a8;}`,
  // 1900 — Gilded Age (Goudy, ivory + gold + maroon, ornamental)
  '1900': `:root{
    --bg:#f3ecdb; --paper:#fbf6ea; --paper2:#ece2c9; --ink:#2a241c; --ink-soft:#46402f; --muted:#7c715a; --line:#ddd0ad;
    --chrome:#5a1f2a; --chrome-ink:#f0e3c8; --brand:#7d1f2b; --brand-dk:#5e1620; --gold:#b08d3e; --gold-dk:#8a6c2a;
    --disp:'Goudy Old Style','Bookman Old Style','Palatino Linotype',Georgia,serif; --serif:'Palatino Linotype',Georgia,serif; --label:'Goudy Old Style','Bookman Old Style',Georgia,serif;
    --h-transform:none; --h-variant:small-caps; --h-spacing:.5px; --rule-style:double; --rule-w:3px; --radius:4px;
    --hero-bg:radial-gradient(at 50% 0%,rgba(176,141,62,.16),transparent 60%),#ece2c9;
    --hero-ink:#2a241c; --hero-sub:#5a513c; --hero-accent:#7d1f2b; --hero-eyebrow:#b08d3e;
    --band-bg:#5a1f2a; --band-ink:#f6edd8; --band-sub:#e8d3bd; --band-inp:var(--ink);
    --foot-bg:#2a241c; --foot-ink:#e2d6b6; --foot-name:#f6edd8; --foot-mut:#bfae8a;
    --bunting:repeating-linear-gradient(90deg,var(--gold) 0 6px,transparent 6px 16px),var(--chrome);
    --stripes:#f3ecdb;
    --motto-bg:#fbf6ea; --motto-ink:#5a1f2a; --motto-mark:#b08d3e;
  }
  .stripes{border-bottom:3px double var(--gold);}
  .hero-h1{text-transform:none;}`,
  // 1933 — Art Deco / WPA (geometric sans, teal + cream + burnt orange)
  '1933': `:root{
    --bg:#ece4d2; --paper:#f6efdd; --paper2:#e2d8bf; --ink:#1b1b1b; --ink-soft:#3a3a33; --muted:#6f6a5a; --line:#cdc3a6;
    --chrome:#15403c; --chrome-ink:#ece4d2; --brand:#c1502e; --brand-dk:#9a3d20; --gold:#caa24a; --gold-dk:#a07f2f;
    --disp:'Futura','Century Gothic','Twentieth Century',ui-sans-serif,sans-serif; --serif:Georgia,'Times New Roman',serif; --label:'Futura','Century Gothic',ui-sans-serif,sans-serif;
    --h-transform:uppercase; --h-variant:normal; --h-spacing:3px; --rule-style:solid; --rule-w:3px; --radius:0px;
    --hero-bg:linear-gradient(135deg,#15403c 0%,#1b1b1b 100%);
    --hero-ink:#f6efdd; --hero-sub:#cfc6ad; --hero-accent:#e0a23a; --hero-eyebrow:#e0a23a;
    --band-bg:#c1502e; --band-ink:#f6efdd; --band-sub:#f3ddd0; --band-inp:var(--ink);
    --foot-bg:#15403c; --foot-ink:#cfc6ad; --foot-name:#f6efdd; --foot-mut:#9aa39a;
    --bunting:repeating-linear-gradient(90deg,var(--chrome) 0 22px,var(--brand) 22px 26px,var(--gold) 26px 30px);
    --stripes:#ece4d2;
    --motto-bg:#f6efdd; --motto-ink:#15403c; --motto-mark:#c1502e;
  }
  .stripes{border-bottom:3px solid var(--chrome);}
  .hero-h1{letter-spacing:4px;}`,
  // 1976 — Bicentennial / 70s (Bookman, brown + harvest gold + burnt orange + avocado)
  '1976': `:root{
    --bg:#ece0c2; --paper:#f4ead0; --paper2:#e3d3a9; --ink:#2a1f12; --ink-soft:#4a3a22; --muted:#7c6a48; --line:#cdb98c;
    --chrome:#5a3a1e; --chrome-ink:#f1e3c2; --brand:#c1551f; --brand-dk:#97400f; --gold:#d99a2b; --gold-dk:#a8731c;
    --disp:'Bookman Old Style','Bookman','Cooper Black',Georgia,serif; --serif:'Bookman Old Style',Georgia,serif; --label:'Bookman Old Style',Georgia,serif;
    --h-transform:uppercase; --h-variant:normal; --h-spacing:1px; --rule-style:solid; --rule-w:4px; --radius:10px;
    --hero-bg:linear-gradient(135deg,#5a3a1e 0%,#c1551f 100%);
    --hero-ink:#f6ecd2; --hero-sub:#e8d3a8; --hero-accent:#f0b43a; --hero-eyebrow:#f0b43a;
    --band-bg:#c1551f; --band-ink:#f6ecd2; --band-sub:#f3ddc4; --band-inp:var(--chrome);
    --foot-bg:#3a2510; --foot-ink:#e8d3a8; --foot-name:#f6ecd2; --foot-mut:#b79a68;
    --bunting:repeating-linear-gradient(90deg,var(--gold) 0 26px,#6b7d2c 26px 52px,var(--brand) 52px 78px);
    --stripes:#ece0c2;
    --motto-bg:#f4ead0; --motto-ink:#5a3a1e; --motto-mark:#c1551f;
  }
  .stripes{border-bottom:4px solid var(--gold);}
  .case{border-radius:10px;}`,
  // 1826 — Federal / Jacksonian (Didone, federal blue + buff + brass)
  '1826': `:root{
    --bg:#efe9d8; --paper:#fbf7ec; --paper2:#e8e0c9; --ink:#20242e; --ink-soft:#3c4150; --muted:#74705f; --line:#d6cdb3;
    --chrome:#2a3b5f; --chrome-ink:#e7e1cd; --brand:#8c2f23; --brand-dk:#6c2018; --gold:#b08d3e; --gold-dk:#8d6f2c;
    --disp:'Bodoni MT','Didot','Playfair Display','Times New Roman',Georgia,serif; --serif:Georgia,'Times New Roman',serif; --label:'Bodoni MT','Didot',Georgia,serif;
    --h-transform:uppercase; --h-variant:small-caps; --h-spacing:1.5px; --rule-style:double; --rule-w:3px; --radius:0px;
    --hero-bg:linear-gradient(rgba(42,59,95,.93),rgba(42,59,95,.96)),#2a3b5f;
    --hero-ink:#f3eede; --hero-sub:#cdd0c0; --hero-accent:#d8b15a; --hero-eyebrow:#d8b15a;
    --band-bg:#8c2f23; --band-ink:#f3eede; --band-sub:#f0ddd6; --band-inp:var(--chrome);
    --foot-bg:#20242e; --foot-ink:#cdd0c0; --foot-name:#f3eede; --foot-mut:#9a9a86;
    --bunting:repeating-linear-gradient(90deg,var(--chrome) 0 40px,var(--gold) 40px 44px);
    --stripes:#efe9d8;
    --motto-bg:#fbf7ec; --motto-ink:#2a3b5f; --motto-mark:#b08d3e;
  }
  .stripes{border-bottom:3px double var(--chrome);}`,
  // 1876 — Victorian Centennial (Goudy, cream + oxblood + forest green + gold)
  '1876': `:root{
    --bg:#efe7d0; --paper:#f8f2df; --paper2:#e6dcbf; --ink:#241c12; --ink-soft:#463a26; --muted:#786a4e; --line:#d4c7a0;
    --chrome:#6e1f2a; --chrome-ink:#f1e4c8; --brand:#2f5d3a; --brand-dk:#20402a; --gold:#b58a36; --gold-dk:#8e6c26;
    --disp:'Goudy Old Style','Bookman Old Style','Palatino Linotype',Georgia,serif; --serif:'Palatino Linotype',Georgia,serif; --label:'Goudy Old Style','Bookman Old Style',Georgia,serif;
    --h-transform:none; --h-variant:small-caps; --h-spacing:.5px; --rule-style:double; --rule-w:3px; --radius:2px;
    --hero-bg:radial-gradient(at 50% 0%,rgba(181,138,54,.18),transparent 60%),#efe7d0;
    --hero-ink:#241c12; --hero-sub:#52462e; --hero-accent:#6e1f2a; --hero-eyebrow:#b58a36;
    --band-bg:#6e1f2a; --band-ink:#f6edd6; --band-sub:#e9d6b8; --band-inp:var(--ink);
    --foot-bg:#241c12; --foot-ink:#e2d6b6; --foot-name:#f6edd6; --foot-mut:#bdaa84;
    --bunting:repeating-linear-gradient(90deg,var(--gold) 0 6px,transparent 6px 16px),var(--chrome);
    --stripes:#efe7d0;
    --motto-bg:#f8f2df; --motto-ink:#6e1f2a; --motto-mark:#2f5d3a;
  }
  .stripes{border-bottom:3px double var(--gold);}
  .hero-h1{text-transform:none;}`,
  // 1926 — Jazz Age Deco (Futura, black + gold + cream)
  '1926': `:root{
    --bg:#ece4cf; --paper:#f5eed8; --paper2:#e0d6ba; --ink:#161310; --ink-soft:#3a342a; --muted:#6f6753; --line:#cabf9f;
    --chrome:#14110d; --chrome-ink:#e8d9a8; --brand:#b0892e; --brand-dk:#8a6a1e; --gold:#c9a227; --gold-dk:#9c7d1f;
    --disp:'Futura','Century Gothic','Twentieth Century',ui-sans-serif,sans-serif; --serif:Georgia,'Times New Roman',serif; --label:'Futura','Century Gothic',sans-serif;
    --h-transform:uppercase; --h-variant:normal; --h-spacing:4px; --rule-style:solid; --rule-w:2px; --radius:0px;
    --hero-bg:linear-gradient(135deg,#14110d 0%,#2a2418 100%);
    --hero-ink:#f3e7c0; --hero-sub:#cdbf94; --hero-accent:#e6bb3a; --hero-eyebrow:#e6bb3a;
    --band-bg:#14110d; --band-ink:#f3e7c0; --band-sub:#cdbf94; --band-inp:var(--ink);
    --foot-bg:#14110d; --foot-ink:#cdbf94; --foot-name:#f3e7c0; --foot-mut:#9a8d6a;
    --bunting:repeating-linear-gradient(90deg,#14110d 0 18px,var(--gold) 18px 22px);
    --stripes:#ece4cf;
    --motto-bg:#f5eed8; --motto-ink:#14110d; --motto-mark:#b0892e;
  }
  .stripes{border-bottom:3px solid var(--chrome);}
  .hero-h1{letter-spacing:5px;}`,
};

const BASE = `
*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.6 var(--serif);}
.wrap{max-width:1120px;margin:0 auto;padding:0 22px;}
a{color:var(--brand-dk);}
h1,h2,h3,h4{margin:0;line-height:1.05;}

.bunting{height:8px;background:var(--bunting);}
.stripes{height:8px;background:var(--stripes);}

.site-head{background:var(--paper);border-bottom:3px var(--rule-style) var(--chrome);}
.head-grid{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:16px 22px;}
.brand{display:flex;align-items:center;gap:16px;text-decoration:none;}
.seal{width:64px;height:64px;flex:none;}
.seal-disc{fill:var(--chrome);}
.seal-ring{fill:none;stroke:var(--gold);stroke-width:1;stroke-dasharray:2 2;}
.seal-star{fill:var(--chrome-ink);}
.seal-center{fill:var(--gold);font-family:var(--disp);font-weight:bold;}
.seal-sub{fill:var(--chrome-ink);letter-spacing:1px;}
.brand-text{display:flex;flex-direction:column;}
.brand-name{font:800 40px/0.9 var(--disp);letter-spacing:var(--h-spacing);color:var(--chrome);text-transform:uppercase;font-variant:var(--h-variant);}
.brand-dot{color:var(--brand);font-size:.6em;vertical-align:top;margin-left:2px;}
.brand-tag{font:italic 13px/1.3 var(--serif);color:var(--brand);margin-top:4px;}
.head-cta{display:flex;flex-direction:column;align-items:flex-end;gap:7px;}
.head-eyebrow{color:var(--gold-dk);letter-spacing:.3em;font-size:14px;}

.btn{display:inline-block;font:700 14px var(--label);letter-spacing:.08em;text-transform:uppercase;font-variant:var(--h-variant);padding:11px 20px;border-radius:var(--radius);text-decoration:none;cursor:pointer;border:2px solid transparent;transition:.12s;}
.btn.lg{font-size:17px;padding:14px 28px;}
.btn.block{display:block;width:100%;text-align:center;}
.btn-gold{background:var(--paper2);color:var(--ink);border-color:var(--chrome);}
.btn-gold:hover{background:var(--chrome);color:var(--chrome-ink);}
.btn-red{background:var(--brand);color:#fff;border-color:var(--brand-dk);}
.btn-red:hover{background:var(--brand-dk);}
.btn-outline{background:transparent;color:var(--hero-ink);border-color:var(--hero-ink);}
.btn-outline:hover{background:var(--hero-ink);color:var(--chrome);}

.mainnav{background:var(--chrome);}
.navrow{display:flex;flex-wrap:wrap;align-items:center;}
.mainnav a{color:var(--chrome-ink);text-decoration:none;font:700 13px var(--label);letter-spacing:.13em;text-transform:uppercase;font-variant:var(--h-variant);padding:13px 18px;border-right:1px solid rgba(255,255,255,.1);}
.mainnav a:first-child{border-left:1px solid rgba(255,255,255,.1);}
.mainnav a:hover{background:rgba(0,0,0,.22);color:#fff;}
.mainnav a.active{background:var(--brand);color:#fff;}

.era-switch{margin-left:auto;align-self:center;display:inline-flex;flex-wrap:wrap;border:1px solid rgba(255,255,255,.32);border-radius:999px;overflow:hidden;}
.era{padding:5px 12px;font:700 12px var(--label);letter-spacing:.1em;color:var(--chrome-ink);text-decoration:none;}
.era.on{background:var(--brand);color:#fff;}
.era-switch:hover .era:not(.on){color:#fff;}

.motto-bar{background:var(--motto-bg);border-bottom:2px var(--rule-style) var(--chrome);}
.motto-inner{text-align:center;padding:9px 22px;font:italic 15px var(--serif);color:var(--motto-ink);}
.motto-mark{color:var(--motto-mark);font-style:normal;margin:0 7px;}

.hero{background:var(--hero-bg);color:var(--hero-ink);text-align:center;border-bottom:8px solid var(--gold);}
.hero-inner{padding:60px 22px 66px;}
.hero-eyebrow{display:inline-block;color:var(--hero-eyebrow);letter-spacing:.26em;font:700 13px var(--label);text-transform:uppercase;font-variant:var(--h-variant);margin-bottom:18px;}
.hero-h1{font:800 clamp(40px,8vw,84px)/0.94 var(--disp);letter-spacing:var(--h-spacing);text-transform:var(--h-transform);font-variant:var(--h-variant);}
.hero-red{color:var(--hero-accent);}
.hero-sub{max-width:640px;margin:20px auto 0;font:19px/1.5 var(--serif);color:var(--hero-sub);}
.hero-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:30px;}

.latest{padding:54px 0;}
.section-head{display:flex;align-items:center;gap:18px;margin-bottom:26px;}
.section-title{font:800 clamp(24px,3.5vw,34px) var(--disp);letter-spacing:var(--h-spacing);text-transform:var(--h-transform);font-variant:var(--h-variant);color:var(--chrome);}
.section-rule{flex:1;height:0;border-top:var(--rule-w) var(--rule-style) var(--chrome);}

.case{display:block;background:var(--paper);border:1px solid var(--line);border-top:5px var(--rule-style) var(--brand);border-radius:var(--radius);padding:24px 26px;text-decoration:none;color:inherit;transition:.14s;box-shadow:2px 3px 0 rgba(40,30,15,.07);}
.case:hover{transform:translateY(-2px);box-shadow:3px 6px 0 rgba(40,30,15,.14);border-top-color:var(--chrome);}
.case-cat{font:700 11px var(--label);letter-spacing:.15em;text-transform:uppercase;color:var(--brand);}
.case-h{font:800 23px/1.13 var(--disp);text-transform:var(--h-transform);font-variant:var(--h-variant);letter-spacing:var(--h-spacing);color:var(--chrome);margin:8px 0 10px;}
.case-lead .case-h{font-size:clamp(28px,4vw,42px);}
.case-fix{font:16px/1.5 var(--serif);color:var(--ink-soft);margin:0 0 16px;}
.case-fix b{color:var(--brand-dk);}
.case-sev{display:flex;align-items:center;gap:10px;font:13px var(--label);color:var(--muted);text-transform:uppercase;letter-spacing:.07em;}
.case-go{margin-left:auto;font:700 13px var(--label);letter-spacing:.09em;color:var(--brand-dk);}
.case-lead-wrap{margin-bottom:22px;}
.case-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px;}

.stars i{font-style:normal;color:var(--line);letter-spacing:1px;}
.stars i.on{color:var(--brand);}

.creed{background:var(--chrome);color:var(--chrome-ink);border-top:6px solid var(--gold);}
.creed-inner{display:grid;grid-template-columns:repeat(3,1fr);}
.creed-col{padding:40px 30px;border-left:1px solid rgba(255,255,255,.12);}
.creed-col:first-child{border-left:none;}
.creed-num{font:800 46px var(--disp);color:var(--gold);}
.creed-col h4{font:800 18px var(--label);letter-spacing:.08em;text-transform:uppercase;font-variant:var(--h-variant);margin:6px 0 8px;}
.creed-col p{color:var(--chrome-ink);opacity:.92;font:16px/1.55 var(--serif);margin:0;}

.art-wrap{max-width:760px;padding-top:44px;padding-bottom:30px;}
.cat{font:700 12px var(--label);letter-spacing:.16em;text-transform:uppercase;color:var(--brand);}
.art-h1{font:800 clamp(30px,5.2vw,52px)/1.03 var(--disp);text-transform:var(--h-transform);font-variant:var(--h-variant);letter-spacing:var(--h-spacing);color:var(--chrome);margin:12px 0 16px;}
.art-deck{font:italic 21px/1.45 var(--serif);color:var(--ink-soft);margin:0 0 20px;}
.art-meta{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:14px 0;border-top:1px solid var(--chrome);border-bottom:var(--rule-w) var(--rule-style) var(--chrome);font:14px var(--label);color:var(--muted);}
.dot-sep{color:var(--line);}
.sev-inline b{color:var(--brand-dk);}

.dossier{border:var(--rule-w) var(--rule-style) var(--chrome);margin:26px 0 32px;background:var(--paper);box-shadow:2px 3px 0 rgba(40,30,15,.08);}
.dos-row{display:grid;grid-template-columns:170px 1fr;border-bottom:1px solid var(--line);}
.dos-row:last-child{border-bottom:none;}
.dos-row.fix{background:color-mix(in srgb,var(--brand) 8%,var(--paper));}
.dos-lab{background:var(--chrome);color:var(--chrome-ink);padding:18px 16px;font:800 12px var(--label);letter-spacing:.1em;text-transform:uppercase;font-variant:var(--h-variant);}
.dos-row.fix .dos-lab{background:var(--brand);}
.dos-val{padding:18px 20px;font:16px/1.55 var(--serif);}
.stamp{display:inline-block;transform:rotate(-6deg);color:var(--brand);border:3px double var(--brand);padding:3px 9px 2px;border-radius:2px;font:800 13px var(--label);letter-spacing:.16em;text-transform:uppercase;font-variant:var(--h-variant);opacity:.85;margin-left:6px;}

.art-body{font:19px/1.75 var(--serif);color:var(--ink);}
.art-body p{margin:0 0 20px;}
.art-body p:first-of-type::first-letter{float:left;font:800 66px/.74 var(--disp);color:var(--brand);padding:8px 10px 0 0;}
.fn a{color:var(--brand);text-decoration:none;font:700 12px var(--label);vertical-align:super;font-size:.66em;}
.pull{border-left:6px solid var(--brand);margin:30px 0;padding:6px 0 6px 22px;font:italic 24px/1.4 var(--serif);color:var(--chrome);}
.pull cite{display:block;font:600 14px var(--label);font-style:normal;color:var(--muted);margin-top:10px;}

.refs{border-top:var(--rule-w) var(--rule-style) var(--chrome);margin-top:38px;padding-top:22px;}
.refs-h,.press-h{font:800 16px var(--label);letter-spacing:.11em;text-transform:uppercase;font-variant:var(--h-variant);color:var(--chrome);margin-bottom:14px;}
.refs-list{margin:0;padding-left:22px;}
.refs-list li{font:14px/1.6 var(--label);color:var(--ink-soft);margin-bottom:11px;}
.press{margin-top:34px;}
.press-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.clip{display:flex;flex-direction:column;gap:6px;border:1px solid var(--line);border-top:4px var(--rule-style) var(--chrome);background:var(--paper);padding:15px 16px;text-decoration:none;color:inherit;transition:.12s;}
.clip:hover{border-top-color:var(--brand);transform:translateY(-2px);}
.clip-out{font:700 11px var(--label);letter-spacing:.11em;text-transform:uppercase;color:var(--brand);}
.clip-q{font:italic 15px/1.4 var(--serif);color:var(--ink);}
.clip-go{font:700 12px var(--label);letter-spacing:.09em;color:var(--muted);}

.signup-band{background:var(--band-bg);color:var(--band-ink);border-top:6px solid var(--chrome);border-bottom:6px solid var(--chrome);}
.signup-inner{display:flex;align-items:center;justify-content:space-between;gap:30px;flex-wrap:wrap;padding:38px 22px;}
.signup-h{font:800 30px var(--disp);letter-spacing:var(--h-spacing);text-transform:uppercase;font-variant:var(--h-variant);}
.signup-p{max-width:530px;margin:8px 0 0;color:var(--band-sub);font:16px/1.5 var(--serif);}
.signup-form{display:flex;gap:10px;flex-wrap:wrap;}
.signup-form input{padding:14px 16px;border:2px solid var(--band-inp);border-radius:var(--radius);font:16px var(--serif);min-width:260px;color:var(--ink);background:var(--paper);}

.sub-hero{background:var(--chrome);color:var(--chrome-ink);text-align:center;padding:54px 22px 46px;border-bottom:8px solid var(--gold);}
.sub-h1{font:800 clamp(32px,6vw,58px) var(--disp);text-transform:var(--h-transform);font-variant:var(--h-variant);letter-spacing:var(--h-spacing);margin:14px 0 14px;}
.sub-deck{max-width:620px;margin:0 auto;font:18px/1.5 var(--serif);color:var(--chrome-ink);opacity:.92;}
.steps{padding:48px 0 10px;}
.steps-grid{display:grid;grid-template-columns:repeat(3,1fr);}
.step{padding:22px 26px;border-left:1px solid var(--line);}
.step:first-child{border-left:none;}
.step-num{font:800 40px var(--disp);color:var(--brand);}
.step h4{font:800 16px var(--label);letter-spacing:.09em;text-transform:uppercase;font-variant:var(--h-variant);color:var(--chrome);margin:8px 0 8px;}
.step p{margin:0;font:15px/1.55 var(--serif);color:var(--ink-soft);}
.form-band{padding:20px 0 60px;}
.case-form{max-width:680px;}
.grp{margin-bottom:20px;}
.case-form label{display:block;font:800 12px var(--label);letter-spacing:.09em;text-transform:uppercase;font-variant:var(--h-variant);color:var(--chrome);margin-bottom:7px;}
.hint{font:italic 13px var(--serif);font-weight:400;text-transform:none;letter-spacing:0;color:var(--muted);margin-left:8px;}
.case-form input[type=text],.case-form input[type=email],.case-form textarea{width:100%;padding:12px 13px;border:2px solid var(--chrome);border-radius:var(--radius);font:16px/1.5 var(--serif);color:var(--ink);background:var(--paper);}
.case-form textarea{resize:vertical;min-height:92px;}
.verify-note{background:color-mix(in srgb,var(--brand) 8%,var(--paper));border:1px solid var(--line);border-left:4px solid var(--brand);padding:15px 18px;margin:6px 0 18px;font:14px/1.55 var(--serif);color:var(--ink-soft);}
.check{display:flex;align-items:center;gap:10px;font:16px var(--serif)!important;text-transform:none!important;letter-spacing:0!important;color:var(--ink)!important;margin-bottom:18px;}
.check input{width:auto;}
.disclaimer{font:italic 13px/1.6 var(--serif);color:var(--muted);border-top:1px solid var(--line);padding-top:14px;margin-top:14px;}

.site-foot{background:var(--foot-bg);color:var(--foot-ink);border-top:6px solid var(--brand);}
.foot-grid{display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap;padding:36px 22px 18px;}
.foot-name{color:var(--foot-name);font:800 26px var(--disp);letter-spacing:var(--h-spacing);text-transform:uppercase;font-variant:var(--h-variant);}
.foot-mission{margin:8px 0 0;color:var(--foot-mut);font:italic 16px var(--serif);max-width:400px;}
.foot-nav{display:flex;flex-wrap:wrap;gap:18px;align-items:center;}
.foot-nav a{color:var(--foot-ink);text-decoration:none;font:700 12px var(--label);letter-spacing:.1em;text-transform:uppercase;font-variant:var(--h-variant);}
.foot-nav a:hover{color:var(--gold);}
.foot-fine{border-top:1px solid rgba(255,255,255,.12);padding-top:14px;padding-bottom:26px;}
.foot-fine p{font:12px/1.6 var(--label);color:var(--foot-mut);margin:0;}

@media(max-width:820px){
  .case-grid,.press-grid,.creed-inner,.steps-grid{grid-template-columns:1fr;}
  .creed-col,.step{border-left:none;border-top:1px solid rgba(255,255,255,.12);}
  .step{border-top:1px solid var(--line);}
  .dos-row{grid-template-columns:1fr;}
  .dos-lab{padding:12px 16px;}
  .head-cta{display:none;}
  .signup-inner{flex-direction:column;align-items:flex-start;}
  .signup-form input{min-width:0;flex:1;}
}
`;

function css(theme) {
  return (SKINS[theme] || SKINS.modern) + '\n' + BASE;
}

module.exports = { css, SKINS };
