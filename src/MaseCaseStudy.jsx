import React, { useEffect, useRef } from 'react';
import {
  ArrowLeft, ArrowUpRight, Image as ImageIcon,
  FlaskConical, GitCompareArrows, Gauge, Workflow, ListChecks, TriangleAlert, Target,
} from 'lucide-react';
import CaseStudyStyles from './CaseStudyStyles.jsx';

/* =================================================================== data ===
 * Source: MASE contribution summary + running experiment analysis.
 * Results are the author's own measured data — shown as PRELIMINARY and ONGOING.
 * ========================================================================== */

const overview = {
  role: 'Research design & measurement tooling — end-to-end',
  program: 'CS7980 Research Capstone · Northeastern University',
  subject: 'Study codebase: care-api',
  stack: ['CodeRabbit', 'Hermes', 'sqlite3', 'Python', 'Git'],
};

/* ============================================================== components ===*/

const VisualSlot = ({ src, alt, label, caption, aspect = '4 / 3' }) => (
  <figure className="hs-visual reveal">
    {src ? (
      <img src={src} alt={alt || label} className="hs-visual-img" loading="lazy" />
    ) : (
      <div className="hs-visual-ph" style={{ aspectRatio: aspect }}>
        <ImageIcon className="w-7 h-7" strokeWidth={1.5} />
        <span className="hs-visual-label">{label}</span>
        <span className="hs-visual-hint">Diagram slot</span>
      </div>
    )}
    {caption && <figcaption className="hs-visual-cap">{caption}</figcaption>}
  </figure>
);

const Metric = ({ value, unit, label, wide }) => (
  <div className={`hs-metric ${wide ? 'wide' : ''}`}>
    <div className="hs-metric-val">{value}<span className="hs-metric-unit">{unit}</span></div>
    <div className="hs-metric-label">{label}</div>
  </div>
);

const BuiltList = ({ items }) => (
  <ul className="hs-built">
    {items.map((it, i) => (
      <li key={i}><span className="li-mark">→</span><span><b>{it.k}</b>{it.v ? ` — ${it.v}` : ''}</span></li>
    ))}
  </ul>
);

const STATUS_LABEL = { shipped: 'Shipped', dev: 'In Development', ongoing: 'Ongoing' };
const Status = ({ s }) => <span className={`hs-status ${s === 'shipped' ? 'shipped' : s === 'ongoing' ? 'dev' : 'dev'}`}>{STATUS_LABEL[s]}</span>;

/* =================================================================== page ===*/

const MaseCaseStudy = ({ onBack, target = null }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(root?.querySelectorAll('.reveal') || []);
    let obs;
    if (reduced || target) {
      els.forEach((el) => el.classList.add('reveal-in'));
    } else {
      obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('reveal-in'); obs.unobserve(e.target); }
        }),
        { root, threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
      );
      els.forEach((el) => obs.observe(el));
    }
    requestAnimationFrame(() => {
      if (!root) return;
      const el = target && root.querySelector(`#${target}`);
      root.scrollTop = el ? Math.max(0, el.offsetTop - 72) : 0;
    });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onBack(); };
    window.addEventListener('keydown', onKey);
    return () => {
      obs?.disconnect();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onBack, target]);

  return (
    <div className="cs-study theme-green" ref={rootRef}>
      <CaseStudyStyles />

      {/* TOP BAR */}
      <div className="hs-topbar">
        <div className="wrap hs-topbar-inner">
          <button className="hs-back" onClick={onBack}><ArrowLeft className="w-4 h-4" /> Back to portfolio</button>
          <span className="hs-topbar-tag">MASE · Research Deep Dive</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="hs-header">
        <div className="wrap">
          <span className="kicker reveal">Deep Dive — Research</span>
          <h1 className="hs-title reveal">MASE<span className="ast"> ✳</span></h1>
          <p className="hs-lead reveal">
            <b>Multi-Agent Software Engineering</b> — a controlled study comparing a single generalist LLM
            agent against a two-agent system (a Coder paired with a dedicated NFR Enforcement Agent) on a
            real codebase, measuring whether specializing a second agent for non-functional-requirement
            enforcement produces better-quality output, and at what token cost.
          </p>
          <div className="hs-meta reveal">
            <span>{overview.role}</span>
            <span className="hs-dot">·</span>
            <span>{overview.subject}</span>
            <span className="hs-dot">·</span>
            <Status s="ongoing" />
          </div>
          <p className="mono-sm dim reveal" style={{ marginTop: 10 }}>{overview.program}</p>
          <div className="tags reveal" style={{ marginTop: 18 }}>
            {overview.stack.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      </header>

      {/* m-f1 WHAT MASE IS */}
      <section id="m-f1" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">01</span>
            <span className="hs-pill flag"><GitCompareArrows className="w-3.5 h-3.5" /> Single vs. two-agent</span>
            <Status s="ongoing" />
          </div>
          <h2 className="hs-h2 reveal">The experiment</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            Both arms branch off the same clean <code>main</code> and run identical Coder prompts on the same
            model backbone — the only difference is an in-loop review step.
          </p>
          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">The two arms</span>
              <BuiltList items={[
                { k: 'single', v: 'one Coder pass' },
                { k: 'two_agent', v: 'Coder → NFR-reviewer (reviews the diff against a locked nfr_rules.md) → Coder revises only the flagged violations' },
              ]} />
              <p className="hs-para reveal">
                Isolating the effect of agent decomposition this way makes the study a clean test of one
                question: does an in-loop NFR review actually reduce the defects an independent judge finds?
              </p>
            </div>
            <div>
              {/* TODO: diagram — single Coder pass vs. Coder → NFR-reviewer → revise loop. */}
              <VisualSlot label="Arm A vs. Arm B — agent flow" caption="Single pass vs. Coder + in-loop NFR review" />
            </div>
          </div>
        </div>
      </section>

      {/* m-f2 WHAT IT MEASURES */}
      <section id="m-f2" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">02</span>
            <span className="hs-pill"><Target className="w-3.5 h-3.5" /> Metrics</span>
            <Status s="dev" />
          </div>
          <h2 className="hs-h2 reveal">What the study measures</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            Not NFR compliance alone — several dimensions, and where each configuration wins.
          </p>
          <div className="hs-two-col">
            <div>
              <BuiltList items={[
                { k: 'NFR / code-quality violations', v: 'the count of CodeRabbit review comments per PR' },
                { k: 'Comment severity', v: 'a severity breakdown, not a flat count' },
                { k: 'Token usage', v: 'raw input / output / reasoning tokens per run — kept as raw tokens, not a cross-provider USD figure' },
                { k: 'Comparative analysis', v: 'a structured breakdown of where each configuration outperforms, rather than a single winner' },
              ]} />
            </div>
            <div>
              <span className="mono-label orange reveal">Primary metric</span>
              <p className="hs-para reveal">
                Severity-weighted score = <code>100·critical + 10·major + 1·minor</code> — lower is better.
                The internal <code>nfr_rules.md</code> and the external <code>.coderabbit.yaml</code> mirror
                each other, so the score measures whether the internal review reduces the external findings.
              </p>
              <p className="hs-callout reveal">
                <b>Tokens are not efficiency.</b> The token metric sums cache_read, which balloons with turn
                count — so it is only a last-resort tie-breaker, never read as cost-efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* m-f3 MEASUREMENT TOOLING */}
      <section id="m-f3" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">03</span>
            <span className="hs-pill flag"><Gauge className="w-3.5 h-3.5" /> Tooling — built by me</span>
            <Status s="shipped" />
          </div>
          <h2 className="hs-h2 reveal">Measurement tooling</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            The pipelines that make both research questions machine-countable.
          </p>
          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">CodeRabbit — violations + severity</span>
              <BuiltList items={[
                { k: 'Locked config', v: 'turns the care-api NFR conventions into machine-countable review comments; the count on a PR is the violation count' },
                { k: 'Path-specific rules', v: 'controllers, services, DTOs/schemas, auth, Prisma migrations — OpenAPI completeness, JWT guards, OTel spans, Zod validation, GIST-index preservation' },
                { k: 'Clean counts', v: 'praise / summaries filtered out so counts and severities stay clean' },
              ]} />
              <span className="mono-label orange reveal">Hermes — token accounting</span>
              <BuiltList items={[
                { k: 'Per-turn token split', v: 'query sqlite3 on ~/.hermes/state.db to separate input / output / reasoning tokens per turn' },
                { k: 'Unblocked the tooling', v: 'resolved a provider billing-policy 400 by documenting the provider-switch / fallback path' },
              ]} />
            </div>
            <div>
              {/* TODO: optional — CodeRabbit config snippet or a summarize output screenshot. */}
              <VisualSlot label="Measurement pipeline" caption="CodeRabbit findings + Hermes token accounting" />
              <div className="tags reveal" style={{ marginTop: 16 }}>
                {['CodeRabbit', 'Hermes', 'sqlite3', 'Python'].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* m-f4 WORKFLOW */}
      <section id="m-f4" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">04</span>
            <span className="hs-pill"><Workflow className="w-3.5 h-3.5" /> Reproducible workflow</span>
            <Status s="dev" />
          </div>
          <h2 className="hs-h2 reveal">Experiment workflow</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            A two-phase, reproducible run per ticket.
          </p>
          <BuiltList items={[
            { k: 'run_issue.sh <n>', v: 'spins up the single-agent and two-agent branches per issue, off the same clean main' },
            { k: 'Wait for CodeRabbit', v: 'the external judge reviews each arm’s PR' },
            { k: 'collect_nfr.py', v: 'gathers comments + severities' },
            { k: 'summarize_mase.py', v: 'aggregates the comparison; committed scripts live in mase/, scratch output gitignored' },
          ]} />
        </div>
      </section>

      {/* m-f5 RESEARCH DESIGN */}
      <section id="m-f5" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">05</span>
            <span className="hs-pill"><ListChecks className="w-3.5 h-3.5" /> Scope discipline</span>
            <Status s="shipped" />
          </div>
          <h2 className="hs-h2 reveal">Research design & scope discipline</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            Refined a sprawling four-sub-question prompt down to a feasible study under a tight timeline.
          </p>
          <BuiltList items={[
            { k: 'Retained', v: 'RQ1 (NFR violations) and the token-cost question' },
            { k: 'Dropped', v: 'the manual-rework sub-question (git-diff signal too noisy) and the net-benefit synthesis (framework not feasible in the timeline), plus a subjective complexity pre-assessment' },
            { k: 'Authored the Experiment Protocol', v: 'including a section documenting the research-question evolution and correct attribution of the original sub-questions' },
          ]} />
        </div>
      </section>

      {/* m-f6 PRELIMINARY RESULTS */}
      <section id="m-f6" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">06</span>
            <span className="hs-pill flag"><FlaskConical className="w-3.5 h-3.5" /> Preliminary results</span>
            <Status s="ongoing" />
          </div>
          <h2 className="hs-h2 reveal">Early signal — and what it doesn’t yet prove</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 820 }}>
            Across the first four tickets, the in-loop NFR review lowers the severity-weighted findings —
            but the effect is concentrated, and it’s early.
          </p>

          <div className="hs-metric-grid reveal">
            <Metric value="38" unit="%" label="Lower weighted findings — two-agent (50 → 31)" />
            <Metric value="3/4" unit="" label="Two-agent win-rate" />
            <Metric value="4" unit="" label="Tickets scored so far" />
            <Metric value="1" unit="" label="Model · 1 repo" />
          </div>

          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">Per-ticket outcome</span>
              <BuiltList items={[
                { k: '#6 Resources CRUD', v: 'two-agent won (30 → 11): the review pass removed a migration data-loss bug and downgraded a sanitization finding' },
                { k: '#51 interactions / soft-delete', v: 'two-agent won (20 → 10): review caught one of two migration data-loss findings' },
                { k: '#46 communities schema', v: 'tie (0 → 0): pure additive schema, nothing to flag' },
                { k: '#57 resource follow-ups', v: 'single won (0 vs 10): two-agent drew a contestable @Roles flag on an owner-or-admin route' },
              ]} />
            </div>
            <div>
              <span className="mono-label orange reveal">Emerging thesis (to test with more n)</span>
              <BuiltList items={[
                { k: 'Value concentrates on data-integrity', v: 'the in-loop review helps most on high-severity migration / data-loss violations — where a silent bug is costliest' },
                { k: 'Additive work converges', v: 'on low-risk schema changes the two arms behave identically — no benefit, no harm' },
                { k: 'Endpoint work can invert it', v: 'with little data-loss surface the benefit disappears and revise churn can even attract a contestable finding' },
                { k: 'Confound: contestable findings', v: 'several “Major” findings are defensible design choices under this repo’s architecture; a valid/contestable tag per finding would sharpen the signal' },
              ]} />
            </div>
          </div>

          <div className="reveal" style={{ marginTop: 8 }}>
            <span className="mono-label orange"><TriangleAlert className="inline w-3.5 h-3.5" /> Threats to validity</span>
            <BuiltList items={[
              { k: 'Small n', v: 'n = 4, single repo, single model — descriptive, not yet statistically significant' },
              { k: 'Non-deterministic judge', v: 'CodeRabbit can draw different findings on identical code across PRs' },
              { k: 'Contestable findings inflate scores', v: 'not every “Major” is a real defect' },
              { k: 'Ticket kind matters', v: 'migration-heavy vs. endpoint-heavy vs. additive behave very differently — kind is a reported factor, not averaged away' },
            ]} />
          </div>

          <p className="hs-callout reveal">
            <b>Research is ongoing.</b> Roughly ten more backend issues remain to run, and the sample may grow
            with contributions from the team’s other repos — results here are a live, honest read of the
            signal so far, not a final claim.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="hs-footer">
        <div className="wrap hs-footer-inner">
          <button className="btn-outline" onClick={onBack}><ArrowLeft className="w-4 h-4" /> Back to portfolio</button>
          <a href="mailto:aggrawal.m@northeastern.edu" className="link-orange">Let’s talk <ArrowUpRight className="w-4 h-4" /></a>
        </div>
      </footer>
    </div>
  );
};

export default MaseCaseStudy;
