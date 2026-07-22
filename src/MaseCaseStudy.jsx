import React, { useEffect, useRef } from 'react';
import {
  ArrowLeft, ArrowUpRight,
  FlaskConical, GitCompareArrows, Gauge, Workflow, ListChecks, TriangleAlert, Target, Microscope,
} from 'lucide-react';
import CaseStudyStyles from './CaseStudyStyles.jsx';

/* =================================================================== data ===
 * Source: "Does a Two-Agent NFR-Enforcement Loop Reduce Non-Functional
 * Violations? A Controlled Study, and Why the Obvious Metric Fails in Both
 * Directions" — Aggrawal et al., Northeastern (CS7980). Results below are the
 * study's measured data across all ten issues.
 * ========================================================================== */

const overview = {
  role: 'Research design, measurement tooling & analysis — end-to-end',
  program: 'CS7980 Research Capstone · Northeastern University',
  subject: 'Study codebase: care-api (NestJS + Prisma + PostGIS)',
  stack: ['Claude Opus 4.8', 'CodeRabbit', 'NestJS', 'Python', 'Bash', 'Git'],
};

/* ============================================================== components ===*/

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
const Status = ({ s }) => <span className={`hs-status ${s === 'shipped' ? 'shipped' : 'dev'}`}>{STATUS_LABEL[s]}</span>;

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
            <b>Multi-Agent Software Engineering</b> — a controlled, model-matched study comparing a single
            generalist LLM coding agent against a two-agent loop (a Coder paired with a dedicated
            NFR-Enforcement reviewer) across <b>ten real issues</b> on a production NestJS backend. The
            question: does an in-loop review reduce non-functional-requirement defects, and at what token
            cost? The headline answer turned out to be about the measurement instrument — the obvious metric
            fails in both directions.
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
            Both arms branch off the same clean <code>main</code> and run the identical Coder prompt on the
            same model (<b>Claude Opus 4.8</b>) — the only manipulated variable is an in-loop
            review-and-revise pass.
          </p>
          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">The two arms</span>
              <BuiltList items={[
                { k: 'single (control)', v: 'one Coder pass — no review, no revise' },
                { k: 'two_agent (treatment)', v: 'Coder → NFR reviewer (reviews the diff against a locked nfr_rules.md, lists violations only) → Coder revises only the flagged violations' },
              ]} />
            </div>
            <div>
              <span className="mono-label orange reveal">Why it&apos;s clean</span>
              <p className="hs-para reveal">
                A within-issue design: each of the ten feature issues is implemented twice, both PRs branched
                off the same clean commit and reviewed independently by the same locked automated judge.
                Holding the model and prompt fixed isolates the in-loop review as the only independent
                variable — a clean test of one question: does an in-loop NFR review actually reduce the
                defects an independent judge finds?
              </p>
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
            <Status s="shipped" />
          </div>
          <h2 className="hs-h2 reveal">What the study measures</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            The protocol specified one metric. It took four lenses to actually see the effect.
          </p>
          <div className="hs-two-col">
            <div>
              <BuiltList items={[
                { k: 'Raw NFR count (protocol)', v: 'the automated reviewer’s inline-comment count on the PR, as-is' },
                { k: 'Severity-weighted (ours)', v: '100·critical + 10·major + 1·minor — one number for “fewer and less severe”' },
                { k: 'Valid-only (ours)', v: 'the weighted score after removing findings hand-tagged contestable (reviewer false positives)' },
                { k: 'Functional correctness (ours)', v: 'did the PR pass CI (build-test + e2e)? — a second axis static review can’t see' },
                { k: 'Token usage (RQ3)', v: 'input + output + cache tokens summed across all passes' },
              ]} />
            </div>
            <div>
              <span className="mono-label orange reveal">The headline caveat</span>
              <p className="hs-para reveal">
                The severity-weighted score is <code>100c + 10m + 1n</code> — lower is better. But the raw
                count the protocol specified turned out unreliable in <b>both</b> directions: it under-reported
                (a 6–6 tie at seven issues hid a real effect) and over-reported (a churn-heavy run inflated
                one arm with false positives). Severity weighting plus a valid/contestable filter were needed
                to recover the signal.
              </p>
              <p className="hs-callout reveal">
                <b>Tokens are not efficiency.</b> The token metric sums cache_read, which re-counts cached
                context every turn — so it scales with turn count, not real work, and is never read as
                cost-efficiency.
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
            The pipeline that makes both research questions machine-countable — and keeps the dataset honest.
          </p>
          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">CodeRabbit — violations + severity</span>
              <BuiltList items={[
                { k: 'Locked config', v: 'turns the care-api NFR conventions into machine-countable review comments; the inline-comment count on a PR is the violation count' },
                { k: 'Path-specific rules', v: 'controllers, services, DTOs/schemas, auth, Prisma migrations — OpenAPI completeness, JWT guards, OTel spans, Zod validation, non-destructive migrations' },
                { k: 'Mirrored standard', v: 'nfr_rules.md (internal reviewer) and .coderabbit.yaml (external judge) written once from the same locked rules, so the score measures whether the internal review reduces the external findings' },
              ]} />
            </div>
            <div>
              <span className="mono-label orange reveal">Token accounting + integrity</span>
              <BuiltList items={[
                { k: 'Per-pass token split', v: 'per-arm input / output / cache tokens parsed from each run’s own usage JSON' },
                { k: 'Freeze guard', v: 'once an issue is decided its metric is frozen, so later reviewer comments on human revisions can’t retroactively change a score (an un-frozen score once drifted 10→40)' },
                { k: 'Inter-rater κ', v: 'findings.csv carries a second-rater column and the pipeline computes Cohen’s κ on the valid/contestable labels' },
              ]} />
              <div className="tags reveal" style={{ marginTop: 16 }}>
                {['CodeRabbit', 'Python', 'Bash', 'Git'].map((t) => <span key={t} className="tag">{t}</span>)}
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
            <Status s="shipped" />
          </div>
          <h2 className="hs-h2 reveal">Experiment workflow</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            The full protocol is scripted so a run is one command per issue — no operator variance in data
            collection.
          </p>
          <BuiltList items={[
            { k: 'run_issue.sh <issue>', v: 'pulls the issue text, runs both arms headless (claude -p) off the same clean main, records per-arm token usage, and opens both PRs' },
            { k: 'Wait for CodeRabbit', v: 'the external judge reviews each arm’s PR independently, seeing only the code diff' },
            { k: 'collect_nfr.py', v: 'pulls each PR’s findings after review, parses severity + category, and dumps every finding to findings.csv' },
            { k: 'decide.py', v: 'records the per-issue winner on the raw severity-weighted score' },
            { k: 'summarize_mase.py', v: 'aggregates the comparison and reports how often the chosen arm was CI-green' },
          ]} />
        </div>
      </section>

      {/* m-f5 RESEARCH DESIGN */}
      <section id="m-f5" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">05</span>
            <span className="hs-pill"><ListChecks className="w-3.5 h-3.5" /> Scope & grounding</span>
            <Status s="shipped" />
          </div>
          <h2 className="hs-h2 reveal">Research design, scope & grounding</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            Tightened a sprawling four-part question into two measurable outcomes — then fixed a failure mode
            the experiment surfaced along the way.
          </p>
          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">Scope discipline</span>
              <BuiltList items={[
                { k: 'Retained', v: 'RQ1 (NFR violations) and RQ3 (token cost)' },
                { k: 'Dropped', v: 'RQ2 manual rework and RQ4 net-benefit synthesis (not cleanly measurable in the timeframe), plus a subjective complexity variable' },
                { k: 'Traceability', v: 'kept the original RQ numbering and documented the question’s evolution in the pre-registered protocol' },
              ]} />
            </div>
            <div>
              <span className="mono-label orange reveal">Grounding — a process contribution</span>
              <BuiltList items={[
                { k: 'The failure', v: 'the arms are memory-less; on one issue a stale ticket asked to rename stable columns and both arms faithfully churned the schema — a real defect the NFR metric scores at zero' },
                { k: 'docs/DECISIONS.md', v: 'a tracked cross-ticket decisions log fed into both arms’ identical prompt (when a ticket conflicts, the log wins)' },
                { k: 'Reconciliation gate', v: 'before spending compute, the incoming issue is diffed against the decisions log to surface conflicts to a human — demonstrated preventing the drift, not just diagnosing it' },
              ]} />
            </div>
          </div>
        </div>
      </section>

      {/* m-f6 RESULTS */}
      <section id="m-f6" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">06</span>
            <span className="hs-pill flag"><FlaskConical className="w-3.5 h-3.5" /> Results — RQ1 & RQ3</span>
            <Status s="shipped" />
          </div>
          <h2 className="hs-h2 reveal">What the study found</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 820 }}>
            The in-loop review reduces violations — but the benefit is concentrated, and the raw count hides it.
          </p>

          <div className="hs-metric-grid reveal">
            <Metric value="−57" unit="%" label="Severity-weighted findings — two-agent (122 → 53)" />
            <Metric value="6→3" unit="" label="Genuine defects — halved by the in-loop review" />
            <Metric value="10" unit="" label="Real issues · 20 PRs · 1 model · 1 repo" />
            <Metric value="0.90" unit="×" label="Two-agent token cost — not an efficiency claim" />
          </div>

          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">RQ1 — where the reviewer earns its keep</span>
              <BuiltList items={[
                { k: 'Data-integrity / migration tasks', v: 'the in-loop review removed or reduced real, high-severity silent-data-loss migrations the single agent shipped (#6, #51, #48, #49) — the whole of the measured benefit' },
                { k: 'Additive schema & endpoint CRUD converge', v: 'neither arm shipped a genuine defect; the single agent’s endpoint “wins” came only from contestable findings landing on the two-agent PR — zero endpoint wins on merit' },
                { k: 'Valid-only lens', v: 'single 60 vs. two-agent 12; on genuine defects the two-agent loop halves them (6→3)' },
              ]} />
            </div>
            <div>
              <span className="mono-label orange reveal">Validity & tokens</span>
              <BuiltList items={[
                { k: 'False positives dominate the raw signal', v: '13 of 22 findings were contestable — mostly a Prisma error-mapping class the codebase already handles globally' },
                { k: 'Single: 14 findings', v: '6 valid / 8 contestable (valid-only weight 60)' },
                { k: 'Two-agent: 8 findings', v: '3 valid / 5 contestable (valid-only weight 12)' },
                { k: 'RQ3 token cost', v: 'single 39.0M vs. two-agent 35.3M (≈0.90×) — but the sum re-counts cache-read every turn, so it’s not a valid efficiency proxy' },
              ]} />
            </div>
          </div>
        </div>
      </section>

      {/* m-f7 THE METRIC IS THE FINDING */}
      <section id="m-f7" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">07</span>
            <span className="hs-pill flag"><Microscope className="w-3.5 h-3.5" /> The metric is the finding</span>
            <Status s="shipped" />
          </div>
          <h2 className="hs-h2 reveal">The headline result is methodological</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 820 }}>
            The single most transferable finding isn&apos;t about the treatment — it&apos;s that the protocol&apos;s
            chosen metric, raw automated-reviewer comment count, is unreliable in both directions.
          </p>

          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">Fails both ways</span>
              <BuiltList items={[
                { k: 'Under-reports', v: 'at seven issues the count was a 6–6 tie — the specified metric would have concluded “no effect,” hiding a real one' },
                { k: 'Over-reports', v: 'a single-agent run drew six raw findings, mostly false positives from a gratuitous reformatting pass re-surfacing pre-existing code' },
                { k: 'Blind to runtime correctness', v: 'static review sees only the diff — boundary case #49' },
              ]} />
            </div>
            <div>
              <span className="mono-label orange reveal">Boundary case A — a false negative (#49)</span>
              <p className="hs-para reveal">
                The two-agent PR earned the study&apos;s cleanest static score (weighted 1) and won decisively —
                yet a tracing decorator made two pure helpers return a <code>Promise</code> while the type still
                read synchronous. It compiled, type-checked, and passed the reviewer, but shipped a <b>P0
                runtime bug</b>: <b>35 end-to-end tests failed</b>. Three layers were blind (static reviewer,
                <code>tsc</code>, and the arm never ran its own e2e) — the direct motivation for adding a
                functional-correctness (CI/e2e) axis.
              </p>
            </div>
          </div>

          <p className="hs-callout reveal">
            <b>The recommendation.</b> A trustworthy evaluation of LLM code quality with an automated reviewer
            needs three things: <b>severity weighting</b>, a <b>validity filter</b>, and a
            <b> functional-correctness cross-check</b>. Raw counts mislead both ways.
          </p>

          <div className="reveal" style={{ marginTop: 8 }}>
            <span className="mono-label orange"><TriangleAlert className="inline w-3.5 h-3.5" /> Threats to validity</span>
            <BuiltList items={[
              { k: 'Scale & scope', v: 'n = 10, single repo, single model — descriptive, not statistically powered; the genuine-defect signal rests on ~3 migration tickets' },
              { k: 'Static judge ≠ correctness', v: 'the metric can rank broken code first (#49); results must be read with the functional-correctness signal' },
              { k: 'Reviewer non-determinism', v: 'the automated judge can flag identical code differently across PRs' },
              { k: 'Single-rater validity tagging', v: 'the valid/contestable labels are one author’s; a second rater and Cohen’s κ are pending' },
              { k: 'Token-metric confound', v: 'cache-read accounting undermines RQ3; that conclusion is provisional' },
              { k: 'Task-kind imbalance', v: 'the ten issues skew endpoint-heavy; task kind is a strong moderator, not averaged away' },
            ]} />
          </div>

          <p className="hs-callout reveal">
            <b>Research is ongoing.</b> Cross-repository replication — a mobile client and an admin console —
            is team work in progress; the results here are the honest read across all ten backend issues, not
            a final cross-repo claim.
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
