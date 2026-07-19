import React from 'react';

/* Shared styles for full-screen case-study overlays (Hydrow, CareNexus, …).
   Container class: .cs-study  ·  add .theme-green to recolor the accent. */
const CaseStudyStyles = () => (
  <style>{`
    .cs-study {
      position: fixed; inset: 0; z-index: 200;
      background: var(--bg); color: var(--ink);
      overflow-y: auto; overflow-x: hidden;
      animation: hsIn .35s ease both;
    }
    @keyframes hsIn { from { opacity: 0; } to { opacity: 1; } }

    /* Accent theme override (CareNexus brand green) */
    .cs-study.theme-green {
      --accent: #12A150;
      --accent-2: #16b95f;
      --accent-soft: rgba(18, 161, 80, 0.12);
      --accent-line: rgba(18, 161, 80, 0.42);
    }

    .hs-topbar { position: sticky; top: 0; z-index: 5; background: rgba(10,9,8,.82); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
    .hs-topbar-inner { display: flex; align-items: center; justify-content: space-between; height: 60px; }
    .hs-back { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 13px; color: var(--ink-2); background: none; border: none; cursor: pointer; padding: 6px 0; transition: color .2s; }
    .hs-back:hover { color: var(--accent); }
    .hs-topbar-tag { font-family: var(--font-mono); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3); }

    .hs-header { padding: 64px 0 40px; border-bottom: 1px solid var(--line); }
    .hs-title { font-family: var(--font-display); font-weight: 700; font-size: clamp(2.2rem, 6vw, 4.6rem); line-height: 1.02; letter-spacing: -.03em; margin: 16px 0 0; }
    .hs-title .ast { color: var(--accent); }
    .hs-lead { max-width: 680px; font-size: clamp(15px, 1.8vw, 19px); color: var(--ink-2); line-height: 1.6; margin: 22px 0 0; }
    .hs-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; font-family: var(--font-mono); font-size: 13px; color: var(--ink-2); margin-top: 22px; }
    .hs-dot { color: var(--ink-3); }

    .hs-section { padding: 46px 0; border-bottom: 1px solid var(--line); }
    .hs-head { margin-bottom: 34px; max-width: 760px; }
    .hs-h2 { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.7rem, 3.6vw, 2.7rem); line-height: 1.05; letter-spacing: -.02em; margin: 14px 0 0; color: var(--ink); }
    .hs-sub { color: var(--ink-2); font-size: 15px; line-height: 1.6; margin-top: 16px; }
    .hs-sub code, .hs-para code { font-family: var(--font-mono); font-size: .88em; color: var(--accent); background: var(--accent-soft); padding: 1px 6px; border-radius: 6px; }

    /* METRIC TILES */
    .hs-metric-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; }
    .hs-metric-grid.tight { margin-top: 14px; border-radius: 12px; }
    .hs-metric { background: var(--bg-elev); padding: 22px 20px; }
    .hs-metric.wide { grid-column: 1 / -1; }
    .hs-metric-val { font-family: var(--font-display); font-weight: 700; font-size: clamp(1.7rem, 3.6vw, 2.5rem); line-height: 1; color: var(--ink); letter-spacing: -.02em; }
    .hs-metric-unit { color: var(--accent); font-size: .55em; margin-left: 3px; }
    .hs-metric-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: .04em; color: var(--ink-3); margin-top: 12px; line-height: 1.4; text-transform: uppercase; }

    /* PERF WINS */
    .hs-perfwin-row { display: flex; flex-direction: column; gap: 12px; margin-top: 14px; }
    .hs-perfwin { background: var(--bg-elev); border: 1px solid var(--line); border-radius: 12px; padding: 16px 18px; }
    .hs-pw-row { display: flex; align-items: center; gap: 12px; font-family: var(--font-display); font-weight: 600; }
    .hs-pw-before { color: var(--ink-3); text-decoration: line-through; text-decoration-color: var(--line-strong); font-size: 1.05rem; }
    .hs-pw-arrow { color: var(--ink-3); flex-shrink: 0; }
    .hs-pw-after { color: var(--accent); font-size: 1.2rem; }
    .hs-pw-label { display: block; font-family: var(--font-mono); font-size: 11.5px; color: var(--ink-2); line-height: 1.5; margin-top: 8px; }

    /* FEATURE LAYOUT */
    .hs-feature-head { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
    .hs-fnum { font-family: var(--font-mono); font-size: 13px; color: var(--ink-3); }
    .hs-pill { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11.5px; padding: 5px 12px; border-radius: 999px; border: 1px solid var(--line-strong); color: var(--ink-2); white-space: nowrap; }
    .hs-pill.flag { border-color: var(--accent-line); color: var(--accent); background: var(--accent-soft); }

    /* STATUS PILLS */
    .hs-status { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; letter-spacing: .04em; padding: 4px 11px; border-radius: 999px; border: 1px solid var(--line-strong); color: var(--ink-2); white-space: nowrap; text-transform: uppercase; }
    .hs-status::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
    .hs-status.shipped { color: var(--accent); border-color: var(--accent-line); background: var(--accent-soft); }
    .hs-status.dev { color: #d6a54a; border-color: rgba(214,165,74,.4); background: rgba(214,165,74,.1); }
    .hs-status.designed { color: var(--ink-2); border-color: var(--line-strong); }
    .hs-status.upcoming { color: var(--ink-3); border-color: var(--line); }

    .hs-oneliner { font-size: clamp(16px, 2.2vw, 21px); color: var(--ink); line-height: 1.5; margin: 16px 0 30px; font-weight: 500; }
    .hs-para { color: var(--ink-2); font-size: 15px; line-height: 1.65; margin: 8px 0 24px; }
    .hs-callout { margin-top: 16px; padding: 14px 18px; border-left: 2px solid var(--accent); background: var(--accent-soft); border-radius: 0 10px 10px 0; color: var(--ink-2); font-size: 14.5px; }
    .hs-callout b { color: var(--accent); }
    .mono-label { margin-top: 4px; }

    .hs-built { list-style: none; padding: 0; margin: 8px 0 24px; display: flex; flex-direction: column; gap: 12px; }
    .hs-built li { display: flex; gap: 12px; font-size: 14.5px; line-height: 1.55; color: var(--ink-2); }
    .hs-built b { color: var(--ink); }

    .flagship .hs-feature-grid { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: start; }
    .hs-feature-visual { position: sticky; top: 78px; }

    .hs-two-col { display: grid; grid-template-columns: 1fr; gap: 28px; margin-top: 24px; align-items: start; }

    /* LEARNINGS */
    .hs-learnings { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
    .hs-learn { font-family: var(--font-display); font-weight: 600; font-size: 1.05rem; color: var(--ink); letter-spacing: -.01em; padding: 12px 20px; border: 1px solid var(--line-strong); border-radius: 999px; transition: border-color .2s, color .2s; }
    .hs-learn:hover { border-color: var(--accent); color: var(--accent); }

    /* VISUAL PLACEHOLDER */
    .hs-visual { margin: 0; }
    .hs-visual-stack { display: flex; flex-direction: column; gap: 20px; margin-top: 16px; }
    .hs-visual-img { width: 100%; height: auto; border-radius: 16px; border: 1px solid var(--line); display: block; }
    .hs-visual-ph {
      width: 100%; border: 1.5px dashed var(--line-strong); border-radius: 16px;
      background: linear-gradient(180deg, var(--bg-elev), var(--bg));
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
      color: var(--ink-3); text-align: center; padding: 24px;
    }
    .hs-visual-label { font-family: var(--font-mono); font-size: 12.5px; color: var(--ink-2); max-width: 80%; }
    .hs-visual-hint { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-3); }
    .hs-visual-cap { font-family: var(--font-mono); font-size: 12px; color: var(--accent); margin-top: 12px; text-align: center; }

    /* FOOTER */
    .hs-footer { padding: 40px 0 64px; }
    .hs-footer-inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; }

    @media (min-width: 760px) {
      .hs-metric-grid { grid-template-columns: repeat(4, 1fr); }
      .hs-metric-grid.tight { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 960px) {
      .flagship .hs-feature-grid { grid-template-columns: 1.15fr .85fr; gap: 56px; }
      .flagship .hs-feature-grid.reverse { grid-template-columns: .85fr 1.15fr; }
      .hs-two-col { grid-template-columns: 1fr 1fr; gap: 44px; }
    }
  `}</style>
);

export default CaseStudyStyles;
