import React, { useEffect, useRef } from 'react';
import {
  ArrowLeft, ArrowUpRight, ArrowRight, Image as ImageIcon,
  LineChart, Trophy, Zap, Scale, History, Filter, LayoutGrid, Bot,
} from 'lucide-react';
import CaseStudyStyles from './CaseStudyStyles.jsx';

/* =================================================================== data ===
 * Source: hydrow_portfolio_content.md
 * RULE: every number below is VERIFIED in the source doc. Do NOT add a metric
 * that isn't in the doc. ⚠️ NEEDS DATA business metrics are intentionally
 * rendered as qualitative framing only — see the TODO comments in each feature.
 * ========================================================================== */

const overview = {
  role: 'Backend Engineer Intern',
  period: 'Jan 2026 – Aug 2026',
  location: 'Boston, MA',
  repo: 'TrueRowing/data-api-v2',
  stack: ['Node.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Redis', 'AWS S3', 'TypeORM', 'Zod'],
};

// VERIFIED headline + production-scale numbers (safe to display as-is).
const scaleMetrics = [
  { value: '59', unit: '', label: 'Pull requests · 56 merged' },
  { value: '20', unit: '+', label: 'Production REST APIs' },
  { value: '6,500', unit: '+', label: 'Published workout videos' },
  { value: '360', unit: '+', label: 'Strength movements' },
  { value: '10,700', unit: '+', label: 'Workout-type tag associations' },
  { value: '1,460', unit: '+', label: 'Tags across all groups' },
  { value: '10', unit: '+', label: 'Monthly partitions · user_progress' },
  { value: '50', unit: '+', label: 'Personal records (power users)' },
];

/* ============================================================== components ===*/

/**
 * Drop an exported Figma frame / screenshot in by passing `src`.
 * While `src` is empty it renders a clean captioned placeholder.
 */
const VisualSlot = ({ src, alt, label, caption, aspect = '16 / 10' }) => (
  <figure className="hs-visual reveal">
    {src ? (
      <img src={src} alt={alt || label} className="hs-visual-img" loading="lazy" />
    ) : (
      <div className="hs-visual-ph" style={{ aspectRatio: aspect }}>
        <ImageIcon className="w-7 h-7" strokeWidth={1.5} />
        <span className="hs-visual-label">{label}</span>
        <span className="hs-visual-hint">Figma / screenshot slot</span>
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

// before → after performance win (verified in doc).
const PerfWin = ({ before, after, label }) => (
  <div className="hs-perfwin">
    <div className="hs-pw-row">
      <span className="hs-pw-before">{before}</span>
      <ArrowRight className="w-4 h-4 hs-pw-arrow" />
      <span className="hs-pw-after">{after}</span>
    </div>
    <span className="hs-pw-label">{label}</span>
  </div>
);

const BuiltList = ({ items }) => (
  <ul className="hs-built">
    {items.map((it, i) => (
      <li key={i}>
        <span className="li-mark">→</span>
        <span><b>{it.k}</b>{it.v ? ` — ${it.v}` : ''}</span>
      </li>
    ))}
  </ul>
);

/* =================================================================== page ===*/

const HydrowCaseStudy = ({ onBack, target = null }) => {
  const rootRef = useRef(null);

  // Own reveal-on-scroll observer, scoped to this overlay (home keeps its own).
  useEffect(() => {
    const root = rootRef.current;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(root?.querySelectorAll('.reveal') || []);
    let obs;
    // When deep-linking to a specific feature, reveal everything up front so nothing
    // stays hidden regardless of scroll position; otherwise animate on scroll.
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

    // Scroll to the deep-linked feature (accounting for the sticky top bar), else to top.
    requestAnimationFrame(() => {
      if (!root) return;
      const el = target && root.querySelector(`#${target}`);
      root.scrollTop = el ? Math.max(0, el.offsetTop - 72) : 0;
    });

    // Lock background scroll while the case study is open.
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
    <div className="cs-study" ref={rootRef}>
      <CaseStudyStyles />

      {/* TOP BAR */}
      <div className="hs-topbar">
        <div className="wrap hs-topbar-inner">
          <button className="hs-back" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" /> Back to portfolio
          </button>
          <span className="hs-topbar-tag">Hydrow · Deep Dive</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="hs-header">
        <div className="wrap">
          <span className="kicker reveal">Deep Dive — Backend Engineering</span>
          <h1 className="hs-title reveal">Building Hydrow’s<br />strength-training backend<span className="ast"> ✳</span></h1>
          <p className="hs-lead reveal">
            A six-month backend internship on Hydrow’s connected-fitness platform — designing and
            shipping the APIs behind strength progress, gamification, and content delivery, every
            query profiled against production-scale data.
          </p>
          <div className="hs-meta reveal">
            <span>{overview.role}</span>
            <span className="hs-dot">·</span>
            <span>{overview.period}</span>
            <span className="hs-dot">·</span>
            <span>{overview.location}</span>
          </div>
          <div className="tags reveal" style={{ marginTop: 18 }}>
            {overview.stack.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
          <p className="mono-sm dim reveal" style={{ marginTop: 14 }}>repo · {overview.repo}</p>
        </div>
      </header>

      {/* CONTRIBUTION GRAPH */}
      <section className="hs-section">
        <div className="wrap">
          <VisualSlot
            src="/hydrow/contribution-graph.png"
            alt="GitHub profile — 160 contributions over the Hydrow internship"
            label="GitHub contribution graph — Jan–Aug 2026"
            caption="59 PRs · 56 merged · ~6,000+ lines across 7 product areas"
            aspect="1100 / 620"
          />
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="hs-section">
        <div className="wrap">
          <div className="hs-head reveal">
            <span className="kicker">The proof points</span>
            <h2 className="hs-h2">Profiled against production scale</h2>
            <p className="hs-sub">
              Every query below was profiled with <code>EXPLAIN&nbsp;ANALYZE</code> against Hydrow’s
              production read-replica, reviewed by a Principal/Staff engineer and an engineering lead.
              Power users carry thousands of completed workouts — numbers shown are the real scale I built on.
            </p>
          </div>
          <div className="hs-metric-grid reveal">
            {scaleMetrics.map((m) => <Metric key={m.label} {...m} />)}
          </div>
        </div>
      </section>

      {/* ============================ FLAGSHIP 1 ============================ */}
      <section id="hs-f1" className="hs-section hs-feature flagship">
        <div className="wrap">
          <div className="hs-feature-grid">
            <div className="hs-feature-body">
              <div className="hs-feature-head reveal">
                <span className="hs-fnum">01</span>
                <span className="hs-pill flag"><LineChart className="w-3.5 h-3.5" /> Owned end-to-end</span>
              </div>
              <h2 className="hs-h2 reveal">Strength Training Progress System</h2>
              <p className="hs-oneliner reveal">
                Designed and built the entire backend that lets rowers see their strength-training
                progress — stats, personal records, and fitness scoring — from an empty repo to production.
              </p>

              <span className="mono-label orange reveal">Ownership</span>
              <p className="hs-para reveal">
                Mine from the ground up. I designed the API contracts, the service layering, the
                queries, and the e2e test suites for the full feature set.
              </p>

              <span className="mono-label orange reveal">Why it matters</span>
              <p className="hs-para reveal">
                Before this, rowers had no way to see how their strength training was progressing over
                time. These APIs power the progress screens where a rower tracks weight lifted per
                movement, watches personal records climb, and sees a single HydroMetrics fitness score
                trend upward — the feedback loop that keeps people coming back to train.
              </p>
              {/* TODO ⚠️ business metric: progress-screen adoption / WAU, % of active rowers who open
                  progress, retention lift for engaged vs. non-engaged. Pull from Amplitude, then add a
                  <Metric> tile here. Do NOT surface a placeholder until a real number exists. */}

              <span className="mono-label orange reveal">What I built</span>
              <BuiltList items={[
                { k: 'Movement Stats API', v: 'per-movement min/max/avg weight, reps and sets, with 7/30/90-day, 1-year and lifetime ranges resolved dynamically from a rower’s first workout' },
                { k: 'Personal Records API', v: 'every movement with a PR, split by mode (Standard vs. Reactive), behind a clean PersonalRecordsService boundary' },
                { k: 'PR History API', v: 'day-bucketed PR progression per movement with max-per-day aggregation to keep graph payloads small' },
                { k: 'Weights Used tracking', v: 'max weight per movement per workout, handling isotonic (maxWeight) and isokinetic (avgWeight) modes correctly' },
                { k: 'HydroMetrics Score API', v: 'composite/power/endurance/precision summary plus a gap-filled historical chart endpoint' },
              ]} />

              <span className="mono-label orange reveal">Verified performance</span>
              <div className="hs-metric-grid tight reveal">
                <Metric value="5.1" unit="ms" label="Movement Stats" />
                <Metric value="4.1" unit="ms" label="HydroMetrics summary" />
                <Metric value="1.9" unit="ms" label="HydroMetrics chart" />
                <Metric value="23.5" unit="ms" label="PR History · partitioned" />
              </div>
              <p className="hs-callout reveal">
                <b>&lt; 25 ms</b> — every user-facing progress endpoint, at full production volume.
              </p>

              <div className="tags reveal" style={{ marginTop: 20 }}>
                {['NestJS', 'PostgreSQL', 'Partitioned tables', 'Composite indexes', 'CTEs', 'TypeORM', 'e2e tests'].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>

            <div className="hs-feature-visual">
              {/* Raw app screenshot for now — swap `src` for the polished progress-screen Figma
                  frames (Peter flagged this one): movement stats, PR history graph, HydroMetrics trend. */}
              <VisualSlot src="/hydrow/progress-dashboard.png" label="Progress screens — Figma" caption="Movement stats · PR history · HydroMetrics · weights-used chart" aspect="3 / 5" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FLAGSHIP 2 ============================ */}
      <section id="hs-f2" className="hs-section hs-feature flagship alt">
        <div className="wrap">
          <div className="hs-feature-grid reverse">
            <div className="hs-feature-visual">
              {/* Real badge-unlock celebration screen. Optionally add a small
                  fast-badge-check → Redis → background-reconciliation diagram alongside it later. */}
              <VisualSlot src="/hydrow/badge-celebration.png" label="Badge unlock celebration" caption="Real-time unlock the moment the qualifying workout finishes" aspect="3 / 5" />
            </div>

            <div className="hs-feature-body">
              <div className="hs-feature-head reveal">
                <span className="hs-fnum">02</span>
                <span className="hs-pill flag"><Trophy className="w-3.5 h-3.5" /> Owned the checker logic</span>
              </div>
              <h2 className="hs-h2 reveal">Gamification / Badge System</h2>
              <p className="hs-oneliner reveal">
                Built the badge-checking engine that awards achievements in real time as rowers
                complete workouts.
              </p>

              <span className="mono-label orange reveal">Ownership</span>
              <p className="hs-para reveal">
                Implemented 5+ badge checkers inside Hydrow’s achievement system, including the
                fast-badge-check paths and the Redis caching that makes them instant.
              </p>

              <span className="mono-label orange reveal">Why it matters</span>
              <p className="hs-para reveal">
                Badges are a core engagement and motivation loop. The hard requirement: a badge unlocks
                the moment a rower finishes the qualifying workout — not minutes later when background
                stats jobs catch up. Getting that instant feedback right is what makes the reward feel earned.
              </p>
              {/* TODO ⚠️ business metric: badge unlock counts, % of users earning ≥1 badge,
                  engagement/retention lift for badge earners. Pull from Amplitude, then add a tile. */}

              <span className="mono-label orange reveal">What I built</span>
              <BuiltList items={[
                { k: 'Strength in Numbers', v: 'training with N unique instructors, via a running instructor-ID set in badge_progress' },
                { k: 'Max Weight / Overdrive', v: 'detects maxing out the machine’s cable resistance' },
                { k: 'Variety Streak', v: 'multiple modalities (row / strength / on-the-mat) across consecutive weeks' },
                { k: 'X Workout Days', v: 'configurable N distinct days, with optional workout-type restriction for themed monthly challenges' },
                { k: 'Def-5 completion caching', v: 'Redis cache (1-hr TTL) so fast-badge-checks resolve before background processing finishes' },
                { k: 'Badge-definition schema API', v: 'a GET /schema endpoint that derives draft-07 JSON Schema straight from each checker’s Zod schema (toJSONSchema()), with x-entity metadata — so hyadmin renders a form for any of the 21 badge types with zero frontend changes' },
              ]} />

              <span className="mono-label orange reveal">Verified performance</span>
              <div className="hs-perfwin-row reveal">
                <PerfWin before="2,288 ms" after="Out of hot path" label="Variety-streak — enriched matview with modality columns" />
                <PerfWin before="1,646 ms" after="~0 ms" label="Max-weight — check current workout only, no history scan" />
              </div>
              <div className="hs-metric-grid tight reveal">
                <Metric value="31.9" unit="ms" label="Strength-in-Numbers · semi-join" />
                <Metric value="30.1" unit="ms" label="Overdrive · index + JSONB unnest" />
              </div>

              <div className="tags reveal" style={{ marginTop: 20 }}>
                {['NestJS', 'PostgreSQL matviews', 'Redis (TTL)', 'Zod'].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FEATURE 3 ============================ */}
      <section id="hs-f3" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">03</span>
            <span className="hs-pill"><Zap className="w-3.5 h-3.5" /> Favorite perf win</span>
          </div>
          <h2 className="hs-h2 reveal">Weights-Used Chart — SQL gap-filling</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            Replaced a main-thread JavaScript loop with a pure-SQL time-series query, taking graph
            data prep from event-loop-blocking to sub-millisecond.
          </p>

          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">Why it matters</span>
              <p className="hs-para reveal">
                Progress graphs need a continuous line even on days a rower didn’t train. The original
                approach filled those gaps with a synchronous JS loop that blocked Node’s event loop —
                so under concurrent load, one user’s graph prep could stall everyone else’s. Moving it
                into SQL keeps the whole API responsive.
              </p>
              <span className="mono-label orange reveal">What I built</span>
              <BuiltList items={[
                { k: 'Pure-SQL gap-filling', v: 'generate_series + COUNT(...) OVER to form gap groups, then MAX(...) OVER (PARTITION BY grp) to forward-fill' },
                { k: 'Parameterized grain', v: 'daily / weekly resolution in the same query' },
              ]} />
              <div className="hs-metric-grid tight reveal">
                <Metric value="0.724" unit="ms" label="Execution time" />
                <Metric value="80" unit="" label="Shared-buffer hits" />
                <Metric value="0" unit="" label="Main-thread blocking" />
              </div>
              <div className="tags reveal" style={{ marginTop: 18 }}>
                {['PostgreSQL', 'CTEs', 'generate_series', 'Window functions'].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div>
              {/* Real gap-filled chart cropped from the progress screen. A before/after
                  "JS loop vs. single SQL query" diagram could still be added alongside later. */}
              <VisualSlot src="/hydrow/weights-used-chart.png" label="Weights-used chart — gaps filled" caption="A continuous line even on days with no training — forward-filled in SQL" aspect="4 / 3" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FEATURE 4 ============================ */}
      <section id="hs-f4" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">04</span>
            <span className="hs-pill"><History className="w-3.5 h-3.5" /> Pagination & data at scale</span>
          </div>
          <h2 className="hs-h2 reveal">Workout History — reliable pagination & a data backfill</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            Served workout history reliably as it scrolls back over thousands of sessions — and repaired
            the historical data behind it. The win here is <b>correctness at scale</b>.
          </p>

          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">Why it matters</span>
              <p className="hs-para reveal">
                A rower can scroll their entire history and drill into any past workout’s stats — so both
                the scroll and the stored numbers have to stay correct. When a display bug had already
                written wrong values into months of history, the forward fix wasn’t enough; the past data
                had to be repaired too.
              </p>
              <span className="mono-label orange reveal">What I built</span>
              <BuiltList items={[
                { k: 'Cursor-based pagination', v: 'Redis-backed opaque cursors + a canonical filter-key so JSON key-order never triggers spurious resets — reliable infinite scroll for power users with thousands of workouts' },
                { k: 'ANALYZE after matview refresh', v: 'prevents stale planner stats from producing bad query plans (seq scans instead of index scans)' },
                { k: 'One-time backfill (DAPI-2303)', v: 'repaired historical workout-stats records whose sum-of-cables personal records showed the raw per-cable weight (e.g. 24.5 lb instead of 49) because weightDisplay was never stored in the serialized PR map' },
              ]} />
            </div>
            <div>
              <span className="mono-label orange reveal">The backfill, done right</span>
              <BuiltList items={[
                { k: 'A Node script, not SQL', v: 'the PRs are a serialized Map inside the prs JSONB column, so it reused the same Map/Set replacer/reviver as the app rather than a plain UPDATE' },
                { k: 'Cursor pagination over LIMIT/OFFSET', v: 'WHERE workout_id > last with LIMIT — one genuine page at a time instead of re-scanning to an offset' },
                { k: 'Movement lookup built once', v: 'every non-bodyweight movement loaded into an in-memory movementId → weightDisplay map up front, eliminating per-chunk queries' },
                { k: 'Reviewable dry-run', v: 'emits the exact UPDATE it would run; verified with a before/after JSONB-unwrap query joining each PR back to its movement' },
              ]} />
              {/* NOTE: ~123K is an in-thread estimate (approx), not independently profiled.
                  Update the value here if a verified workout_stats row count differs. */}
              <div className="hs-metric-grid tight reveal" style={{ marginTop: 14 }}>
                <Metric value="~123K" unit="" label="Historical records migrated" wide />
              </div>
              <p className="hs-callout reveal">
                Bounded by design — every workout after the fix release was already correct — so the job
                repaired the full set of affected historical records in a single efficient pass.
              </p>
              <VisualSlot src="/hydrow/workout-history.png" label="Workout history — cursor pagination" caption="Glitch-free infinite scroll over thousands of workouts" aspect="4 / 3" />
            </div>
          </div>
          <div className="tags reveal" style={{ marginTop: 18 }}>
            {['NestJS', 'PostgreSQL', 'JSONB', 'Redis (cursor state)', 'Node (.mts)'].map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      </section>

      {/* ============================ FEATURE 5 ============================ */}
      <section id="hs-f5" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">05</span>
            <span className="hs-pill"><ImageIcon className="w-3.5 h-3.5" /> Owned end-to-end + API design</span>
          </div>
          <h2 className="hs-h2 reveal">Interactive Login-Screen Banner System</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            Designed and built the full CRUD backend for the promotional banner images shown on
            Hydrow’s tablet login screen — from the OpenAPI spec down.
          </p>

          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">Why it matters</span>
              <p className="hs-para reveal">
                These banners are the first thing a rower sees before logging in — the surface for
                promoting programs, collections, and new content. The system has to schedule banners by
                effective date, serve the right one to unauthenticated tablets, and never leave orphaned
                images in storage.
              </p>
              {/* TODO ⚠️ business metric: pre-login banner impressions / daily views. Omit until real. */}
              <span className="mono-label orange reveal">What I built</span>
              <BuiltList items={[
                { k: 'OpenAPI spec first', v: 'defined every CRUD contract + GET /current (unauthenticated) + internal management APIs before writing code' },
                { k: 'Create API', v: 'multipart S3 upload with image + linked-entity validation, future-date enforcement, and S3 cleanup on DB-save failure (S3 first, roll back if the DB write fails)' },
                { k: 'Delete / List / Update / Get-Current', v: 'each with proper filtering and edge-case handling' },
                { k: 'Schema', v: 'banner_image with an application-generated string PK (needed before the S3 write), updated_at trigger, effective-date index' },
              ]} />
            </div>
            <div>
              <span className="mono-label orange reveal">The engineering story</span>
              <p className="hs-para reveal">
                A small, admin-managed dataset — so the story here is <b>API design and transactional
                correctness</b>, not query scale. The S3-then-DB ordering with rollback is what keeps
                storage clean when a write fails midway.
              </p>
              {/* TODO: Figma of the login-screen banner + a sequence diagram of the
                  S3-upload-then-DB-save-with-rollback flow. */}
              <VisualSlot label="Login-screen banner + S3→DB rollback sequence" caption="Transactional cleanup: upload to S3, roll back if the DB write fails" aspect="4 / 3" />
            </div>
          </div>
          <div className="tags reveal" style={{ marginTop: 18 }}>
            {['NestJS', 'AWS S3', 'PostgreSQL (triggers, migrations)', 'OpenAPI'].map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      </section>

      {/* ============================ FEATURE 6 ============================ */}
      <section id="hs-f6" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">06</span>
            <span className="hs-pill"><Scale className="w-3.5 h-3.5" /> Weight display & correctness</span>
          </div>
          <h2 className="hs-h2 reveal">Post-Workout Summary — sum-of-cables weight display</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            Made completed-workout data read correctly for barbell movements — the weights a rower
            actually sees the moment a session ends.
          </p>

          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">Why it matters</span>
              <p className="hs-para reveal">
                Hydrow’s cable machine reports per-cable weights internally, but a rower doing barbell
                movements expects the combined (doubled) weight on their summary. Getting that display
                right — and consistent across every screen that shows it — is what makes the numbers
                trustworthy. The win here is <b>display correctness</b>, not query scale.
              </p>
              <span className="mono-label orange reveal">What I built</span>
              <BuiltList items={[
                { k: 'weightDisplayMode across view models', v: 'added it to PersonalRecordVM and propagated it through the stats, PR-history, and post-workout summary APIs so barbell movements show combined weight' },
                { k: 'Order-of-operations rounding fix', v: 'Round(2·value) is correct; 2·Round(value) drifts — double first, then round. Tracked weightDisplay through every layer so it’s fetched and preserved across the call chain' },
                { k: 'New PR! surfacing', v: 'personal-record detection flags each movement’s PR on the completed-workout view' },
              ]} />
              <div className="tags reveal" style={{ marginTop: 18 }}>
                {['NestJS', 'TypeScript', 'PostgreSQL', 'ViewModels'].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="hs-feature-visual">
              <VisualSlot src="/hydrow/post-workout-summary.png" label="Post-workout summary — completion screen" caption="What a rower sees the moment a session ends" aspect="3 / 5" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FEATURE 7 ============================ */}
      <section id="hs-f7" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">07</span>
            <span className="hs-pill"><Filter className="w-3.5 h-3.5" /> Recommendation engine</span>
          </div>
          <h2 className="hs-h2 reveal">Strength Recommendation Engine — accessory & difficulty filtering</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            A 3-pass recommendation pipeline that only ever suggests workouts a rower can actually do —
            with the equipment they own, at a difficulty that fits.
          </p>

          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">Why it matters</span>
              <p className="hs-para reveal">
                A recommendation is worthless if it needs a bar the rower doesn’t have, or sits at the wrong
                difficulty. The engine has to respect owned equipment — including transitive ownership — and
                map each rower’s Svexa experience estimate to the right difficulty tier, then progressively
                relax those constraints so it never runs dry.
              </p>
              <span className="mono-label orange reveal">What I built</span>
              <BuiltList items={[
                { k: 'Progressive-relaxation pipeline', v: 'Pass 1 — unwatched at primary difficulty, oldest-first; Pass 2 — unwatched at the adjacent tier; Pass 3 — previously-watched, least-recently-completed' },
                { k: 'Accessory filter', v: 'a NOT EXISTS subquery excluding videos tagged with accessories the rower doesn’t own, with transitive ownership (bar → pigtails via requiresOneOf)' },
                { k: 'Difficulty filter', v: 'a second NOT EXISTS keyed on difficulty tags derived from the rower’s Svexa experience estimate' },
                { k: 'Smart-reco de-duplication', v: 'recently-done picks pushed to the bottom of the DoneThenRandom ordering so the same recommendation stops resurfacing' },
              ]} />
            </div>
            <div>
              <span className="mono-label orange reveal">The engineering story</span>
              <p className="hs-para reveal">
                The win here is expressing the whole eligibility model in SQL rather than post-filtering in
                JavaScript — the two NOT EXISTS clauses and tag-key joins do the equipment and difficulty
                gating in the database, so each pass returns a ready-to-serve candidate set. The same
                accessory logic was then reused to gate the workout-video library, so browsing only shows
                videos a rower has the gear for.
              </p>
              <div className="tags reveal" style={{ marginTop: 18 }}>
                {['NestJS', 'PostgreSQL', 'NOT EXISTS subqueries', 'Tag joins'].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FEATURE 8 ============================ */}
      <section id="hs-f8" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">08</span>
            <span className="hs-pill"><LayoutGrid className="w-3.5 h-3.5" /> Patterns at scale</span>
          </div>
          <h2 className="hs-h2 reveal">Home-screen tiles & a pluggable experiment framework</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            Built the tile managers behind the home screen and the A/B framework that decides which content
            each cohort sees — leaning on design patterns to keep it extensible.
          </p>

          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">Tiles — Template Method</span>
              <BuiltList items={[
                { k: 'AbstractPersonalRecordTileManager', v: 'a base class owning the shared query flow (status join, visibility filtering, pagination, ordering); subclasses implement three hooks — instance-key SQL, query filters, tile creation' },
                { k: 'HMI PR tile + Strength PR tile', v: 'both extend the same base, so a new PR tile type is a subclass, not a copy — the existing Strength tile was refactored onto it' },
                { k: 'Featured Program tile', v: 'collapsed a 3-pass JavaScript approach into a single SQL query with a LEFT JOIN grouped subquery; programs completed over six months ago recycle back in' },
              ]} />
            </div>
            <div>
              <span className="mono-label orange reveal">Experiments — Master/Leaf + fail-open</span>
              <BuiltList items={[
                { k: 'Promo tile master/leaf architecture', v: 'an enabled “master” tile resolves an A/B experiment to a disabled “leaf” tile holding the actual promo content — different cohorts see different promos' },
                { k: 'Cohort targeting', v: 'churn score + behavioral segment with most-specific-wins scoring (segment +2 > churn range +1 > catch-all 0)' },
                { k: 'Rower data model', v: 'added churn_score (numeric(4,3)) and behavioral_segment columns with a dual-auth update endpoint and a nullable-update DTO (absent = keep, null = clear, value = set), synced downstream to Iterable + SFDC' },
                { k: 'Fail-open on the critical path', v: 'experiment allocations exposed on the rower profile for Amplitude return an empty array on experiment-service errors rather than failing the profile request' },
              ]} />
              <div className="tags reveal" style={{ marginTop: 18 }}>
                {['NestJS', 'PostgreSQL', 'Zod', 'Iterable', 'SFDC', 'Amplitude'].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ FEATURE 9 ============================ */}
      <section id="hs-f9" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">09</span>
            <span className="hs-pill flag"><Bot className="w-3.5 h-3.5" /> AI-assisted engineering</span>
          </div>
          <h2 className="hs-h2 reveal">An AI-assisted development workflow that learns from every review</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 780 }}>
            Beyond shipping features, I built a structured Claude Code workflow around the team’s SDLC — a
            persistent knowledge system that turns every PR review into a rule the next ticket already knows.
          </p>

          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">The /start-jira-work flow</span>
              <BuiltList items={[
                { k: 'Plan (with me)', v: 'read the Jira ticket, load prior work, check for conflicts, propose a plan I approve before any code' },
                { k: 'Execute (autonomous)', v: 'branch → implement → write tests → build-check, with model routing — scaffold, tests, then core logic on the strongest model' },
                { k: 'Review (autonomous)', v: 'self-review against an accumulated NFR checklist, run e2e tests, fix within a bounded number of iterations' },
                { k: 'Present & record', v: 'summary + diff for my approval, then /submit-pr, then update the work log and review standards' },
              ]} />
            </div>
            <div>
              <span className="mono-label orange reveal">The persistent knowledge system</span>
              <BuiltList items={[
                { k: 'pr-review-standards.md', v: 'an NFR checklist grown from real reviewer feedback (e.g. “DB ops before external calls — fail fast”, “single SQL over multi-pass JS”) that the agent self-reviews against before every submit' },
                { k: 'work-log.md + issue summaries', v: 'a running index of completed tickets and per-ticket implementation notes, fed back in as context for future work' },
                { k: 'Custom slash commands', v: '/start-jira-work, /run-e2e, /submit-pr, /pr-feedback and /record-work automate the repetitive parts of the loop' },
                { k: 'The payoff', v: 'feedback from one PR becomes a standing rule — so the same mistake doesn’t come back on the next one' },
              ]} />
              <div className="tags reveal" style={{ marginTop: 18 }}>
                {['Claude Code', 'Custom skills', 'Jira', 'e2e tests', 'CI'].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ LEARNINGS ============================ */}
      <section className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">10</span>
            <span className="hs-pill">Learnings</span>
          </div>
          <h2 className="hs-h2 reveal">What I took away</h2>
          <div className="hs-learnings reveal">
            {[
              'SQL-first thinking',
              'Performance awareness',
              'Service boundaries',
              'Defensive coding',
              'Test depth',
              'AI as a force multiplier',
            ].map((t) => <span key={t} className="hs-learn">{t}</span>)}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="hs-footer">
        <div className="wrap hs-footer-inner">
          <button className="btn-outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" /> Back to portfolio
          </button>
          <a href="mailto:aggrawal.m@northeastern.edu" className="link-orange">
            Let’s talk <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default HydrowCaseStudy;
