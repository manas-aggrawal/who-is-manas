// Warm paper + clay theme: muted light palette, hairline borders, no cartoon pass.
// Experimental — compare against StylesClassic via ?theme=classic.
import React from 'react';

const StylesWarm = () => (
  <style>{`
    .app {
      /* Warm paper + clay. Light but never stark; one muted accent, no outlines.
         --on-accent is the foreground for anything filled with --accent. */
      --ink: #191512; --ink-2: #544c42; --ink-3: #756c60;
      --bg: #faf7f2; --bg-elev: #ffffff; --bg-elev-2: #f1ebe1;
      --line: #ddd2c2; --line-strong: #bfb09a;
      --clay: #a8482a; --clay-2: #bd5733;
      --accent: var(--clay); --accent-2: var(--clay-2);
      --accent-soft: rgba(168, 72, 42, 0.09); --accent-line: rgba(168, 72, 42, 0.38);
      --on-accent: #fff9f4;
      background: var(--bg); color: var(--ink);
      position: relative; overflow-x: hidden;
    }
    .wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
    b { color: var(--ink); font-weight: 600; }
    .dim { color: var(--ink-3); }
    .mono-sm { font-family: var(--font-mono); font-size: 12.5px; line-height: 1.6; color: var(--ink-2); }
    .mono-label { font-family: var(--font-mono); font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--ink-3); display: block; margin-bottom: 6px; }
    .mono-label.orange { color: var(--accent); }

    .kicker { font-family: var(--font-mono); font-size: 13px; letter-spacing: .18em; text-transform: uppercase; color: var(--accent); display: inline-flex; align-items: center; }

    /* NAV */
    .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 60; background: transparent; padding: 15px 0; }
    .nav-inner { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px; }
    .brand { font-family: var(--font-display); font-weight: 700; font-size: 20px; letter-spacing: -.02em; color: var(--ink); background: none; border: none; cursor: pointer; padding: 0; justify-self: start; }
    .brand-dot { color: var(--orange); }
    .nav .brand { color: var(--orange); }
    .nav .brand-dot { color: var(--orange); }
    /* Floating rounded capsule holding the nav links */
    .nav-links { display: none; gap: 20px; padding: 11px 22px; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid transparent; border-radius: 999px; transition: background .35s, border-color .35s, box-shadow .35s; }
    /* Over dark sections → white capsule with dark links */
    .nav-links.cap-light { background: rgba(244,239,230,.92); border-color: rgba(20,15,10,.16); box-shadow: 0 6px 22px rgba(0,0,0,.2); }
    .nav-links.cap-light .navlink { color: var(--ink-2); }
    .nav-links.cap-light .navlink:hover { color: var(--orange); }
    /* Over light sections → dark capsule with light links */
    .nav-links.cap-dark { background: rgba(20,20,23,.72); border-color: rgba(245,241,234,.14); box-shadow: 0 6px 22px rgba(0,0,0,.3); }
    .nav-links.cap-dark .navlink { color: var(--ink-2); }
    .nav-links.cap-dark .navlink:hover { color: var(--orange); }
    .nav-links.cap-light .navlink.active, .nav-links.cap-dark .navlink.active { color: var(--orange); }
    .navlink { font-family: var(--font-mono); font-size: 13px; color: var(--ink-2); background: none; border: none; cursor: pointer; padding: 4px 0; position: relative; transition: color .2s; }
    .navlink:hover { color: var(--ink); }
    .navlink.active { color: var(--accent); }
    .navlink.active::after { content: ''; position: absolute; left: 0; bottom: -3px; width: 100%; height: 2px; background: var(--accent); }
    .nav-right { display: flex; align-items: center; gap: 14px; justify-self: end; }
    .menu-btn { display: inline-flex; background: none; border: none; color: var(--orange); cursor: pointer; padding: 4px; }
    .mobile-menu { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; padding: 16px 24px 22px; background: rgba(10,9,8,.96); backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
    .mobile-link { text-align: left; font-family: var(--font-mono); font-size: 14px; color: var(--ink-2); background: none; border: none; padding: 10px 6px; cursor: pointer; border-radius: 8px; }
    .mobile-link.active, .mobile-link:hover { color: var(--accent); background: var(--accent-soft); }

    /* BUTTONS */
    .magnetic { display: inline-flex; transition: transform .25s cubic-bezier(.2,.65,.3,1); }
    .btn { display: inline-flex; align-items: center; gap: 9px; background: var(--accent); color: var(--on-accent); font-family: var(--font-sans); font-weight: 600; font-size: 15px; padding: 14px 22px; border-radius: 999px; border: none; cursor: pointer; transition: background .2s, box-shadow .2s; text-decoration: none; }
    .btn:hover { background: var(--accent-2); }
    .btn-sm { padding: 9px 16px; font-size: 13.5px; }
    .btn-outline { display: inline-flex; align-items: center; gap: 9px; background: transparent; color: var(--ink); font-family: var(--font-sans); font-weight: 500; font-size: 15px; padding: 13px 22px; border-radius: 999px; border: 1px solid var(--line-strong); cursor: pointer; transition: border-color .2s, color .2s; text-decoration: none; }
    .btn-outline:hover { border-color: var(--accent); color: var(--accent); }
    .btn-outline.sm { padding: 9px 16px; font-size: 13px; }

    /* HERO */
    .hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; padding: 96px 0 48px; }
    /* Hero uses the same 1180px container as the nav and every other pane. */
    .hero .wrap { width: 100%; }
    .hero-inner { position: relative; z-index: 2; }
    .hero-title { font-family: var(--font-display); font-weight: 700; text-transform: uppercase; line-height: .9; letter-spacing: -.03em; margin: 14px 0 0; display: flex; flex-direction: column; }
    .hero-title span { font-size: clamp(2.2rem, 5.5vw, 3.4rem); display: block; }
    .hero-title .line-2 { color: var(--ink); }
    .hero-title .ast { color: var(--accent); font-size: .5em; vertical-align: super; }
    .hero-sub { max-width: 600px; font-size: clamp(14.5px, 1.8vw, 18px); color: var(--ink-2); margin: 16px 0 0; line-height: 1.55;  font-style: italic; }
    .hero-cta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 20px; }
    .hero-stamp { position: absolute; right: 6%; top: 24%; z-index: 2; }
    .orbit { position: absolute; border-radius: 50%; border: 1px solid var(--line); pointer-events: none; z-index: 1; }
    .orbit-1 { width: 620px; height: 620px; right: -160px; top: -120px; transform: translateY(calc(var(--sy, 0) * 0.06px)); }
    .orbit-2 { width: 320px; height: 320px; right: 60px; top: 40px; border-color: var(--accent-line); transform: translateY(calc(var(--sy, 0) * -0.05px)); }
    .orbit-3 { width: 900px; height: 900px; left: -380px; bottom: -420px; border-style: dashed; border-color: var(--line); }
    .spin-slow { animation: spin 60s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* MARQUEE */
    .marquee { background: var(--orange); overflow: hidden; padding: 15px 0; }
    .marquee-track { display: inline-flex; white-space: nowrap; animation: marquee 32s linear infinite; }
    .marquee-copy { display: inline-flex; }
    .marquee-item { font-family: var(--font-display); font-weight: 600; font-size: 20px; text-transform: uppercase; color: var(--on-accent); padding: 0 22px; display: inline-flex; align-items: center; gap: 22px; letter-spacing: .01em; }
    .marquee-star { opacity: .55; }
    @keyframes marquee { to { transform: translateX(-50%); } }

    /* SECTIONS */
    .section { padding: 104px 0; scroll-margin-top: 80px; position: relative; }
    .section + .section, .marquee + .section { border-top: 1px solid var(--line); }
    .sec-head { margin-bottom: 28px; }
    .sec-title { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.7rem, 3.4vw, 2.3rem); line-height: 1.05; letter-spacing: -.02em; margin: 14px 0 0; color: var(--ink); }
    .sec-title .ast { color: var(--accent); }

    /* ABOUT */
    .about-grid { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: start; }
    .about-photo { position: relative; max-width: 300px; }
    .photo-frame { position: relative; border-radius: 20px; overflow: hidden; border: 1px solid var(--line); aspect-ratio: 1; }
    .photo-frame img { width: 100%; height: 100%; object-fit: cover; display: block; filter: grayscale(.15) contrast(1.03); }
    .corner { position: absolute; width: 28px; height: 28px; border: 2px solid var(--accent); }
    .corner-tl { top: 12px; left: 12px; border-right: none; border-bottom: none; }
    .corner-br { bottom: 12px; right: 12px; border-left: none; border-top: none; }
    .lead { font-size: clamp(16px, 1.5vw, 18px); line-height: 1.6; color: var(--ink-2); }
    .about-list { list-style: none; padding: 0; margin: 28px 0 0; display: flex; flex-direction: column; gap: 16px; }
    .about-list li, .hl-list li { display: flex; gap: 12px; color: var(--ink-2); font-size: 15px; line-height: 1.55; }
    .li-mark { color: var(--accent); font-family: var(--font-mono); flex-shrink: 0; }
    .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 26px; padding-top: 22px; border-top: 1px solid var(--line); }
    .stat { text-align: center; }
    .stat-num { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.7rem, 3vw, 2.1rem); line-height: 1; color: var(--ink); }
    .stat-num .u { color: var(--accent); }
    .stat-label { font-family: var(--font-mono); font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); margin-top: 12px; }

    /* EXPERIENCE */
    .exp-list { display: flex; flex-direction: column; }
    .exp-row { display: grid; grid-template-columns: 60px 1fr; gap: 20px; padding: 24px 0; border-top: 1px solid var(--line); transition: opacity .2s; }
    .exp-row:last-child { border-bottom: 1px solid var(--line); }
    .exp-index { font-family: var(--font-mono); font-size: 13px; color: var(--ink-3); padding-top: 6px; }
    .exp-top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; }
    .exp-title { font-family: var(--font-display); font-weight: 600; font-size: clamp(1.15rem, 1.8vw, 1.4rem); color: var(--ink); transition: color .2s; letter-spacing: -.01em; }
    .exp-company { color: var(--accent); font-size: 15px; margin-top: 2px; }
    .exp-meta { font-family: var(--font-mono); font-size: 12.5px; color: var(--ink-2); text-align: right; display: flex; flex-direction: column;  white-space: nowrap; }
    .tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }
    .tag { font-family: var(--font-mono); font-size: 12px; padding: 4px 11px; border: 1px solid var(--line); border-radius: 999px; color: var(--ink-2); white-space: nowrap; }
    .tag-lg { font-size: 12.5px; padding: 6px 13px; transition: border-color .2s, color .2s; }
    .tag-lg:hover { border-color: var(--accent); color: var(--ink); }
    .hl-list { list-style: none; padding: 0; margin: 0 0 16px; display: flex; flex-direction: column; gap: 10px; }
    .hl-list li { font-size: 14px; }
    .exp-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; }

    /* HYDROW FLAGSHIP EXPERIENCE BLOCK */
    .exp-flagship { cursor: default; }
    .exp-flagship:hover .exp-title { color: var(--ink); }
    .exp-flagship-lead { color: var(--ink-2); font-size: 15px; font-style: italic; line-height: 1.6; margin: 14px 0 18px; max-width: 720px; }
    .exp-flagship .tags { margin: 16px 0 22px; }
    .exp-contrib { display: block; border: 1px solid var(--line); border-radius: 14px; overflow: hidden; cursor: pointer; transition: border-color .2s; background: var(--bg-elev); }
    .exp-contrib:hover { border-color: var(--accent-line); }
    .exp-contrib img { width: 100%; height: auto; display: block; }
    .link-orange { display: inline-flex; align-items: center; gap: 7px; color: var(--accent); font-weight: 500; font-size: 14px; background: none; border: none; cursor: pointer; padding: 0; transition: gap .2s; }
    .link-orange:hover { gap: 11px; }
    .link-orange-static { color: var(--accent); font-family: var(--font-mono); font-size: 13px; }

    /* LINKEDIN RECOMMENDATIONS (inline, per role) */
    .rec-list { margin-top: 26px; display: flex; flex-direction: column; gap: 14px; }
    .rec-head { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); }
    .rec { margin: 0; padding: 18px 20px; background: var(--bg-elev-2); border-left: 2px solid var(--accent-line); border-radius: 0 12px 12px 0; }
    .rec-quote { margin: 0; font-size: 14px; line-height: 1.65; color: var(--ink-2); font-style: italic; white-space: pre-line; }
    .rec-quote::before { content: '“'; }
    .rec-quote::after { content: '”'; }
    .rec-by { margin-top: 12px; display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px; }
    .rec-name { font-family: var(--font-display); font-weight: 600; font-size: 14px; color: var(--ink); }
    .rec-role { font-size: 13px; color: var(--ink-2); }
    .rec-rel { font-family: var(--font-mono); font-size: 11.5px; color: var(--ink-3); }
    .rec-link { display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px; color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; transition: color .2s; }
    .rec-more { margin-top: 10px; padding: 0; background: none; border: none; cursor: pointer; font-family: var(--font-mono); font-size: 11.5px; letter-spacing: .06em; text-transform: uppercase; color: var(--accent); border-bottom: 1px solid var(--accent-line); transition: border-color .2s; }
    .rec-more:hover { border-bottom-color: var(--accent); }
    .rec-expand { align-self: flex-start; margin-top: 2px; padding: 8px 16px; background: none; border: 1.5px dashed var(--accent-line); border-radius: 999px; cursor: pointer; font-family: var(--font-mono); font-size: 11.5px; letter-spacing: .06em; text-transform: uppercase; color: var(--accent); transition: border-color .2s, background .2s; }
    .rec-expand:hover { border-color: var(--accent); background: var(--accent-soft); }
    .rec-link:hover { color: var(--accent-2); }

    /* CARDS / GRIDS */
    .grid-2 { display: grid; grid-template-columns: 1fr; gap: 16px; }
    .grid-3 { display: grid; grid-template-columns: 1fr; gap: 16px; }
    .stack-list { display: flex; flex-direction: column; gap: 20px; }
    .card { background: var(--bg-elev); border: 1px solid var(--line); border-radius: 20px; padding: 22px; transition: border-color .25s, transform .25s, background .25s; position: relative; overflow: hidden; text-decoration: none; display: block; cursor: pointer; }
    .card:hover { border-color: var(--accent-line); transform: translateY(-3px); background: var(--bg-elev-2); }
    .card::after { content: ''; position: absolute; inset: 0; border-radius: 20px; box-shadow: inset 0 0 0 1px transparent; transition: box-shadow .25s; pointer-events: none; }
    .card:hover::after { box-shadow: inset 0 60px 90px -60px rgba(168,72,42,.10); }
    .card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
    .card-idx { font-family: var(--font-mono); font-size: 12px; color: var(--ink-3); }
    .arr { color: var(--ink-3); transition: color .2s, transform .2s; }
    .card:hover .arr { color: var(--accent); transform: translate(2px,-2px) rotate(0); }
    .card-title { font-family: var(--font-display); font-weight: 600; font-size: 1.2rem; color: var(--ink); letter-spacing: -.01em; }
    .card-title.sm { font-size: 1.05rem; }
    .card-desc { color: var(--ink-2); font-size: 14.5px; line-height: 1.6; margin-top: 12px; }
    .os-card .card-desc, .art-card .card-desc { margin-bottom: 22px; }
    .os-stats { display: flex; gap: 40px; padding-top: 20px; border-top: 1px solid var(--line); margin-top: auto; }
    .os-num { font-family: var(--font-display); font-weight: 700; font-size: 1.9rem; color: var(--ink); display: block; }
    .os-num .u { color: var(--accent); }
    .os-lbl { font-family: var(--font-mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-3); }
    .os-card, .art-card, .proj-card { display: flex; flex-direction: column; }
    .pill { font-family: var(--font-mono); font-size: 11.5px; padding: 5px 12px; border-radius: 999px; background: var(--accent-soft); border: 1px solid var(--accent-line); color: var(--accent); white-space: nowrap; }
    .res-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; margin-bottom: 10px; }
    .mb { margin-bottom: 14px; }
    .res-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--line); }
    .edu-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 10px; }
    .edu-detail { display: flex; flex-direction: column; gap: 12px; margin-top: 12px; }
    .mt { margin-top: 12px; }

    /* SKILLS */
    .skills-grid { display: flex; flex-direction: column; gap: 14px; }
    .skill-block { display: grid; grid-template-columns: 1fr; gap: 10px; padding-bottom: 14px; border-bottom: 1px solid var(--line); }
    .skill-block:last-child { border-bottom: none; padding-bottom: 0; }

    /* CONTACT */
    .soc { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 13px; color: var(--ink-2); border: 1px solid var(--line); border-radius: 999px; padding: 9px 16px; text-decoration: none; transition: border-color .2s, color .2s; }
    .soc:hover { border-color: var(--accent); color: var(--accent); }

    /* FOOTER */
    .footer { border-top: 1px solid var(--line); padding: 40px 0; }
    .footer-inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; }

    /* STAMP */
    .stamp { position: relative; display: inline-flex; align-items: center; justify-content: center; }
    .stamp-rotate { animation: spin 20s linear infinite; transform-origin: 100px 100px; }
    .stamp text { font-family: var(--font-mono); font-weight: 500; font-size: 14px; letter-spacing: 2px; fill: var(--accent); text-transform: uppercase; }
    .stamp-core { fill: none; stroke: var(--accent-line); stroke-width: 1.5; }
    .stamp-icon { position: absolute; color: var(--accent); }
    .stamp-parallax { transform: translateY(calc(var(--sy, 0) * 0.11px)); will-change: transform; }

    /* MODALS */
    .modal-bg { position: fixed; inset: 0; background: rgba(42,37,32,.55); backdrop-filter: blur(4px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .modal { background: var(--bg-elev); border: 1px solid var(--line-strong); border-radius: 22px; max-width: 640px; width: 100%; max-height: 88vh; overflow-y: auto; padding: 34px; position: relative; }
    .modal-wide { max-width: 820px; }
    .modal-close { position: absolute; top: 18px; right: 18px; background: none; border: none; color: var(--ink-3); cursor: pointer; }
    .modal-close:hover { color: var(--ink); }
    .modal-title { font-family: var(--font-display); font-weight: 700; font-size: 1.7rem; color: var(--ink); letter-spacing: -.01em; padding-right: 30px; }
    .modal-sub { margin: 6px 0 20px; }
    .modal-desc { font-size: 15px; margin-bottom: 24px; }
    .modal-hl { margin-top: 12px; }
    .transcript-frame { border: 1px solid var(--line); border-radius: 12px; overflow: hidden; margin: 20px 0 0; }
    .transcript-frame iframe { width: 100%; aspect-ratio: 8.5/11; background: var(--bg-elev-2); border: none; display: block; }

    /* MOTION */
    .rise { opacity: 0; transform: translateY(26px); animation: rise .9s cubic-bezier(.2,.65,.3,1) forwards; }
    @keyframes rise { to { opacity: 1; transform: none; } }
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity .75s ease, transform .75s cubic-bezier(.2,.65,.3,1); }
    .reveal-in { opacity: 1; transform: none; }

    /* LIGHT SECTIONS — cream background, green accent */
    /* Every pane is white now; .light no longer inverts the palette. */
    .light { background: var(--bg); color: var(--ink); }

    /* AVAILABILITY PILL */
    .avail { display: flex; width: fit-content; align-items: center; gap: 9px; margin-top: 18px; font-family: var(--font-mono); font-size: 12.5px; letter-spacing: .04em; text-transform: uppercase; color: var(--green-bright); background: var(--green-soft); border: 1px solid var(--green-line); border-radius: 999px; padding: 8px 15px; }
    .avail-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green-bright); box-shadow: 0 0 0 0 rgba(62, 224, 160, .55); animation: pulse 2.4s infinite; }
    @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(62,224,160,.5); } 70% { box-shadow: 0 0 0 7px rgba(62,224,160,0); } 100% { box-shadow: 0 0 0 0 rgba(62,224,160,0); } }

    /* FLOATING BADGE */
    .float-badge { position: fixed; bottom: 22px; right: 22px; z-index: 55; width: 104px; height: 104px; display: inline-flex; align-items: center; justify-content: center; background: transparent; border: none; border-radius: 50%; cursor: pointer; padding: 0; animation: fadepop .4s ease both; }
    .float-badge .stamp text { fill: var(--orange); font-size: 16.5px; letter-spacing: 1.5px; }
    .float-badge .stamp-core { stroke: var(--orange-line); }
    .float-badge .stamp-icon { color: var(--orange); }
    .float-badge:hover .stamp-icon { color: var(--orange-2); }
    @keyframes fadepop { from { opacity: 0; transform: scale(.7); } to { opacity: 1; transform: scale(1); } }

    /* ============================ SINGLE-WINDOW APP SHELL ============================ */
    html, body, #root { height: 100%; overflow: hidden; }
    .app { height: 100vh; overflow: hidden; }

    /* Nav is always solid now (no scroll to react to) */
    .nav-solid { background: rgba(10, 9, 8, .72); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }

    /* The fixed stage holds one section at a time, below the nav */
    .stage { position: fixed; top: 66px; left: 0; right: 0; bottom: 0; overflow: hidden; background: var(--bg); }
    .pane { display: none; height: 100%; overflow-y: auto; overflow-x: hidden; }
    .pane.is-active { display: block; animation: paneIn .38s cubic-bezier(.2,.65,.3,1) both; }
    @keyframes paneIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }

    /* Sections fill the frame; the section itself is the scroll container.
       Centering lives on the inner .wrap so tall content stays scrollable from the top. */
    .stage .section { padding: 30px 0 34px; border-top: none; scroll-margin-top: 0; }
    .section.pane.is-active > .wrap { display: flex; flex-direction: column; justify-content: center; min-height: 100%; }
    .stage .hero.pane { min-height: 0; height: 100%; padding: 26px 0 30px; }
    .hero.pane.is-active { display: block; }
    .hero.pane.is-active > .hero-inner { min-height: 100%; display: flex; flex-direction: column; justify-content: center; }

    /* Combined home: intro + photo on top, about below */
    .home-top { display: grid; grid-template-columns: 1fr; gap: 30px; align-items: start; }
    .home-intro { position: relative; z-index: 2; }
    .home-intro .lead { margin-top: 18px; max-width: 600px; }
    .home-top .about-photo { max-width: 300px; }
    .home-about { margin-top: 10px; max-width: none; }
    /* Metrics anchor to the bottom of the home pane; the auto margin absorbs
       the slack so the row sits at the end without introducing scroll. */
    .hero.pane.is-active .home-about { margin-top: auto; padding-top: 24px; }
    .home-about .about-list { margin-top: 16px; }
    .home-about .stats { margin-top: 0; }

    /* No scroll observers anymore — content is shown; motion comes from the pane fade-in */
    .reveal { opacity: 1; transform: none; transition: none; }

    /* ============================ LIGHT THEME + PAINT SPLASHES ============================ */
    .hero-inner { position: relative; z-index: 2; }
    .about-photo { position: relative; }
    .about-photo .photo-frame { position: relative; z-index: 1; }

    /* Nav on white */
    .nav-solid { background: rgba(250,247,242,.85); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
    /* Plain links — no capsule background, border, or shadow */
    .nav-links, .nav-links.cap-light, .nav-links.cap-dark { padding: 0; gap: 26px; background: none; border: none; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; }
    .nav-links .navlink { color: var(--ink-2); }
    .nav-links .navlink:hover, .nav-links .navlink.active { color: var(--orange); }
    .mobile-menu { background: rgba(250,247,242,.97); border-bottom: 1px solid var(--line); }

    /* Cards get a soft shadow so white-on-white still reads */
    .card { box-shadow: none; }
    .exp-contrib { background: var(--bg-elev); }

    /* Availability pill: green reads darker on white */
    .avail { color: var(--green-deep); border-width: 2px; }
    .avail-dot { background: var(--green-deep); }

    /* ============================= QUIET POLISH ============================= */
    /* Hairline borders and colour-shift hovers. No outlines, no offset shadows. */
    .btn { border: 1px solid transparent; transition: background .2s, color .2s; }
    .btn:active { transform: translateY(1px); }
    .btn-outline { border: 1px solid var(--line-strong); transition: border-color .2s, color .2s, background .2s; }
    .btn-outline:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-soft); }

    .card, .exp-contrib { border: 1px solid var(--line); box-shadow: none; border-radius: 14px; }
    .card:hover { border-color: var(--accent-line); background: var(--bg-elev-2); }

    .stat { background: var(--bg-elev-2); border: 1px solid var(--line); border-radius: 12px; padding: 13px 12px; }

    /* Recommendations keep the accent spine; the heavy outline goes. */
    .rec { border: 1px solid var(--line); border-left: 3px solid var(--accent-line); border-radius: 0 12px 12px 0; }

    .tag { border: 1px solid var(--line); }
    .pill { border: 1px solid var(--accent-line); }

    .photo-frame { border: 1px solid var(--line); border-radius: 16px; transform: none; }

    /* Nav resume button: label drops out before the nav runs out of room. */
    .nav-resume { padding: 9px 14px; }
    .nav-resume-label { display: none; }
    @media (min-width: 1240px) { .nav-resume-label { display: inline; } }

    /* Kicker, availability and the resume CTA stack under the photo. */
    /* Availability pill + resume CTA stack tightly under the photo. */
    .photo-meta { display: flex; flex-direction: column; align-items: center; gap: 12px; margin-top: 14px; }
    .photo-meta .avail { margin-top: 0; font-size: 11.5px; letter-spacing: .02em; white-space: nowrap; }
    .photo-meta .hero-cta { margin-top: 0; justify-content: center; }
    /* Role line sits directly under the name; the MSCS line tucks under it. */
    .home-intro .kicker { margin-top: 14px; }
    .home-intro .kicker + .kicker { margin-top: 5px; }
    /* The intro paragraph floats vertically centred in the space between the
       MSCS line above it and the metrics row at the bottom of the pane. The
       column stretches the full pane height so the auto margins have slack to
       distribute; the photo opts out of the stretch. */
    .hero.pane.is-active .home-top { flex: 1; align-items: stretch; }
    .hero.pane.is-active .home-top .about-photo { align-self: start; }
    .hero.pane.is-active .home-intro { display: flex; flex-direction: column; }
    .hero.pane.is-active .hero-sub { margin-top: auto; margin-bottom: auto; }
    /* Let the stack run wider than the 300px frame so the pill stays on one line. */
    @media (min-width: 900px) {
      .photo-meta { width: calc(100% + 64px); margin-left: -32px; }
    }

    /* Nav CTA must never wrap onto a second line. */
    .nav-right .btn, .nav-right .btn-outline { white-space: nowrap; flex-shrink: 0; }

    /* Skills: label and its tag row share a baseline. */
    .skill-block .mono-label { margin-bottom: 0; padding-top: 7px; }
    .skill-block .tags { margin: 0; }

    /* Education: two cards side by side on wide screens so the pane fits
       without scrolling, and the columns read symmetrically. */
    @media (min-width: 1000px) {
      #education .stack-list { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: start; }
    }

    /* Contact details sit under the photo — the contact pane is gone. */
    .photo-contact { display: flex; flex-direction: column; align-items: center; gap: 9px; margin-top: 4px; text-align: center; }
    .pc-email { display: inline-flex; align-items: center; gap: 7px; font-size: 13.5px; color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; transition: color .2s; }
    .pc-email:hover { color: var(--accent-2); }
    .pc-meta { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; font-family: var(--font-mono); font-size: 11.5px; color: var(--ink-3); }
    .pc-meta span, .pc-meta a { display: inline-flex; align-items: center; gap: 5px; }
    .pc-tel { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; transition: color .2s; }
    .pc-tel:hover { color: var(--accent-2); }
    .pc-socials { display: flex; flex-wrap: wrap; justify-content: center; gap: 7px; margin-top: 2px; }
    .pc-socials .soc { font-size: 11.5px; padding: 6px 12px; gap: 6px; }

    /* Inline text links carry a persistent underline, so "clickable" is signalled
       by more than colour (the clay accent is also used decoratively for kickers,
       the GPA value and list marks). Buttons, pills and cards are excluded —
       their borders and fills already read as interactive. */
    .link-orange { text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 1px; }
    .link-orange:hover { color: var(--accent-2); }

    /* RESPONSIVE */
    @media (min-width: 720px) {
      .grid-2 { grid-template-columns: 1fr 1fr; }
      .stats { grid-template-columns: repeat(4, 1fr); }
      .about-grid { grid-template-columns: 300px 1fr; gap: 56px; }
      .skill-block { grid-template-columns: 200px 1fr; align-items: start; }
    }
    @media (min-width: 900px) {
      .home-top { grid-template-columns: 1.25fr .75fr; gap: 48px; }
      .home-top .about-photo { justify-self: end; }
    }
    @media (min-width: 960px) {
      .grid-3 { grid-template-columns: repeat(3, 1fr); }
      .exp-row { grid-template-columns: 80px 1fr; }
    }
    @media (min-width: 1080px) {
      .nav-links { display: flex; }
      .menu-btn { display: none; }
    }

    @media (prefers-reduced-motion: reduce) {
      .rise, .reveal { opacity: 1 !important; transform: none !important; animation: none !important; transition: none !important; }
      .marquee-track, .stamp-rotate, .spin-slow, .float-badge { animation: none !important; }
      .magnetic { transition: none !important; }
      .stamp-parallax, .orbit-1, .orbit-2 { transform: none !important; }
    }
  `}</style>
);

export default StylesWarm;
