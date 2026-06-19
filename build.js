/* fuxed.org static site generator — patriotic / political-site aesthetic.
   Loud red-white-blue chrome wrapped around sober, cited reporting.
   Run: node build.js  -> writes ./site/*.html + ./site/styles.css */
const fs = require('fs');
const path = require('path');
const THEME = (process.env.THEME || 'modern').toLowerCase();
const OUT = path.join(__dirname, process.env.SITE_DIR || (THEME === '1776' ? 'site-1776' : 'site'));
fs.mkdirSync(OUT, { recursive: true });

/* ----------------------------- theme copy -------------------------- */
const THEMES = {
  modern: {
    tag: "America's Permanent Record of Unforced Errors",
    headSym: '★ ★ ★',
    reportBtn: 'Report a Case',
    signupH: 'JOIN THE WEEKLY FUXED',
    signupP: 'One thing that worked fine — and exactly how it got ruined — in your inbox every Sunday. Citations included. No tracking. One-click unsubscribe.',
    signupBtn: 'Sign Me Up &nbsp;★',
    footMission: 'A documented record of things that worked — until somebody fixed them.',
    heroEyebrow: '★ ★ ★ &nbsp; THE FUXED FILES &nbsp; ★ ★ ★',
    heroH1: 'IT WASN’T BROKEN.<br><span class="hero-red">THEN SOMEBODY FIXED IT.</span>',
    heroSub: 'A patriotic public record of working things, ruined by improvement. Sourced. Cited. Filed for posterity.',
    heroBtnSee: 'See the Cases',
    heroBtnReport: 'Report One &nbsp;★',
    sectionTitle: '★ Latest Cases on File',
    subEyebrow: '★ ★ ★ &nbsp; TIP LINE &nbsp; ★ ★ ★',
    subH1: 'Report Something That Got FUXED',
    subDeck: 'You bring the tip. Our desk researches it, verifies it, writes it up with real citations — and, if it holds up, files it on the record. Not everything makes the cut.',
    sevWord: 'Severity',
    mottoMark: '★',
    sealSub: 'EST. 2026',
    eraOther: 'https://fuxed-1776.pages.dev/',
    homeTitle: 'FUXED — It Wasn’t Broken. Then Somebody Fixed It.',
    homeDesc: 'A patriotic, cited record of things that were working fine until someone "fixed" them and made them worse.',
  },
  '1776': {
    tag: 'A Faithful Chronicle of Things Not Broken, Yet Fixed',
    headSym: '❧ ✦ ❧',
    reportBtn: 'Lodge a Grievance',
    signupH: 'SUBSCRIBE TO THE WEEKLY DISPATCH',
    signupP: 'One working thing, undone by improvement — delivered by post every Sabbath. Faithfully cited. No spies, no tracking. Withdraw thy name at will.',
    signupBtn: 'Affix My Name &nbsp;❧',
    footMission: 'A faithful record of things that worked — until they were fixed, for the public good.',
    heroEyebrow: '❧ &nbsp; THESE FUXED COLONIES · MDCCLXXVI &nbsp; ❧',
    heroH1: 'WHEN A THING WORKETH,<br><span class="hero-red">LET IT NOT BE FIXED.</span>',
    heroSub: 'A faithful chronicle of working things, undone by improvement — sourced, cited, and submitted to a candid world.',
    heroBtnSee: 'Read the Grievances',
    heroBtnReport: 'Lodge One &nbsp;❧',
    sectionTitle: '❧ A Record of Grievances',
    subEyebrow: '❧ &nbsp; THE PETITION DESK &nbsp; ❧',
    subH1: 'Submit a Grievance',
    subDeck: 'You bring the grievance. Our clerks research it, verify it, and enter it upon the record with faithful citation — if it holds up. Not every petition is published.',
    sevWord: 'Grievance',
    mottoMark: '❧',
    sealSub: 'MDCCLXXVI',
    eraOther: 'https://fuxed.pages.dev/',
    homeTitle: 'FUXED · MDCCLXXVI — When a Thing Worketh, Let It Not Be Fixed.',
    homeDesc: 'A colonial broadside chronicling things that worked fine until they were "fixed." Faithfully sourced and cited, submitted to a candid world.',
  },
};
const __m = THEMES.modern;
THEMES['1830'] = { ...__m, tag: 'The People’s Record of Improvements Nobody Asked For', heroEyebrow: '★ ★ ★ &nbsp; THE JACKSONIAN LEDGER &nbsp; ★ ★ ★', heroH1: 'THE PEOPLE’S WILL,<br><span class="hero-red">IMPROVED UPON.</span>', heroSub: 'A faithful ledger of working things, improved into ruin — sourced, cited, and entered upon the record.', sectionTitle: '★ A Ledger of Grievances', mottoMark: '★', sealSub: '1830', homeTitle: 'FUXED · 1830 — The People’s Will, Improved Upon.', homeDesc: 'A Jacksonian-era ledger of things that worked until they were "improved," faithfully sourced and cited.' };
THEMES['1860'] = { ...__m, tag: 'A Faithful Account of Compromises Improved Into Crises', heroEyebrow: '★ ★ ★ &nbsp; THE UNION OBSERVER &nbsp; ★ ★ ★', heroH1: 'IT HELD THE UNION<br><span class="hero-red">UNTIL THEY FIXED IT.</span>', heroSub: 'A faithful account of working compromises, improved into crises — sourced, cited, submitted to a candid public.', sectionTitle: '★ A Record of Compromises', mottoMark: '★', sealSub: '1860', homeTitle: 'FUXED · 1860 — It Held the Union Until They Fixed It.', homeDesc: 'An antebellum record of compromises that worked until they were "fixed," faithfully sourced and cited.' };
THEMES['1900'] = { ...__m, tag: 'The Gilded Record of Progress, So Called', heroEyebrow: '❦ &nbsp; THE GILDED GAZETTE &nbsp; ❦', heroH1: 'IT RAN LIKE CLOCKWORK.<br><span class="hero-red">SO THEY IMPROVED IT.</span>', heroSub: 'A gilded catalogue of working things, improved into ruin — richly sourced and faithfully cited.', sectionTitle: '❦ A Catalogue of Improvements', mottoMark: '❦', sealSub: '1900', homeTitle: 'FUXED · 1900 — It Ran Like Clockwork. So They Improved It.', homeDesc: 'A Gilded-Age catalogue of things that worked until they were "improved," richly sourced and cited.' };
THEMES['1933'] = { ...__m, tag: 'A Square Account of Fixes That Laid an Egg', heroEyebrow: '◆ &nbsp; THE DEPRESSION DISPATCH &nbsp; ◆', heroH1: 'IT WAS GETTING BY.<br><span class="hero-red">THEN THEY FIXED IT.</span>', heroSub: 'A square account of working things, fixed into a flop — on the level, sourced, and cited.', sectionTitle: '◆ The Fix Is In', mottoMark: '◆', sealSub: '1933', homeTitle: 'FUXED · 1933 — It Was Getting By. Then They Fixed It.', homeDesc: 'A Depression-era dispatch on things that were getting by until they were "fixed," sourced and cited.' };
THEMES['1976'] = { ...__m, tag: 'The Bicentennial Dispatch of Fixes That Laid an Egg', heroEyebrow: '★ &nbsp; THE BICENTENNIAL DISPATCH &nbsp; ★', heroH1: 'IT WAS KEEPIN’ ON TRUCKIN’.<br><span class="hero-red">THEN THEY FIXED IT.</span>', heroSub: 'A bicentennial dispatch on far-out fixes that laid an egg — sourced, cited, and heavy, man.', sectionTitle: '★ The Fix Is In, Good Buddy', mottoMark: '★', sealSub: '1976', homeTitle: 'FUXED · 1976 — It Was Keepin’ On Truckin’. Then They Fixed It.', homeDesc: 'A Bicentennial-era dispatch on things that were keepin’ on truckin’ until someone “fixed” them. Sourced and cited.' };
THEMES['1826'] = { ...__m, tag: 'A Republican Chronicle of Bargains Most Corrupt', heroEyebrow: '✦ &nbsp; THE NATIONAL INTELLIGENCER &nbsp; ✦', heroH1: 'IT WAS A REPUBLIC.<br><span class="hero-red">SO THEY FIXED IT.</span>', heroSub: 'A republican chronicle of working arrangements, improved into ruin — soberly sourced and cited.', sectionTitle: '✦ A Register of Grievances', mottoMark: '✦', sealSub: '1826', homeTitle: 'FUXED · 1826 — It Was a Republic. So They Fixed It.', homeDesc: 'A Jacksonian-era register of arrangements that worked until they were “fixed.” Soberly sourced and cited.' };
THEMES['1876'] = { ...__m, tag: 'The Centennial Record of Promises, Compromised', heroEyebrow: '❦ &nbsp; THE CENTENNIAL OBSERVER &nbsp; ❦', heroH1: 'A UNION PRESERVED.<br><span class="hero-red">THEN QUIETLY UN-FIXED.</span>', heroSub: 'A centennial record of hard-won settlements, traded away — faithfully sourced and cited.', sectionTitle: '❦ A Record of Compromises', mottoMark: '❦', sealSub: '1876', homeTitle: 'FUXED · 1876 — A Union Preserved. Then Quietly Un-Fixed.', homeDesc: 'A Centennial-era record of hard-won settlements that worked until they were bargained away. Sourced and cited.' };
THEMES['1926'] = { ...__m, tag: 'The Jazz-Age Bulletin of Swell Ideas Gone Flat', heroEyebrow: '◆ &nbsp; THE JAZZ AGE BULLETIN &nbsp; ◆', heroH1: 'IT WAS THE BEE’S KNEES.<br><span class="hero-red">THEN THEY FIXED IT.</span>', heroSub: 'A jazz-age bulletin of swell ideas gone flat — on the level, sourced and cited, see?', sectionTitle: '◆ The Bunk on File', mottoMark: '◆', sealSub: '1926', homeTitle: 'FUXED · 1926 — It Was the Bee’s Knees. Then They Fixed It.', homeDesc: 'A Jazz-Age bulletin on swell ideas that worked until somebody “fixed” them. Sourced and cited, see?' };
const T = THEMES[THEME] || THEMES.modern;

// Base path for this edition (served at fuxed.org<BASE>/). '' = root (2026).
const BASE = process.env.BASE || '';
// All editions, newest first, for the edition picker in the nav.
const EDITIONS = [
  { base: '', label: '2026' },
  { base: '/1976', label: '1976' },
  { base: '/1926', label: '1926' },
  { base: '/1876', label: '1876' },
  { base: '/1826', label: '1826' },
  { base: '/1776', label: '1776' },
];

/* ----------------------------- helpers ----------------------------- */
const stars = (n) =>
  '<span class="stars" aria-label="severity ' + n + ' of 5">' +
  '★★★★★'.slice(0, n).split('').map(() => '<i class="on">★</i>').join('') +
  '☆☆☆☆☆'.slice(0, 5 - n).split('').map(() => '<i>★</i>').join('') +
  '</span>';

const fn = (n) => `<sup class="fn"><a href="#r${n}">${n}</a></sup>`;

const refList = (refs) =>
  '<ol class="refs-list">' +
  refs.map((r, i) => `<li id="r${i + 1}">${r}</li>`).join('') +
  '</ol>';

const pressList = (items) =>
  items.map(p => `<a class="clip" href="${p.url}" target="_blank" rel="noopener">
      <span class="clip-out">${p.outlet}</span>
      <span class="clip-q">${p.title}</span>
      <span class="clip-go">Read &rarr;</span></a>`).join('');

/* ------------------------------ seal SVG --------------------------- */
const SEAL = `<svg class="seal" viewBox="0 0 100 100" aria-hidden="true">
  <circle class="seal-disc" cx="50" cy="50" r="48"/>
  <circle class="seal-ring" cx="50" cy="50" r="40"/>
  ${Array.from({length:13}).map((_,i)=>{const a=(i/13)*2*Math.PI-Math.PI/2;const x=50+33*Math.cos(a);const y=50+33*Math.sin(a);return `<text class="seal-star" x="${x.toFixed(1)}" y="${(y+2).toFixed(1)}" font-size="6" text-anchor="middle">★</text>`}).join('')}
  <text class="seal-center" x="50" y="47" font-size="18" text-anchor="middle">FX</text>
  <text class="seal-sub" x="50" y="62" font-size="5.5" text-anchor="middle">${T.sealSub || ''}</text>
</svg>`;

/* ------------------------------ layout ----------------------------- */
function layout({ title, desc, body, active = '' }) {
  const HOME = (BASE || '') + '/';
  const nav = [
    [HOME, 'Latest'],
    ...articles.map(a => [a.nav, a.category.split('·')[0].trim()]),
    [BASE + '/submit', 'Submit'],
  ];
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<link rel="stylesheet" href="${BASE}/styles.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23B22234'/%3E%3Ctext x='16' y='23' font-family='Impact,sans-serif' font-size='20' fill='white' text-anchor='middle'%3EF%3C/text%3E%3C/svg%3E">
</head>
<body>
<div class="bunting" aria-hidden="true"></div>

<header class="site-head">
  <div class="wrap head-grid">
    <a class="brand" href="${HOME}">
      ${SEAL}
      <span class="brand-text">
        <span class="brand-name">FUXED<span class="brand-dot">★</span></span>
        <span class="brand-tag">${T.tag}</span>
      </span>
    </a>
    <div class="head-cta">
      <span class="head-eyebrow">${T.headSym}</span>
      <a class="btn btn-gold" href="${BASE}/submit">${T.reportBtn}</a>
    </div>
  </div>
  <div class="stripes" aria-hidden="true"></div>
  <nav class="mainnav">
    <div class="wrap navrow">
      ${nav.map(([h, t]) => `<a href="${h}"${active === h ? ' class="active"' : ''}>${t}</a>`).join('')}
      <nav class="era-switch" aria-label="Editions">${EDITIONS.map(e => `<a class="era${(BASE || '') === e.base ? ' on' : ''}" href="${(e.base || '') + '/'}">${e.label}</a>`).join('')}</nav>
    </div>
  </nav>
  <div class="motto-bar"><div class="wrap motto-inner"><span class="motto-mark">${T.mottoMark}</span> To protect freedom and ensure the future of our children — or whatever. <span class="motto-mark">${T.mottoMark}</span></div></div>
</header>

<main>${body}</main>

<section class="signup-band">
  <div class="wrap signup-inner">
    <div>
      <h2 class="signup-h">${T.signupH}</h2>
      <p class="signup-p">${T.signupP}</p>
    </div>
    <form class="signup-form" method="post" action="/api/subscribe">
      <input type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
      <input type="email" name="email" placeholder="your@email.com" aria-label="Email address" required>
      <button class="btn btn-red" type="submit">${T.signupBtn}</button>
    </form>
  </div>
</section>

<footer class="site-foot">
  <div class="wrap foot-grid">
    <div>
      <span class="brand-name foot-name">FUXED<span class="brand-dot">★</span></span>
      <p class="foot-mission">${T.footMission}</p>
    </div>
    <nav class="foot-nav">
      ${nav.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}
      <a href="${BASE}/submit">Newsletter</a>
    </nav>
  </div>
  <div class="foot-fine wrap">
    <p>© 2026 fuxed.org · Satire and documented public record. Independent and nonpartisan — not affiliated with, endorsed by, or speaking for any candidate, political party, campaign, or government agency. Reporting is sourced to named outlets and official records; opinions are the publication's own.</p>
  </div>
</footer>
</body>
</html>`;
}

/* ----------------------------- articles ---------------------------- */
const builtinArticles = [
  {
    slug: 'reflecting-pool',
    nav: '/reflecting-pool',
    category: 'Government · Public Works',
    sev: 3, sevLabel: 'Notable',
    headline: 'Reflecting Pool Renovated, Refilled, Then Promptly Turned Green',
    deck: 'A $14.6 million no-bid contract promised a blue pool in two weeks. The pool took months — and turned green within a day of refilling.',
    read: '5 min',
    wasnt: 'The Lincoln Memorial Reflecting Pool had bloomed algae since 1922 and leaked roughly 500,000 gallons a week — chronic problems, documented, and essentially stable in their dysfunction. Visitors reflected in it anyway.',
    fix: 'In April 2025 the president ordered the pool drained, scrubbed, and repainted "American flag blue." A $14.6 million no-bid contract went to a Virginia firm with no prior federal work, under an emergency exemption.',
    result: 'Refilled in June 2026, the pool showed algae within a day. By mid-June the Interior Department was dosing it with 12% hydrogen peroxide and nanobubble ozone. The weekly leaks were never in the contract scope.',
    body: `<p>The Lincoln Memorial Reflecting Pool has been turning green since Woodrow Wilson was in office. Algae blooms there in warm weather because Washington is built on a marsh, the pool is shallow, and nutrients have nowhere productive to go. This is not a secret. The Park Service has documented it. Tourists have photographed it. The pool functioned, in the sense that it reflected things.${fn(1)}</p>
<p>On April 23, 2025, the president announced he was personally intervening, describing the pool as "filthy dirty" and saying the floor would be repainted "American flag blue." He estimated two weeks and $1.5–2 million.${fn(1)} The contract ultimately awarded totaled $14.6 million and went to a Virginia firm that had never held a federal contract.${fn(2)} He first said the contractor had called him directly and had worked on his own swimming pools; he later said he did not know the contractor.${fn(3)}</p>
<p>The emergency exemption used to skip competitive bidding requires a finding that open competition would cause "serious injury to the government." Asked in a congressional hearing what that injury was, the Interior Secretary cited deferred maintenance and the need for the pool to look presentable before July 4.${fn(4)} A preservation group sued, arguing that painting a historically unpainted concrete surface violated federal preservation law.${fn(5)}</p>
<p>The pool was refilled in early June 2026. Within a day, algae was visible — driven by the same causes that have applied since 1922: warm, shallow water, nutrient load, and a Washington summer. The newly darkened bottom may also raise water temperature, which accelerates blooms.${fn(6)} The Interior Department deployed hydrogen peroxide and nanobubble ozone and described the algae as "residual" and "part of the normal startup process."${fn(7)} Workers were observed skimming the surface by mid-June.${fn(8)}</p>
<p>The project began as a two-week, two-million-dollar proposition and became a months-long, $14.6 million renovation with a pending lawsuit and an algae emergency. The pool, painted the color of the sky, reflected something closer to the bottom of a stock pond. It remains open to visitors.</p>`,
    pull: '"It’s not supposed to look like you’re going to dive in."',
    pullAttr: '— historians, quoted by CNN, on painting the pool blue',
    refs: [
      'PolitiFact — "Fact-checking Trump on the Reflecting Pool renovation," <a href="https://www.politifact.com/article/2026/may/28/trump-reflecting-pool-renovations-swimming-blue/" target="_blank" rel="noopener">politifact.com</a>, May 28, 2026.',
      'Artnet News — "The Lincoln Memorial Reflecting Pool Is Being Overhauled by Trump’s Pool Contractor," <a href="https://news.artnet.com/art-world/lincoln-memorial-reflecting-pool-trump-renovation-2767878" target="_blank" rel="noopener">news.artnet.com</a>, 2026.',
      'The Hill — "Trump denies knowing Reflecting Pool contractor," <a href="https://thehill.com/homenews/5874959-reflecting-pool-trump-contractor/" target="_blank" rel="noopener">thehill.com</a>, 2026.',
      'PBS NewsHour — "Lawsuit challenges Trump’s Reflecting Pool project as costs soar," <a href="https://www.pbs.org/newshour/show/lawsuit-challenges-trumps-reflecting-pool-project-as-projected-costs-soar" target="_blank" rel="noopener">pbs.org</a>, 2026.',
      'CNN — "Historians criticize Reflecting Pool makeover as group sues," <a href="https://www.cnn.com/2026/05/18/politics/reflecting-pool-trump-paint" target="_blank" rel="noopener">cnn.com</a>, May 18, 2026.',
      'NBC News — "Trump wanted the Reflecting Pool ‘American flag blue.’ Algae are turning it green," <a href="https://www.nbcnews.com/politics/donald-trump/reflecting-pool-green-algae-trump-rcna350278" target="_blank" rel="noopener">nbcnews.com</a>, June 2026.',
      'CNN — "Trump administration turns to hydrogen peroxide to beat back algae," <a href="https://www.cnn.com/2026/06/16/politics/lincoln-reflecting-pool-algae" target="_blank" rel="noopener">cnn.com</a>, June 16, 2026.',
      'The Hill — "Hydrogen peroxide used to tackle reflecting pool algae," <a href="https://thehill.com/homenews/administration/5926372-hydrogen-peroxide-reflecting-pool/" target="_blank" rel="noopener">thehill.com</a>, June 2026.',
    ],
    press: [
      { outlet: 'NBC News', title: 'He wanted it "American flag blue." Algae turned it green.', url: 'https://www.nbcnews.com/politics/donald-trump/reflecting-pool-green-algae-trump-rcna350278' },
      { outlet: 'CNN', title: '"Residual algae" coats part of the newly opened pool.', url: 'https://www.cnn.com/2026/06/16/politics/lincoln-reflecting-pool-algae' },
      { outlet: 'PBS NewsHour', title: 'Lawsuit challenges the project as projected costs soar.', url: 'https://www.pbs.org/newshour/show/lawsuit-challenges-trumps-reflecting-pool-project-as-projected-costs-soar' },
    ],
  },
  {
    slug: 'screwworm',
    nav: '/screwworm',
    category: 'Government · Agriculture',
    sev: 4, sevLabel: 'Severe',
    headline: 'The Fly War Was Won. Then We Closed the Factory.',
    deck: 'America eradicated the flesh-eating screwworm decades ago with one biological insight. The parasite returned after the infrastructure that maintained the win was quietly dismantled.',
    read: '6 min',
    wasnt: 'For about forty years, a continental barrier of sterile male flies held the New World screwworm — a blowfly whose larvae eat living tissue — south of the Darién Gap. The method used no pesticide and exploited one fact: female screwworms mate only once.',
    fix: 'As the parasite receded from memory, the production infrastructure was retired. The Mexican mass-rearing plant — once making 550 million sterile flies a week — closed in 2012 for economic reasons, leaving a single aging Panama facility as the hemisphere’s main defense.',
    result: 'After COVID-era disruptions, detections in Panama jumped from ~25 to over 6,500 cases in 2023. The parasite reached Mexico in late 2024 and Texas by June 2026. The federal response: a $610 million emergency fly factory — replacing one that already existed.',
    body: `<p>The screwworm was, as eradication stories go, unusually legible. Scientists found the vulnerability — females mate once and store sperm for life — and flooded the population with sterilized males.${fn(1)} Mate enough females with sterile males and the population collapses. By 1966 the continental United States was declared free of it; by 2006 a biological barrier at Panama’s Darién Gap released about 100 million sterile flies a week to keep it that way.${fn(1)}</p>
<p>The barrier held because it was maintained — and it was expensive. As the screwworm faded from institutional memory, so did the appetite to fund it. Facilities closed one by one. Experts had warned that depending on a single Panama plant made another incursion inevitable.${fn(2)} The Mexican plant at Tuxtla Gutiérrez, which at peak produced 550 million sterile flies a week, was shuttered in 2012 as an economic decision.${fn(3)}</p>
<p>The pandemic is widely cited as the proximate trigger, disrupting production and surveillance at the Panama facility during 2020–2022. In 2023, Panama detections rose from roughly 25 to more than 6,500. The parasite moved through Central America and entered Mexico in late 2024.${fn(1)}</p>
<p>The primary U.S. response was to stop importing the animals it might travel with. On May 11, 2025, the USDA suspended live cattle, horse, and bison imports across the southern border, effective immediately.${fn(5)} It did not stop the spread. Beef prices — already up sharply since 2019 — faced further pressure.${fn(6)} On June 3, 2026, the parasite was confirmed in a three-week-old calf in Zavala County, Texas, ending a domestic-freedom record that had stood since the 1960s.${fn(7)}</p>
<p>The emergency response now includes a $610 million sterile-fly production facility in Edinburg, Texas — the same function a shuttered plant once performed for a fraction of the cost.${fn(4)} Separately, the agency responsible for border animal inspections lost about 2,009 employees — 23% of its workforce — in the fourteen months before the Texas detection; critics called it removing "the first line of defense." The administration disputed the connection.${fn(8)}</p>`,
    pull: '"As the screwworm got pushed further south, there became less of a need to maintain the sterile fly facilities, so they were shut down."',
    pullAttr: '— reported in The Hill, June 2026',
    refs: [
      'USDA / APHIS — "New World Screwworm Outbreak in Central America and Mexico," <a href="https://www.aphis.usda.gov/livestock-poultry-disease/cattle/ticks/screwworm" target="_blank" rel="noopener">aphis.usda.gov</a>, 2025–2026.',
      'The Wildlife Society — "Another screwworm incursion inevitable, experts warn," <a href="https://wildlife.org/another-screwworm-incursion-inevitable-experts-warn/" target="_blank" rel="noopener">wildlife.org</a>, 2025.',
      'Drovers — "New World Screwworm in the U.S.: From Eradication to Resurgence," <a href="https://www.drovers.com/news/new-world-screwworm-u-s-eradication-resurgence" target="_blank" rel="noopener">drovers.com</a>, 2026.',
      'USDA — "USDA Announces Sweeping Plans to Protect the U.S. from New World Screwworm," <a href="https://www.usda.gov/about-usda/news/press-releases/2025/08/15/usda-announces-sweeping-plans-protect-united-states-new-world-screwworm" target="_blank" rel="noopener">usda.gov</a>, Aug 15, 2025.',
      'USDA — "Secretary Rollins Suspends Live Animal Imports Along Southern Border," <a href="https://www.usda.gov/about-usda/news/press-releases/2025/05/11/secretary-rollins-suspends-live-animal-imports-through-ports-entry-along-southern-border-effective" target="_blank" rel="noopener">usda.gov</a>, May 11, 2025.',
      'Investigate Midwest — "New screwworm threat halts cattle imports from Mexico," <a href="https://investigatemidwest.org/2025/05/21/new-screwworm-threat-halts-cattle-imports-from-mexico-fueling-beef-supply-worries/" target="_blank" rel="noopener">investigatemidwest.org</a>, May 21, 2025.',
      'USDA / APHIS — "USDA Confirms Presence of New World Screwworm in the United States," <a href="https://www.aphis.usda.gov/news/agency-announcements" target="_blank" rel="noopener">aphis.usda.gov</a>, June 3, 2026.',
      'The Hill — "Screwworm spread tests US readiness after staffing cuts," <a href="https://thehill.com/policy/healthcare/5922510-screwworm-spread-tests-us-readiness-after-trump-staffing-cuts/" target="_blank" rel="noopener">thehill.com</a>, June 2026.',
    ],
    press: [
      { outlet: 'USDA / APHIS', title: 'USDA confirms the first U.S. screwworm case since the 1960s.', url: 'https://www.aphis.usda.gov/news/agency-announcements' },
      { outlet: 'The Hill', title: 'Spread tests U.S. readiness after agency staffing cuts.', url: 'https://thehill.com/policy/healthcare/5922510-screwworm-spread-tests-us-readiness-after-trump-staffing-cuts/' },
      { outlet: 'Drovers', title: 'From eradication to resurgence: how the barrier came down.', url: 'https://www.drovers.com/news/new-world-screwworm-u-s-eradication-resurgence' },
    ],
  },
  {
    slug: 'iran',
    nav: '/iran',
    category: 'Foreign Policy · Arms Control',
    sev: 5, sevLabel: 'Catastrophic',
    headline: 'The Deal Was Working. We Fixed It Into a War.',
    deck: 'The 2015 nuclear agreement verifiably constrained Iran’s enrichment. The U.S. withdrew, enrichment accelerated, a war was fought — and the outcome is still disputed.',
    read: '8 min',
    wasnt: 'Under the 2015 deal, Iran’s enrichment was capped at 3.67% purity, its centrifuges cut by two-thirds, and its stockpile slashed — all verified by IAEA inspectors with expanded access and real-time monitoring. The IAEA repeatedly reported Iran in compliance.',
    fix: 'On May 8, 2018, the U.S. withdrew from the agreement — calling it "the worst deal ever" — and imposed a "maximum pressure" sanctions campaign meant to force a broader deal. A replacement was never reached.',
    result: 'By June 2025 Iran held a stockpile enriched to 60% — near weapons-grade. Israel and then the U.S. struck Iran’s nuclear sites. A Defense Intelligence assessment found the program set back "a few months," not "obliterated." Inspectors still cannot access the sites.',
    body: `<p>The 2015 Joint Comprehensive Plan of Action imposed the most intrusive nuclear monitoring ever applied to a non-weapons state. Iran’s enrichment was capped at 3.67%, its centrifuge inventory cut by roughly two-thirds, and its enriched-uranium stockpile reduced by about 98%. Inspectors gained expanded access plus real-time seals and online monitoring.${fn(1)} The IAEA confirmed Iran was meeting its commitments.</p>
<p>The deal’s critics were not satisfied: it did not cover ballistic missiles, sanctions relief could fund proxies, and key limits carried sunset dates. In May 2018 the U.S. withdrew and reimposed sanctions under "maximum pressure," promising a better deal.${fn(2)} None was concluded. A later attempt to return to the deal also collapsed. By 2024 Iran was enriching to 60% — a level with no civilian justification — and the IAEA chief warned it held enough near-weapons-grade material for several bombs if further enriched.${fn(3)}</p>
<p>In June 2025, with talks stalled and Israel assessing Iran as near a breakout, Israel launched a large air campaign against Iran’s nuclear and missile sites beginning June 13.${fn(4)} On June 21–22 the U.S. ran Operation Midnight Hammer: B-2 bombers dropped fourteen 30,000-pound bunker-busters on Fordow and Natanz, with cruise missiles at Isfahan.${fn(4)} The president declared the program "completely and fully obliterated." A ceasefire ended the so-called Twelve-Day War on June 24.</p>
<p>The damage was real — collapsed tunnels, wrecked centrifuge halls. But a Defense Intelligence Agency assessment circulated within days reached a different conclusion than the one announced: the program was set back by months, not eliminated, and some highly enriched uranium had been moved before the strikes.${fn(5)} The White House disputed the finding; the president publicly contradicted his own intelligence director.${fn(5)}</p>
<p>Verification then collapsed. The IAEA had already lost "continuity of knowledge" before the strikes; afterward it withdrew inspectors, and Iran barred access to the attacked sites.${fn(6)} As of mid-2026 the world cannot independently confirm Iran’s remaining stockpile or how far the program has been rebuilt. Commercial satellite imagery shows tunneling near Natanz being reinforced rather than abandoned.${fn(7)}</p>
<p>The arms-control retrospective is unglamorous: any workable alternative would face the same problems the original deal addressed — enrichment limits, verification, sunsets — except Iran now negotiates from a far larger, more advanced, hardened, and partly clandestine program, with international oversight in its worst shape in two decades.${fn(2)}</p>`,
    pull: '"A new U.S. intelligence report found that Iran’s nuclear program has been set back only a few months — and was not ‘completely and fully obliterated.’"',
    pullAttr: '— PBS NewsHour, June 25, 2025',
    refs: [
      'Center for Arms Control and Non-Proliferation — "The Iran Deal, Then and Now," <a href="https://armscontrolcenter.org/the-iran-deal-then-and-now/" target="_blank" rel="noopener">armscontrolcenter.org</a>.',
      'RAND Corporation — "The Revenge of the JCPOA," <a href="https://www.rand.org/pubs/commentary/2025/05/the-revenge-of-the-jcpoa.html" target="_blank" rel="noopener">rand.org</a>, May 4, 2025.',
      'Arms Control Association — "Iran Accelerates Highly Enriched Uranium Production," <a href="https://www.armscontrol.org/act/2024-02/news/iran-accelerates-highly-enriched-uranium-production" target="_blank" rel="noopener">armscontrol.org</a>, Feb 2024.',
      'The War Zone — "B-2 Strikes On Iran: What We Know About Operation Midnight Hammer," <a href="https://www.twz.com/air/b-2-strikes-on-iran-what-we-know-about-operation-midnight-hammer" target="_blank" rel="noopener">twz.com</a>, June 2025.',
      'PBS NewsHour — "Intelligence report suggests Iran’s program only set back by months," <a href="https://www.pbs.org/newshour/politics/new-u-s-intelligence-report-suggests-irans-nuclear-program-only-set-back-by-months-after-strikes" target="_blank" rel="noopener">pbs.org</a>, June 25, 2025.',
      'Chatham House — "The IAEA and Iran reached an agreement on inspections — but it’s already in trouble," <a href="https://www.chathamhouse.org/2025/09/iaea-and-iran-reached-agreement-inspections-looming-sanctions-mean-its-already-trouble" target="_blank" rel="noopener">chathamhouse.org</a>, Sept 2025.',
      'CSIS — "What Operation Midnight Hammer Means for the Future of Iran’s Nuclear Ambitions," <a href="https://www.csis.org/analysis/what-operation-midnight-hammer-means-future-irans-nuclear-ambitions" target="_blank" rel="noopener">csis.org</a>.',
    ],
    press: [
      { outlet: 'PBS NewsHour', title: 'Assessment: program set back "a few months," not obliterated.', url: 'https://www.pbs.org/newshour/politics/new-u-s-intelligence-report-suggests-irans-nuclear-program-only-set-back-by-months-after-strikes' },
      { outlet: 'Chatham House', title: 'Inspectors still cannot access the most sensitive sites.', url: 'https://www.chathamhouse.org/2025/09/iaea-and-iran-reached-agreement-inspections-looming-sanctions-mean-its-already-trouble' },
      { outlet: 'CSIS', title: 'Iran retains the expertise and infrastructure to revive the fuel cycle.', url: 'https://www.csis.org/analysis/what-operation-midnight-hammer-means-future-irans-nuclear-ambitions' },
    ],
  },
];

/* An edition may be supplied as a JSON array via the ARTICLES env var (used by
   the /fuxed skill); otherwise fall back to the built-in three. Normalizes the
   nav path and converts [^n] footnote markers in body to linked superscripts. */
const articles = (process.env.ARTICLES
  ? JSON.parse(fs.readFileSync(process.env.ARTICLES, 'utf8'))
  : builtinArticles
).map(a => {
  // Some research agents double-escaped HTML; decode so bodies/refs render as tags.
  const dec = (s) => (s || '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
  return {
    ...a,
    nav: a.nav || BASE + '/' + a.slug,
    category: dec(a.category),
    body: dec(a.body).replace(/\[\^(\d+)\]/g, (_, n) => fn(n)),
    refs: (a.refs || []).map(dec),
  };
});

/* --------------------------- article page -------------------------- */
function articlePage(a) {
  const body = `
<article class="art">
  <div class="wrap art-wrap">
    <div class="art-kicker"><span class="cat">${a.category}</span></div>
    <h1 class="art-h1">${a.headline}</h1>
    <p class="art-deck">${a.deck}</p>
    <div class="art-meta">
      <span class="byline">By the Fuxed Desk</span>
      <span class="dot-sep">•</span>
      <span>${a.read} read</span>
      <span class="dot-sep">•</span>
      <span class="sev-inline">${T.sevWord} ${stars(a.sev)} <b>${a.sevLabel}</b></span>
    </div>

    <div class="dossier">
      <div class="dos-row"><div class="dos-lab">What wasn’t broken</div><div class="dos-val">${a.wasnt}</div></div>
      <div class="dos-row fix"><div class="dos-lab">The "fix"</div><div class="dos-val">${a.fix}</div></div>
      <div class="dos-row"><div class="dos-lab">The result</div><div class="dos-val">${a.result} <span class="stamp">Fuxed</span></div></div>
    </div>

    <div class="art-body">
      ${a.body}
      <blockquote class="pull">${a.pull}<cite>${a.pullAttr}</cite></blockquote>
    </div>

    <section class="refs">
      <h3 class="refs-h">References &amp; Citations</h3>
      ${refList(a.refs)}
    </section>

    <section class="press">
      <h3 class="press-h">As Covered Elsewhere</h3>
      <div class="press-grid">${pressList(a.press)}</div>
    </section>
  </div>
</article>`;
  return layout({
    title: `${a.headline} — FUXED`,
    desc: a.deck,
    body,
    active: a.nav,
  });
}

/* ------------------------------- home ------------------------------ */
function homePage() {
  const lead = articles[0];
  const rest = articles.slice(1);
  const card = (a, big) => `
    <a class="case ${big ? 'case-lead' : ''}" href="${a.nav}">
      <span class="case-cat">${a.category}</span>
      <h3 class="case-h">${a.headline}</h3>
      <p class="case-fix"><b>The fix:</b> ${a.fix}</p>
      <span class="case-sev">${stars(a.sev)} <b>${a.sevLabel}</b><span class="case-go">Read the case &rarr;</span></span>
    </a>`;

  const body = `
<section class="hero">
  <div class="wrap hero-inner">
    <span class="hero-eyebrow">${T.heroEyebrow}</span>
    <h1 class="hero-h1">${T.heroH1}</h1>
    <p class="hero-sub">${T.heroSub}</p>
    <div class="hero-actions">
      <a class="btn btn-gold lg" href="#latest">${T.heroBtnSee}</a>
      <a class="btn btn-outline lg" href="${BASE}/submit">${T.heroBtnReport}</a>
    </div>
  </div>
</section>

<section class="latest" id="latest">
  <div class="wrap">
    <div class="section-head">
      <h2 class="section-title">${T.sectionTitle}</h2>
      <span class="section-rule"></span>
    </div>
    <div class="case-lead-wrap">${card(lead, true)}</div>
    <div class="case-grid">${rest.map(a => card(a, false)).join('')}</div>
  </div>
</section>

<section class="creed">
  <div class="wrap creed-inner">
    <div class="creed-col"><span class="creed-num">1</span><h4>What Wasn’t Broken</h4><p>We start with the thing that was working fine — boring, dependable, doing its job.</p></div>
    <div class="creed-col"><span class="creed-num">2</span><h4>The "Fix"</h4><p>Then the improvement: bold, expensive, announced with confidence. Usually unrequested.</p></div>
    <div class="creed-col"><span class="creed-num">3</span><h4>The Result</h4><p>And the receipts — what it cost, what broke, and the citations to prove it.</p></div>
  </div>
</section>`;
  return layout({ title: T.homeTitle, desc: T.homeDesc, body, active: (BASE || '') + '/' });
}

/* ------------------------------ submit ----------------------------- */
function submitPage() {
  const body = `
<section class="sub-hero">
  <div class="wrap">
    <span class="hero-eyebrow">${T.subEyebrow}</span>
    <h1 class="sub-h1">${T.subH1}</h1>
    <p class="sub-deck">${T.subDeck}</p>
  </div>
</section>

<section class="steps">
  <div class="wrap steps-grid">
    <div class="step"><span class="step-num">1</span><h4>You Submit</h4><p>Tell us what was working, what changed, and what happened. Links help and speed things up.</p></div>
    <div class="step"><span class="step-num">2</span><h4>Straight to the Desk</h4><p>Your tip lands with our editors the moment you hit submit. No account, no password — just leave an email if you’d like a reply.</p></div>
    <div class="step"><span class="step-num">3</span><h4>We Research &amp; File</h4><p>Editors fact-check and source it. Cases that hold up become a cited, one-page write-up. You can stay anonymous.</p></div>
  </div>
</section>

<section class="form-band">
  <form class="case-form wrap" method="post" action="/api/submit">
    <input type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
    <div class="grp"><label>What wasn’t broken? <span class="hint">the thing that worked fine</span></label>
      <input type="text" name="wasnt" placeholder="e.g. The county’s paper permit process — cleared in about nine days"></div>
    <div class="grp"><label>The "fix" <span class="hint">what changed, and how it was justified</span></label>
      <textarea name="fix" placeholder="e.g. Replaced with a “modern” online portal to “streamline” applications…"></textarea></div>
    <div class="grp"><label>The result <span class="hint">what actually happened</span></label>
      <textarea name="result" placeholder="e.g. Median wait went from 9 days to 7 weeks; the portal times out…"></textarea></div>
    <div class="grp"><label>Sources / links <span class="hint">optional, one per line</span></label>
      <textarea name="sources" placeholder="https://…&#10;https://…"></textarea></div>
    <div class="grp"><label>Your email <span class="hint">so the editors can follow up</span></label>
      <input type="email" name="email" placeholder="you@email.com"></div>
    <div class="verify-note"><b>Why we ask for an email:</b> so our editors can follow up on your tip. We don’t publish it or sell it, and we won’t add you to the newsletter unless you check the box below.</div>
    <label class="check"><input type="checkbox" name="newsletter" value="yes"> Also send me the Weekly Fuxed newsletter.</label>
    <button class="btn btn-red lg block" type="submit">Submit This Case for Review &nbsp;★</button>
    <p class="disclaimer">By submitting you confirm the account is truthful to the best of your knowledge. fuxed.org independently verifies and edits every case; submission is not a guarantee of publication. We decline tips we can’t source.</p>
  </form>
</section>`;
  return layout({ title: 'Submit a Case — FUXED', desc: 'Report something that worked fine until someone fixed it. We research, cite, and file the ones that hold up.', body, active: BASE + '/submit' });
}

/* ------------------------------ styles ----------------------------- */
const CSS = `
:root{
  --red:#B22234; --red-dk:#8d1a28; --navy:#0a1f44; --navy-2:#10295a;
  --flag-blue:#3C3B6E; --gold:#c9a24a; --gold-dk:#a8842f;
  --cream:#fbf8f1; --paper:#fffdf8; --ink:#16181d; --ink-soft:#3a3d46; --muted:#6f7480; --line:#e3ddcd;
  --cond:'Arial Narrow','Helvetica Neue Condensed',Oswald,sans-serif;
  --impact:Impact,'Haettenschweiler','Arial Narrow Bold',sans-serif;
  --serif:Georgia,'Times New Roman',serif;
  --sans:ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
}
*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{margin:0;background:var(--cream);color:var(--ink);font:17px/1.6 var(--serif);}
.wrap{max-width:1120px;margin:0 auto;padding:0 22px;}
a{color:var(--red-dk);}
h1,h2,h3,h4{margin:0;line-height:1.05;}

/* bunting + stripes */
.bunting{height:6px;background:repeating-linear-gradient(90deg,var(--red) 0 28px,#fff 28px 56px,var(--navy) 56px 84px);}
.stripes{height:8px;background:repeating-linear-gradient(180deg,var(--red) 0 4px,#fff 4px 8px);}

/* header */
.site-head{background:var(--paper);border-bottom:3px solid var(--navy);}
.head-grid{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:16px 22px;}
.brand{display:flex;align-items:center;gap:16px;text-decoration:none;}
.seal{width:64px;height:64px;flex:none;filter:drop-shadow(0 1px 1px rgba(0,0,0,.2));}
.brand-text{display:flex;flex-direction:column;}
.brand-name{font:800 40px/0.9 var(--impact);letter-spacing:1px;color:var(--navy);text-transform:uppercase;}
.brand-dot{color:var(--red);font-size:.7em;vertical-align:top;margin-left:2px;}
.brand-tag{font:600 11px/1.2 var(--cond);letter-spacing:.16em;text-transform:uppercase;color:var(--red);margin-top:3px;}
.head-cta{display:flex;flex-direction:column;align-items:flex-end;gap:7px;}
.head-eyebrow{color:var(--gold-dk);letter-spacing:.3em;font-size:13px;}

/* buttons */
.btn{display:inline-block;font:700 14px var(--cond);letter-spacing:.08em;text-transform:uppercase;
  padding:11px 20px;border-radius:3px;text-decoration:none;cursor:pointer;border:2px solid transparent;transition:.12s;}
.btn.lg{font-size:17px;padding:14px 28px;}
.btn.block{display:block;width:100%;text-align:center;}
.btn-gold{background:var(--gold);color:var(--navy);border-color:var(--gold-dk);}
.btn-gold:hover{background:var(--gold-dk);color:#fff;}
.btn-red{background:var(--red);color:#fff;border-color:var(--red-dk);}
.btn-red:hover{background:var(--red-dk);}
.btn-outline{background:transparent;color:#fff;border-color:#fff;}
.btn-outline:hover{background:#fff;color:var(--navy);}

/* nav */
.mainnav{background:var(--navy);}
.navrow{display:flex;flex-wrap:wrap;gap:0;}
.mainnav a{color:#dfe4f0;text-decoration:none;font:700 13px var(--cond);letter-spacing:.14em;text-transform:uppercase;
  padding:13px 20px;border-right:1px solid rgba(255,255,255,.08);}
.mainnav a:first-child{border-left:1px solid rgba(255,255,255,.08);}
.mainnav a:hover{background:var(--navy-2);color:#fff;}
.mainnav a.active{background:var(--red);color:#fff;}
.motto-bar{background:#fff;border-bottom:2px solid var(--navy);}
.motto-inner{text-align:center;padding:9px 22px;font:italic 15px var(--serif);color:var(--navy);letter-spacing:.02em;}
.motto-mark{color:var(--red);font-style:normal;margin:0 7px;}
.era-switch{margin-left:auto;align-self:center;display:inline-flex;border:1px solid rgba(255,255,255,.32);border-radius:999px;overflow:hidden;text-decoration:none;margin-left:auto;}
.era{padding:5px 13px;font:700 12px var(--cond);letter-spacing:.12em;color:#cdd6e8;text-decoration:none;}
.era.on{background:var(--red);color:#fff;}
.era-switch:hover .era:not(.on){color:#fff;}

/* hero */
.hero{background:
   linear-gradient(rgba(10,31,68,.90),rgba(10,31,68,.94)),
   repeating-linear-gradient(180deg,rgba(255,255,255,.05) 0 18px,rgba(178,34,52,.10) 18px 36px),
   var(--navy);
  color:#fff;text-align:center;border-bottom:8px solid var(--gold);}
.hero-inner{padding:64px 22px 70px;}
.hero-eyebrow{display:inline-block;color:var(--gold);letter-spacing:.28em;font:700 13px var(--cond);text-transform:uppercase;margin-bottom:18px;}
.hero-h1{font:800 clamp(40px,8vw,86px)/0.92 var(--impact);letter-spacing:1px;text-transform:uppercase;text-shadow:0 2px 0 rgba(0,0,0,.25);}
.hero-red{color:#ff5d6c;}
.hero-sub{max-width:620px;margin:20px auto 0;font:19px/1.5 var(--serif);color:#cdd6e8;}
.hero-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:30px;}

/* section heads */
.latest{padding:54px 0;}
.section-head{display:flex;align-items:center;gap:18px;margin-bottom:26px;}
.section-title{font:800 clamp(24px,3.5vw,34px) var(--impact);letter-spacing:.5px;text-transform:uppercase;color:var(--navy);}
.section-rule{flex:1;height:4px;background:repeating-linear-gradient(90deg,var(--red) 0 10px,transparent 10px 14px);}

/* cases */
.case{display:block;background:var(--paper);border:1px solid var(--line);border-top:5px solid var(--red);
  border-radius:4px;padding:24px 26px;text-decoration:none;color:inherit;box-shadow:0 2px 0 rgba(10,31,68,.06);transition:.14s;}
.case:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(10,31,68,.13);border-top-color:var(--navy);}
.case-cat{font:700 11px var(--cond);letter-spacing:.16em;text-transform:uppercase;color:var(--red);}
.case-h{font:800 23px/1.12 var(--cond);text-transform:uppercase;letter-spacing:.3px;color:var(--navy);margin:8px 0 10px;}
.case-lead .case-h{font-size:clamp(28px,4vw,42px);}
.case-fix{font:16px/1.5 var(--serif);color:var(--ink-soft);margin:0 0 16px;}
.case-fix b{color:var(--red-dk);}
.case-sev{display:flex;align-items:center;gap:10px;font:13px var(--sans);color:var(--muted);text-transform:uppercase;letter-spacing:.08em;}
.case-go{margin-left:auto;font:700 13px var(--cond);letter-spacing:.1em;color:var(--red-dk);}
.case-lead-wrap{margin-bottom:22px;}
.case-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px;}

/* stars */
.stars i{font-style:normal;color:#cfc6ad;letter-spacing:1px;}
.stars i.on{color:var(--red);}

/* creed */
.creed{background:var(--navy);color:#fff;border-top:6px solid var(--gold);}
.creed-inner{display:grid;grid-template-columns:repeat(3,1fr);gap:0;}
.creed-col{padding:40px 30px;border-left:1px solid rgba(255,255,255,.1);}
.creed-col:first-child{border-left:none;}
.creed-num{font:800 46px var(--impact);color:var(--gold);}
.creed-col h4{font:800 18px var(--cond);letter-spacing:.1em;text-transform:uppercase;margin:6px 0 8px;}
.creed-col p{color:#c2cbe0;font:16px/1.55 var(--serif);margin:0;}

/* article */
.art-wrap{max-width:760px;padding-top:44px;padding-bottom:30px;}
.cat{font:700 12px var(--cond);letter-spacing:.18em;text-transform:uppercase;color:var(--red);}
.art-h1{font:800 clamp(30px,5.2vw,52px)/1.02 var(--impact);text-transform:uppercase;letter-spacing:.5px;color:var(--navy);margin:12px 0 16px;}
.art-deck{font:21px/1.45 var(--serif);color:var(--ink-soft);font-style:italic;margin:0 0 20px;}
.art-meta{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:14px 0;border-top:2px solid var(--navy);border-bottom:2px solid var(--navy);font:14px var(--sans);color:var(--muted);}
.dot-sep{color:var(--line);}
.sev-inline .stars{margin:0 4px;}
.sev-inline b{color:var(--red-dk);}

.dossier{border:3px solid var(--navy);margin:26px 0 32px;background:#fff;}
.dos-row{display:grid;grid-template-columns:160px 1fr;border-bottom:1px solid var(--line);}
.dos-row:last-child{border-bottom:none;}
.dos-row.fix{background:#fff6f2;}
.dos-lab{background:var(--navy);color:#fff;padding:18px 16px;font:800 12px var(--cond);letter-spacing:.1em;text-transform:uppercase;}
.dos-row.fix .dos-lab{background:var(--red);}
.dos-val{padding:18px 20px;font:16px/1.55 var(--serif);}

.stamp{display:inline-block;transform:rotate(-6deg);color:var(--red);border:3px double var(--red);
  padding:3px 9px 2px;border-radius:4px;font:800 13px var(--sans);letter-spacing:.18em;text-transform:uppercase;opacity:.85;margin-left:6px;}

.art-body{font:19px/1.75 var(--serif);color:var(--ink);}
.art-body p{margin:0 0 20px;}
.art-body p:first-of-type::first-letter{float:left;font:800 66px/.74 var(--impact);color:var(--red);padding:8px 10px 0 0;}
.fn a{color:var(--red);text-decoration:none;font:700 12px var(--sans);padding:0 1px;}
.pull{border:none;border-left:6px solid var(--red);margin:30px 0;padding:6px 0 6px 22px;
  font:italic 25px/1.4 var(--serif);color:var(--navy);}
.pull cite{display:block;font:600 14px var(--sans);font-style:normal;color:var(--muted);margin-top:10px;}

.refs{border-top:3px solid var(--navy);margin-top:38px;padding-top:22px;}
.refs-h,.press-h{font:800 16px var(--cond);letter-spacing:.12em;text-transform:uppercase;color:var(--navy);margin-bottom:14px;}
.refs-list{margin:0;padding-left:22px;}
.refs-list li{font:14px/1.6 var(--sans);color:var(--ink-soft);margin-bottom:11px;}
.press{margin-top:34px;}
.press-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.clip{display:flex;flex-direction:column;gap:6px;border:1px solid var(--line);border-top:4px solid var(--navy);
  background:var(--paper);padding:15px 16px;text-decoration:none;color:inherit;transition:.12s;}
.clip:hover{border-top-color:var(--red);transform:translateY(-2px);}
.clip-out{font:700 11px var(--cond);letter-spacing:.12em;text-transform:uppercase;color:var(--red);}
.clip-q{font:italic 15px/1.4 var(--serif);color:var(--ink);}
.clip-go{font:700 12px var(--cond);letter-spacing:.1em;color:var(--muted);}

/* signup band */
.signup-band{background:var(--red);color:#fff;border-top:6px solid var(--navy);border-bottom:6px solid var(--navy);}
.signup-inner{display:flex;align-items:center;justify-content:space-between;gap:30px;flex-wrap:wrap;padding:38px 22px;}
.signup-h{font:800 30px var(--impact);letter-spacing:.5px;text-transform:uppercase;}
.signup-p{max-width:520px;margin:8px 0 0;color:#ffe2e5;font:16px/1.5 var(--serif);}
.signup-form{display:flex;gap:10px;flex-wrap:wrap;}
.signup-form input{padding:14px 16px;border:2px solid var(--navy);border-radius:3px;font:16px var(--serif);min-width:260px;color:var(--ink);}

/* submit page */
.sub-hero{background:var(--navy);color:#fff;text-align:center;padding:54px 22px 46px;border-bottom:8px solid var(--gold);}
.sub-h1{font:800 clamp(32px,6vw,58px) var(--impact);text-transform:uppercase;letter-spacing:.5px;margin:14px 0 14px;}
.sub-deck{max-width:600px;margin:0 auto;font:18px/1.5 var(--serif);color:#cdd6e8;}
.steps{padding:48px 0 10px;}
.steps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;}
.step{padding:22px 26px;border-left:2px solid var(--line);}
.step:first-child{border-left:none;}
.step-num{font:800 40px var(--impact);color:var(--red);}
.step h4{font:800 16px var(--cond);letter-spacing:.1em;text-transform:uppercase;color:var(--navy);margin:8px 0 8px;}
.step p{margin:0;font:15px/1.55 var(--serif);color:var(--ink-soft);}
.form-band{padding:20px 0 60px;}
.case-form{max-width:680px;}
.grp{margin-bottom:20px;}
.case-form label{display:block;font:800 12px var(--cond);letter-spacing:.1em;text-transform:uppercase;color:var(--navy);margin-bottom:7px;}
.hint{font:13px var(--sans);font-weight:400;text-transform:none;letter-spacing:0;color:var(--muted);margin-left:8px;}
.case-form input[type=text],.case-form input[type=email],.case-form textarea{width:100%;padding:12px 13px;border:2px solid var(--navy);border-radius:3px;font:16px/1.5 var(--serif);color:var(--ink);background:#fff;}
.case-form textarea{resize:vertical;min-height:92px;}
.verify-note{background:#fff6f2;border:1px solid var(--line);border-left:4px solid var(--red);padding:15px 18px;margin:6px 0 18px;font:14px/1.55 var(--sans);color:var(--ink-soft);}
.check{display:flex;align-items:center;gap:10px;font:16px var(--serif)!important;text-transform:none!important;letter-spacing:0!important;color:var(--ink)!important;margin-bottom:18px;}
.check input{width:auto;}
.disclaimer{font:13px/1.6 var(--sans);color:var(--muted);border-top:1px solid var(--line);padding-top:14px;margin-top:14px;}

/* footer */
.site-foot{background:var(--navy);color:#cdd6e8;border-top:6px solid var(--red);}
.foot-grid{display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap;padding:36px 22px 18px;}
.foot-name{color:#fff;font-size:30px;}
.foot-mission{margin:8px 0 0;color:#aab4cc;font:16px var(--serif);max-width:380px;}
.foot-nav{display:flex;flex-wrap:wrap;gap:18px;align-items:center;}
.foot-nav a{color:#cdd6e8;text-decoration:none;font:700 12px var(--cond);letter-spacing:.12em;text-transform:uppercase;}
.foot-nav a:hover{color:var(--gold);}
.foot-fine{border-top:1px solid rgba(255,255,255,.12);padding-top:14px;padding-bottom:26px;}
.foot-fine p{font:12px/1.6 var(--sans);color:#8e98b2;margin:0;}

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

/* ----------------------------- 1776 styles ------------------------- */
const CSS_1776 = `
:root{
  --ink:#2a1d10; --ink-soft:#4a3722; --muted:#7a6647; --line:#cbb98e;
  --parch:#e9ddc0; --parch-2:#e2d3af; --paper:#f3ead3;
  --ox:#7b2114; --ox-dk:#5b160d; --sepia:#5e4424; --gold:#9c7b3a;
  --disp:'Hoefler Text','Baskerville','Goudy Old Style','Palatino Linotype',Garamond,Georgia,serif;
  --serif:'Hoefler Text','Baskerville','Palatino Linotype',Garamond,Georgia,serif;
}
*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{margin:0;color:var(--ink);font:18px/1.65 var(--serif);
  background:radial-gradient(at 20% 8%,rgba(120,85,35,.06),transparent 55%),radial-gradient(at 85% 92%,rgba(90,60,25,.07),transparent 50%),var(--parch);}
.wrap{max-width:1120px;margin:0 auto;padding:0 22px;}
a{color:var(--ox);}
h1,h2,h3,h4{margin:0;line-height:1.08;}

.bunting{height:10px;background:var(--parch);border-top:2px solid var(--sepia);border-bottom:1px solid var(--sepia);}
.stripes{height:7px;background:var(--parch);border-bottom:3px double var(--sepia);}

.site-head{background:var(--paper);border-bottom:3px double var(--sepia);}
.head-grid{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:16px 22px;}
.brand{display:flex;align-items:center;gap:16px;text-decoration:none;}
.seal{width:66px;height:66px;flex:none;}
.brand-text{display:flex;flex-direction:column;}
.brand-name{font:700 42px/0.9 var(--disp);letter-spacing:3px;color:var(--ink);text-transform:uppercase;font-variant:small-caps;}
.brand-dot{color:var(--ox);font-size:.55em;vertical-align:top;margin-left:2px;}
.brand-tag{font:italic 13px/1.3 var(--serif);color:var(--ox);margin-top:5px;}
.head-cta{display:flex;flex-direction:column;align-items:flex-end;gap:7px;}
.head-eyebrow{color:var(--sepia);letter-spacing:.3em;font-size:15px;}

.btn{display:inline-block;font:600 15px var(--disp);letter-spacing:.1em;text-transform:uppercase;font-variant:small-caps;
  padding:10px 22px;border-radius:1px;text-decoration:none;cursor:pointer;border:1.5px solid var(--sepia);transition:.12s;}
.btn.lg{font-size:19px;padding:13px 30px;}
.btn.block{display:block;width:100%;text-align:center;}
.btn-gold{background:var(--parch);color:var(--ink);border-color:var(--sepia);}
.btn-gold:hover{background:var(--sepia);color:var(--paper);}
.btn-red{background:var(--ox);color:var(--paper);border-color:var(--ox-dk);}
.btn-red:hover{background:var(--ox-dk);}
.btn-outline{background:transparent;color:var(--ink);border-color:var(--sepia);}
.btn-outline:hover{background:var(--sepia);color:var(--paper);}

.mainnav{background:var(--sepia);}
.navrow{display:flex;flex-wrap:wrap;}
.mainnav a{color:#efe6cd;text-decoration:none;font:600 15px var(--disp);letter-spacing:.14em;text-transform:uppercase;font-variant:small-caps;
  padding:11px 22px;border-right:1px solid rgba(255,255,255,.12);}
.mainnav a:first-child{border-left:1px solid rgba(255,255,255,.12);}
.mainnav a:hover{background:var(--ink);color:#fff;}
.mainnav a.active{background:var(--ox);color:#fff;}
.motto-bar{background:var(--paper);border-bottom:1px solid var(--sepia);}
.motto-inner{text-align:center;padding:9px 22px;font:italic 16px var(--serif);color:var(--sepia);}
.motto-mark{color:var(--ox);font-style:normal;margin:0 8px;}
.era-switch{margin-left:auto;align-self:center;display:inline-flex;border:1px solid rgba(255,255,255,.32);border-radius:999px;overflow:hidden;text-decoration:none;}
.era{padding:5px 14px;font:600 13px var(--disp);letter-spacing:.08em;font-variant:small-caps;color:#efe6cd;text-decoration:none;}
.era.on{background:var(--ox);color:#fff;}
.era-switch:hover .era:not(.on){color:#fff;}

.hero{background:radial-gradient(at 50% 0%,rgba(90,60,25,.12),transparent 62%),var(--parch-2);color:var(--ink);text-align:center;border-bottom:4px double var(--sepia);}
.hero-inner{padding:58px 22px 62px;}
.hero-eyebrow{display:inline-block;color:var(--ox);letter-spacing:.24em;font:600 15px var(--disp);text-transform:uppercase;font-variant:small-caps;margin-bottom:16px;}
.hero-h1{font:700 clamp(38px,7.5vw,76px)/1.0 var(--disp);letter-spacing:1px;text-transform:uppercase;color:var(--ink);}
.hero-red{color:var(--ox);display:block;margin-top:4px;}
.hero-sub{max-width:660px;margin:20px auto 0;font:italic 20px/1.5 var(--serif);color:var(--ink-soft);}
.hero-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:28px;}

.latest{padding:52px 0;}
.section-head{display:flex;align-items:center;gap:18px;margin-bottom:26px;}
.section-title{font:700 clamp(24px,3.5vw,34px) var(--disp);letter-spacing:1px;text-transform:uppercase;font-variant:small-caps;color:var(--ink);}
.section-rule{flex:1;height:0;border-top:3px double var(--sepia);}

.case{display:block;background:var(--paper);border:1px solid var(--sepia);border-top:3px double var(--sepia);border-radius:1px;
  padding:24px 26px;text-decoration:none;color:inherit;transition:.14s;box-shadow:2px 3px 0 rgba(90,60,25,.10);}
.case:hover{transform:translateY(-2px);box-shadow:3px 6px 0 rgba(90,60,25,.16);border-color:var(--ox);}
.case-cat{font:italic 14px var(--serif);color:var(--ox);}
.case-h{font:700 25px/1.14 var(--disp);text-transform:uppercase;font-variant:small-caps;letter-spacing:.5px;color:var(--ink);margin:8px 0 10px;}
.case-lead .case-h{font-size:clamp(28px,4vw,42px);}
.case-fix{font:17px/1.55 var(--serif);color:var(--ink-soft);margin:0 0 16px;}
.case-fix b{color:var(--ox);}
.case-sev{display:flex;align-items:center;gap:10px;font:italic 15px var(--serif);color:var(--muted);}
.case-go{margin-left:auto;font:600 15px var(--disp);letter-spacing:.05em;font-variant:small-caps;color:var(--ox);}
.case-lead-wrap{margin-bottom:22px;}
.case-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px;}

.stars i{font-style:normal;color:#c3b48c;letter-spacing:1px;}
.stars i.on{color:var(--ox);}

.creed{background:var(--sepia);color:var(--paper);border-top:4px double var(--ink);border-bottom:4px double var(--ink);}
.creed-inner{display:grid;grid-template-columns:repeat(3,1fr);}
.creed-col{padding:38px 30px;border-left:1px solid rgba(255,255,255,.14);}
.creed-col:first-child{border-left:none;}
.creed-num{font:700 46px var(--disp);color:#e7d8b4;}
.creed-col h4{font:700 20px var(--disp);letter-spacing:.05em;text-transform:uppercase;font-variant:small-caps;margin:6px 0 8px;}
.creed-col p{color:#e6d9ba;font:17px/1.55 var(--serif);margin:0;}

.art-wrap{max-width:760px;padding-top:44px;padding-bottom:30px;}
.cat{font:italic 15px var(--serif);color:var(--ox);}
.art-h1{font:700 clamp(30px,5.2vw,52px)/1.04 var(--disp);text-transform:uppercase;font-variant:small-caps;letter-spacing:1px;color:var(--ink);margin:12px 0 16px;}
.art-deck{font:italic 21px/1.45 var(--serif);color:var(--ink-soft);margin:0 0 20px;}
.art-meta{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:14px 0;border-top:1px solid var(--sepia);border-bottom:3px double var(--sepia);font:italic 15px var(--serif);color:var(--muted);}
.dot-sep{color:var(--line);}
.sev-inline b{color:var(--ox);}

.dossier{border:2px solid var(--sepia);margin:26px 0 32px;background:var(--paper);box-shadow:2px 3px 0 rgba(90,60,25,.10);}
.dos-row{display:grid;grid-template-columns:170px 1fr;border-bottom:1px solid var(--line);}
.dos-row:last-child{border-bottom:none;}
.dos-row.fix{background:#efe2c4;}
.dos-lab{background:var(--sepia);color:var(--paper);padding:18px 16px;font:600 14px var(--disp);letter-spacing:.06em;text-transform:uppercase;font-variant:small-caps;}
.dos-row.fix .dos-lab{background:var(--ox);}
.dos-val{padding:18px 20px;font:17px/1.55 var(--serif);}
.stamp{display:inline-block;transform:rotate(-6deg);color:var(--ox);border:3px double var(--ox);padding:3px 9px 2px;border-radius:2px;
  font:700 14px var(--disp);letter-spacing:.12em;text-transform:uppercase;font-variant:small-caps;opacity:.85;margin-left:6px;}

.art-body{font:19px/1.78 var(--serif);color:var(--ink);}
.art-body p{margin:0 0 20px;}
.art-body p:first-of-type::first-letter{float:left;font:700 72px/.7 var(--disp);color:var(--ox);padding:8px 12px 0 0;}
.fn a{color:var(--ox);text-decoration:none;font:600 13px var(--serif);vertical-align:super;font-size:.66em;}
.pull{border-left:4px solid var(--ox);border-top:1px solid var(--sepia);border-bottom:1px solid var(--sepia);margin:30px 0;padding:16px 0 16px 22px;
  font:italic 25px/1.42 var(--serif);color:var(--ink);}
.pull cite{display:block;font:italic 15px var(--serif);color:var(--muted);margin-top:10px;}

.refs{border-top:3px double var(--sepia);margin-top:38px;padding-top:22px;}
.refs-h,.press-h{font:700 18px var(--disp);letter-spacing:.05em;text-transform:uppercase;font-variant:small-caps;color:var(--ink);margin-bottom:14px;}
.refs-list{margin:0;padding-left:22px;}
.refs-list li{font:15px/1.6 var(--serif);color:var(--ink-soft);margin-bottom:11px;}
.press{margin-top:34px;}
.press-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.clip{display:flex;flex-direction:column;gap:6px;border:1px solid var(--sepia);border-top:3px double var(--sepia);background:var(--paper);padding:15px 16px;text-decoration:none;color:inherit;transition:.12s;}
.clip:hover{border-top-color:var(--ox);transform:translateY(-2px);}
.clip-out{font:600 14px var(--disp);letter-spacing:.05em;text-transform:uppercase;font-variant:small-caps;color:var(--ox);}
.clip-q{font:italic 16px/1.4 var(--serif);color:var(--ink);}
.clip-go{font:600 14px var(--disp);letter-spacing:.05em;font-variant:small-caps;color:var(--muted);}

.signup-band{background:var(--ox);color:var(--paper);border-top:4px double var(--ink);border-bottom:4px double var(--ink);}
.signup-inner{display:flex;align-items:center;justify-content:space-between;gap:30px;flex-wrap:wrap;padding:38px 22px;}
.signup-h{font:700 30px var(--disp);letter-spacing:.6px;text-transform:uppercase;font-variant:small-caps;}
.signup-p{max-width:540px;margin:8px 0 0;color:#f4e4d8;font:italic 17px/1.5 var(--serif);}
.signup-form{display:flex;gap:10px;flex-wrap:wrap;}
.signup-form input{padding:14px 16px;border:1.5px solid var(--ink);border-radius:1px;font:16px var(--serif);min-width:260px;color:var(--ink);background:var(--paper);}

.sub-hero{background:var(--sepia);color:var(--paper);text-align:center;padding:54px 22px 46px;border-bottom:4px double var(--ink);}
.sub-h1{font:700 clamp(32px,6vw,58px) var(--disp);text-transform:uppercase;font-variant:small-caps;letter-spacing:1px;margin:14px 0 14px;}
.sub-deck{max-width:640px;margin:0 auto;font:italic 19px/1.5 var(--serif);color:#e7d8b4;}
.steps{padding:48px 0 10px;}
.steps-grid{display:grid;grid-template-columns:repeat(3,1fr);}
.step{padding:22px 26px;border-left:1px solid var(--line);}
.step:first-child{border-left:none;}
.step-num{font:700 42px var(--disp);color:var(--ox);}
.step h4{font:700 18px var(--disp);letter-spacing:.05em;text-transform:uppercase;font-variant:small-caps;color:var(--ink);margin:8px 0 8px;}
.step p{margin:0;font:16px/1.55 var(--serif);color:var(--ink-soft);}
.form-band{padding:20px 0 60px;}
.case-form{max-width:680px;}
.grp{margin-bottom:20px;}
.case-form label{display:block;font:700 14px var(--disp);letter-spacing:.05em;text-transform:uppercase;font-variant:small-caps;color:var(--ink);margin-bottom:7px;}
.hint{font:italic 14px var(--serif);font-weight:400;text-transform:none;letter-spacing:0;color:var(--muted);margin-left:8px;}
.case-form input[type=text],.case-form input[type=email],.case-form textarea{width:100%;padding:12px 13px;border:1.5px solid var(--sepia);border-radius:1px;font:16px/1.5 var(--serif);color:var(--ink);background:var(--paper);}
.case-form textarea{resize:vertical;min-height:92px;}
.verify-note{background:#efe2c4;border:1px solid var(--line);border-left:4px solid var(--ox);padding:15px 18px;margin:6px 0 18px;font:15px/1.55 var(--serif);color:var(--ink-soft);}
.check{display:flex;align-items:center;gap:10px;font:16px var(--serif)!important;text-transform:none!important;letter-spacing:0!important;color:var(--ink)!important;margin-bottom:18px;}
.check input{width:auto;}
.disclaimer{font:italic 14px/1.6 var(--serif);color:var(--muted);border-top:1px solid var(--line);padding-top:14px;margin-top:14px;}

.site-foot{background:var(--ink);color:#e3d6b6;border-top:4px double var(--ox);}
.foot-grid{display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap;padding:36px 22px 18px;}
.foot-name{color:var(--paper);font-size:30px;}
.foot-mission{margin:8px 0 0;color:#c9bb98;font:italic 17px var(--serif);max-width:400px;}
.foot-nav{display:flex;flex-wrap:wrap;gap:18px;align-items:center;}
.foot-nav a{color:#e3d6b6;text-decoration:none;font:600 14px var(--disp);letter-spacing:.05em;text-transform:uppercase;font-variant:small-caps;}
.foot-nav a:hover{color:#fff;}
.foot-fine{border-top:1px solid rgba(255,255,255,.14);padding-top:14px;padding-bottom:26px;}
.foot-fine p{font:14px/1.6 var(--serif);color:#a89a78;margin:0;}

@media(max-width:820px){
  .case-grid,.press-grid,.creed-inner,.steps-grid{grid-template-columns:1fr;}
  .creed-col,.step{border-left:none;border-top:1px solid rgba(255,255,255,.14);}
  .step{border-top:1px solid var(--line);}
  .dos-row{grid-template-columns:1fr;}
  .dos-lab{padding:12px 16px;}
  .head-cta{display:none;}
  .signup-inner{flex-direction:column;align-items:flex-start;}
  .signup-form input{min-width:0;flex:1;}
}
`;

/* ------------------------------ write ------------------------------ */
// Clear stale pages so a replaced edition leaves no orphan article routes.
for (const f of fs.readdirSync(OUT)) if (f.endsWith('.html')) fs.unlinkSync(path.join(OUT, f));
fs.writeFileSync(path.join(OUT, 'styles.css'), require('./theme-css').css(THEME).trim() + '\n');
fs.writeFileSync(path.join(OUT, 'index.html'), homePage());
fs.writeFileSync(path.join(OUT, 'submit.html'), submitPage());
articles.forEach(a => fs.writeFileSync(path.join(OUT, a.slug + '.html'), articlePage(a)));
console.log('Built:', ['styles.css','index.html','submit.html', ...articles.map(a=>a.slug+'.html')].join(', '));
