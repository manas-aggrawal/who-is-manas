import React, { useEffect, useRef } from 'react';
import {
  ArrowLeft, ArrowUpRight, Image as ImageIcon,
  Layers, Database, Boxes, ShieldCheck, KeyRound, MapPin, ClipboardCheck,
} from 'lucide-react';
import CaseStudyStyles from './CaseStudyStyles.jsx';

/* =================================================================== data ===
 * Source: "Care — Portfolio Contribution Summary".
 * Product is branded "Care". Status tags come straight from the doc.
 * Role honesty: care-api is built by me; app/admin/infra are my design &
 * technical direction, implemented by teammates.
 * ========================================================================== */

const overview = {
  role: 'Backend Owner · Technical Lead · Team Lead',
  program: 'CS7980 Research Capstone · Northeastern University · Partner: canAssist',
  period: 'through the Aug 2026 client handoff',
  client: 'Client: Jodie Gawryluk',
  stack: ['NestJS 11', 'Prisma 7', 'PostgreSQL + PostGIS', 'Zod / nestjs-zod', 'React Native / Expo', 'AWS Fargate', 'Terraform', 'OpenTelemetry'],
};

/* ============================================================== components ===*/

const VisualSlot = ({ src, alt, label, caption, aspect = '3 / 5', w }) => (
  <figure className="hs-visual reveal" style={w ? { maxWidth: w, marginInline: 'auto' } : undefined}>
    {src ? (
      <img src={src} alt={alt || label} className="hs-visual-img" loading="lazy" />
    ) : (
      <div className="hs-visual-ph" style={{ aspectRatio: aspect }}>
        <ImageIcon className="w-7 h-7" strokeWidth={1.5} />
        <span className="hs-visual-label">{label}</span>
        <span className="hs-visual-hint">Figma / diagram slot</span>
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

const STATUS_LABEL = { shipped: 'Shipped', dev: 'In Development', designed: 'Designed', upcoming: 'Upcoming' };
const Status = ({ s }) => <span className={`hs-status ${s}`}>{STATUS_LABEL[s]}</span>;

/* =================================================================== page ===*/

const CareNexusCaseStudy = ({ onBack, target = null }) => {
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
          <span className="hs-topbar-tag">Care · Deep Dive</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="hs-header">
        <div className="wrap">
          <span className="kicker reveal">Deep Dive — Product & Backend</span>
          <h1 className="hs-title reveal">Care<span className="ast"> +</span></h1>
          <p className="hs-lead reveal">
            A community-powered mobile platform helping families navigating dementia discover, share, and
            validate local support — resources and recurring groups in Victoria, BC. I owned the entire
            backend and drove architecture, API, and product design across three repos.
          </p>
          <div className="hs-meta reveal">
            <span>{overview.role}</span>
            <span className="hs-dot">·</span>
            <span>{overview.period}</span>
            <span className="hs-dot">·</span>
            <span>{overview.client}</span>
          </div>
          <p className="mono-sm dim reveal" style={{ marginTop: 10 }}>{overview.program}</p>
          <div className="tags reveal" style={{ marginTop: 18 }}>
            {overview.stack.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>

          <div className="reveal" style={{ marginTop: 26 }}>
            <span className="mono-label orange">Role & scope — what I owned vs. directed</span>
            <BuiltList items={[
              { k: 'Backend — owned end-to-end', v: 'designed and built the care-api service: data model, APIs, engineering conventions, and observability' },
              { k: 'Architecture, product & API design', v: 'drove the technical decisions across all three repos' },
              { k: 'Infrastructure direction', v: 'set the stack — ECS Fargate, Terraform-in-repo, CloudFront/S3, SES' },
              { k: 'Project, team & client lead', v: 'ran ceremonies and the backlog for a five-person team, and was primary client contact' },
            ]} />
          </div>
        </div>
      </header>

      {/* cn-f1 SYSTEM ARCHITECTURE */}
      <section id="cn-f1" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">01</span>
            <span className="hs-pill flag"><Layers className="w-3.5 h-3.5" /> Architecture — directed</span>
            <Status s="dev" />
          </div>
          <h2 className="hs-h2 reveal">System architecture — three repos</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            Owned the overall system architecture; built the API service and directed the two clients.
          </p>
          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">The three repositories</span>
              <BuiltList items={[
                { k: 'care-api — built by me', v: 'NestJS 11 + Prisma 7 + PostgreSQL/PostGIS on ECS Fargate; modular Terraform (network · rds · ecr · ecs · cloudfront · github-oidc-iam · bastion) lives in-repo' },
                { k: 'care-app — my direction', v: 'React Native / Expo mobile client, built by the mobile devs; consumes the API through the CloudFront edge' },
                { k: 'care-admin — my direction', v: 'Vite + React + TanStack Router moderation console — a web SPA served from S3, built by the admin dev' },
              ]} />
              <span className="mono-label orange reveal">Runtime topology</span>
              <BuiltList items={[
                { k: 'CloudFront edge', v: 'HTTPS termination; serves the admin SPA from a private S3 bucket (OAC), and routes /api/* to the ALB — a CloudFront function strips the prefix, and viewer headers/cookies are forwarded so the JWT + refresh cookie reach the API' },
                { k: 'ALB → ECS Fargate', v: 'public-subnet ALB forwards to stateless NestJS tasks by IP (awsvpc); global pipeline Throttler → JWT auth → Roles → controllers → response-envelope interceptor + exception filter' },
                { k: 'RDS PostgreSQL + PostGIS', v: 'private-subnet datastore; geospatial queries (ST_DWithin, distance ordering) via Prisma + raw SQL' },
                { k: 'Egress & observability', v: 'NAT Gateway for outbound-only calls to SES and geocoding; OTel SDK → Collector → Honeycomb, container stdout → CloudWatch' },
              ]} />
              <span className="mono-label orange reveal">Auth at the edge</span>
              <BuiltList items={[
                { k: 'User app', v: 'passwordless magic-link (email via SES) → short-lived access JWT + httpOnly refresh cookie' },
                { k: 'Admin client', v: 'email / password + TOTP MFA → admin JWT gated by RolesGuard (Role.ADMIN)' },
                { k: 'Closed by default', v: 'only /auth/* and /health are public; every other route requires a valid JWT' },
              ]} />
              <div className="tags reveal" style={{ marginTop: 4 }}>
                {['NestJS 11', 'CloudFront', 'ALB', 'ECS Fargate', 'RDS + PostGIS', 'Terraform'].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div>
              <VisualSlot src="/care/architecture-hld.svg" label="System architecture — CloudFront · ALB · ECS Fargate · RDS/PostGIS" caption="care-api (mine) · care-app (mobile) · care-admin (web)" aspect="900 / 660" />
            </div>
          </div>
        </div>
      </section>

      {/* cn-f2 DATA MODEL */}
      <section id="cn-f2" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">02</span>
            <span className="hs-pill"><Database className="w-3.5 h-3.5" /> Data model</span>
            <Status s="dev" />
          </div>
          <h2 className="hs-h2 reveal">Data model & schema design</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            The core schema I designed — Resources and Communities as separate tables with a shared response
            DTO, so the client gets one shape while the two content types stay distinct.
          </p>
          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">Two tables, one contract</span>
              <BuiltList items={[
                { k: 'resources', v: 'single-select category; owner; place_id + GEOGRAPHY(Point,4326) + address text; photo_keys; like/flag/save counts; verification_state; soft-delete' },
                { k: 'communities', v: 'multi-select categories; nullable location (online-only groups); free-text date_time + optional event_link; flag/save counts — no like_count, no verification; soft-delete' },
                { k: 'Shared response DTO', v: 'list / detail / map return one predictable shape — counts (likeCount resources-only, flagCount, saveCount) plus per-viewer state (viewerHasLiked / Flagged / Saved); individual flag reasons stay admin-only' },
              ]} />
              <span className="mono-label orange reveal">Polymorphic interactions & counters</span>
              <BuiltList items={[
                { k: 'likes', v: 'resources only; unique (user, resource)' },
                { k: 'saves / flags', v: 'both types; a CHECK enforces exactly one of resource_id / community_id (polymorphic XOR); unique per (user, target)' },
                { k: 'Denormalized counters', v: 'like/flag/save counts live on the parent rows so list/map/detail reads never aggregate — the interaction tables stay the source of truth for per-viewer state' },
              ]} />
              <span className="mono-label orange reveal">Constraints & indexes</span>
              <BuiltList items={[
                { k: 'GIST on location', v: 'hand-written raw SQL in the migration (guarded so generated migrations never drop it), powering nearest-first distance queries' },
                { k: 'GIN on communities.categories', v: 'efficient array / OR-match filtering' },
                { k: 'CHECK on communities', v: 'a row must have coordinates OR an event_link (online-only) — never neither' },
              ]} />
              <span className="mono-label orange reveal">Encoded in the schema</span>
              <p className="hs-para reveal">
                <b>Soft-delete everywhere</b> (<code>deleted_at</code>) — nothing is hard-deleted; removed items
                leave discovery but survive in owners’ Contributions and savers’ Saved (labeled “deleted”), so
                saved references never break. Per user, <b>like and flag are a toggle-pair</b> — liking clears an
                existing flag and vice-versa; <b>save</b> is independent.
              </p>
              <div className="tags reveal" style={{ marginTop: 4 }}>
                {['PostgreSQL', 'Prisma 7', 'PostGIS', 'GIN index', 'GIST index'].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div>
              <VisualSlot src="/care/schema-diagram.svg" label="Entity–relationship diagram" caption="users · resources · communities · likes / saves / flags" aspect="940 / 660" />
            </div>
          </div>
        </div>
      </section>

      {/* cn-f3 RESOURCES & COMMUNITIES */}
      <section id="cn-f3" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">03</span>
            <span className="hs-pill flag"><Boxes className="w-3.5 h-3.5" /> Core product</span>
            <Status s="dev" />
          </div>
          <h2 className="hs-h2 reveal">Resources & Communities</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            Two content types anchor the product — geolocated Resources, and recurring Communities that meet
            online or in person.
          </p>
          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">Resources</span>
              <BuiltList items={[
                { k: 'Full CRUD + ownership', v: 'any authenticated user can contribute a resource and becomes its owner' },
                { k: 'Interactions', v: 'like / save / flag (POST/DELETE), each returning updated counts + viewer state' },
                { k: 'Owner/admin soft-delete', v: 'row retained, drops from list/map, still visible as “deleted” in My-Contributions' },
              ]} />
              <span className="mono-label orange reveal">Communities</span>
              <BuiltList items={[
                { k: 'Not membership objects', v: 'recurring groups with meeting times, online or physical — no join, no likes; users save or flag, then attend in person or open the meeting link' },
                { k: 'Multi-category', v: 'a group can carry several tags' },
                { k: 'Plain-text schedule', v: 'free-form date_time and an optional event_link straight from the add-community form — no structured schedule entity' },
                { k: 'Same endpoints', v: 'browse, detail, submit, edit, owner/admin soft-delete — shared DTO minus likes and verification' },
              ]} />
            </div>
            <div>
              <VisualSlot src="/care/list-view.png" label="Community list" caption="Browse — nearest-first, save / flag inline" w="58%" />
            </div>
          </div>
        </div>
      </section>

      {/* cn-f4 VERIFICATION & TRUST */}
      <section id="cn-f4" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">04</span>
            <span className="hs-pill flag"><ShieldCheck className="w-3.5 h-3.5" /> Trust & moderation</span>
            <Status s="dev" />
          </div>
          <h2 className="hs-h2 reveal">Trust, verification & moderation</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            The trust model that governs what surfaces — balancing crowd contributions with admin oversight
            for a vulnerable user base.
          </p>
          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">What I designed</span>
              <BuiltList items={[
                { k: 'Resource verification tiers', v: 'UNVERIFIED → COMMUNITY_VERIFIED (crowd likes reach the threshold) → ADMIN_VERIFIED (staff action)' },
                { k: 'Communities stay distinct', v: 'no likes, no verification — admin oversight is soft-delete only' },
                { k: 'Flag → soft-delete', v: 'on both types once the flag threshold is crossed; items leave list/map but remain in the owner’s Contributions and savers’ Saved, labeled “deleted”' },
                { k: 'Documented precedence', v: 'soft-delete overrides verification' },
              ]} />
            </div>
            <div>
              <div className="hs-metric-grid tight reveal">
                <Metric value="3" unit="" label="Likes → Community Verified" />
                <Metric value="5" unit="" label="Flags → soft-delete" />
              </div>
              <div className="tags reveal" style={{ marginTop: 16 }}>
                {['NestJS', 'PostgreSQL', 'Moderation'].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* cn-f5 AUTH */}
      <section id="cn-f5" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">05</span>
            <span className="hs-pill"><KeyRound className="w-3.5 h-3.5" /> Auth & access</span>
            <Status s="dev" />
          </div>
          <h2 className="hs-h2 reveal">Authentication & access</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            Passwordless, app-wide-authenticated access with admin RBAC.
          </p>
          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">What I built</span>
              <BuiltList items={[
                { k: 'Passwordless magic-link', v: 'email login with JWT sessions; refresh tokens in httpOnly cookies, access tokens never logged' },
                { k: 'App-wide authentication', v: 'every endpoint requires a JWT except the login / magic-link routes — even browse and detail are authenticated' },
                { k: 'Admin auth + RBAC', v: 'admins sign in with email / password + TOTP MFA; @Roles(\'admin\') gates the /admin/* surface (soft-delete-only management of users, resources, communities)' },
              ]} />
              <div className="tags reveal" style={{ marginTop: 4 }}>
                {['JWT', 'AWS SES', 'RBAC', 'httpOnly cookies'].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div>
              <VisualSlot src="/care/passwordless-signin.png" label="Passwordless sign-in" caption="Magic-link login via SES" w="58%" />
            </div>
          </div>
        </div>
      </section>

      {/* cn-f6 GEOLOCATION */}
      <section id="cn-f6" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">06</span>
            <span className="hs-pill flag"><MapPin className="w-3.5 h-3.5" /> Geospatial</span>
            <Status s="dev" />
          </div>
          <h2 className="hs-h2 reveal">Geolocation & discovery</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            A shared geolocation layer with geocode-on-input and nearest-first pagination.
          </p>
          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">What I built</span>
              <BuiltList items={[
                { k: 'Three representations stored', v: 'place_id + geocoded GEOGRAPHY(Point,4326) coordinates + human-readable address text' },
                { k: 'Geocode on input', v: 'client geocodes the typed address (Places Autocomplete / map pick) and sends address + lat/lng + place_id; backend persists text + coordinates' },
                { k: 'Users see text, map shows pins', v: 'the raw geoloc numbers are never displayed' },
                { k: 'Nearest-first cursor pagination', v: 'distance ASC with an id tiebreaker (cursor keyed on distance + id), 20/page; newest-first fallback when location is absent; no user-facing sort toggle' },
              ]} />
              <div className="tags reveal" style={{ marginTop: 4 }}>
                {['PostGIS', 'Raw SQL', 'Cursor pagination', 'Google Places'].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div>
              <VisualSlot src="/care/map-view.png" label="Map view" caption="Nearest-first, distance-sorted pins" w="62%" />
            </div>
          </div>
        </div>
      </section>

      {/* cn-f7 NFR & OBSERVABILITY */}
      <section id="cn-f7" className="hs-section hs-feature">
        <div className="wrap">
          <div className="hs-feature-head reveal">
            <span className="hs-fnum">07</span>
            <span className="hs-pill"><ClipboardCheck className="w-3.5 h-3.5" /> Engineering standards</span>
            <Status s="shipped" />
          </div>
          <h2 className="hs-h2 reveal">NFR conventions & observability</h2>
          <p className="hs-oneliner reveal" style={{ maxWidth: 760 }}>
            The repo-wide standards I established — which later became the measurable NFR checklist for the
            MASE research.
          </p>
          <div className="hs-two-col">
            <div>
              <span className="mono-label orange reveal">Conventions I set</span>
              <BuiltList items={[
                { k: 'Uniform response envelope', v: '{ statusCode, message, data } via a global interceptor; handlers never hand-build responses; errors mirror the shape' },
                { k: 'Zod / nestjs-zod DTOs', v: 'single source of truth for validation and OpenAPI shape — no any, no untyped bodies' },
                { k: 'Thin controllers', v: 'no business logic or direct Prisma calls; centralized config (no process.env access); Prisma errors never leaked' },
                { k: 'Complete OpenAPI', v: '@ApiTags / @ApiOperation / @ApiResponse on every route' },
              ]} />
              <span className="mono-label orange reveal">Observability</span>
              <BuiltList items={[
                { k: 'OpenTelemetry + Honeycomb', v: 'spans on every public service method; telemetry wired and verified' },
                { k: 'No console.*', v: 'logging exclusively via NestJS Logger / otelLogger; failures logged, never silently swallowed' },
              ]} />
            </div>
            <div>
              <p className="hs-callout reveal">
                These conventions did double duty: they became the <b>machine-checkable NFR checklist</b> the
                MASE research study measures agent output against.
              </p>
              <VisualSlot src="/care/honeycomb-telemetry.png" label="Honeycomb — distributed tracing" caption="OTel spans on every public service method" />
              <div className="tags reveal" style={{ marginTop: 16 }}>
                {['NestJS', 'Zod', 'OpenTelemetry', 'Honeycomb', 'OpenAPI'].map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </div>
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

export default CareNexusCaseStudy;
