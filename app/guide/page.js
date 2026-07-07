import Link from "next/link";

import FourierBackground from "../components/FourierBackground";
import { guideCards } from "../components/siteContent";

function GuideCard({ card }) {
  return (
    <article className="info-card info-card--feature">
      <p className="section-eyebrow">{card.eyebrow}</p>
      <h3>{card.title}</h3>
      <p>{card.body}</p>
    </article>
  );
}

export default function GuidePage() {
  return (
    <main className="page-shell">
      <section className="hero-band">
        <FourierBackground />
        <div className="hero">
          <div className="hero__copy">
            <p className="hero__kicker">For miners, contributors, and anyone trying to submit honest work.</p>
            <h1>Guide</h1>
            <p className="hero__lede">
              The shortest path to join CCO.
            </p>
          </div>
          <div className="hero__visual">
            <div className="hero__visual-note">
              <span className="hero__visual-label">Fastest truth</span>
              <p>Accuracy holds. Costs drop.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">Participation model</p>
            <h2>The shortest correct mental model</h2>
          </div>
          <p className="section-copy">Public OSS on SN74.</p>
        </div>
        <div className="feature-grid">
          {guideCards.map((card) => (
            <GuideCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">Reference loop</p>
            <h2>What you do before opening a PR</h2>
          </div>
          <p className="section-copy">CPU checks first. GPU proof next.</p>
        </div>
        <div className="callout-grid">
          <article className="callout-card">
            <h3>Fix / bug lane</h3>
            <p>For bugs, gaps, crashes, and docs.</p>
            <pre className="code-block"><code>{`uv sync --extra test
uv run python -m strategy.smoke
uv run --extra test python -m pytest tests/ strategy/tests/ eval/tests/ -v`}</code></pre>
          </article>

          <article className="callout-card">
            <h3>Feat / strategy lane</h3>
            <p>For transforms and measured gains.</p>
            <pre className="code-block"><code>{`uv sync --extra test --extra gpu
uv run python -m eval --n 12000 --pairs 3 --transforms mine --json
uv run python -m eval --transforms mine --rank-m 128 --sweep 512,1024,2048`}</code></pre>
          </article>
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">Reference regime</p>
            <h2>What the live arena is actually measuring</h2>
          </div>
          <p className="section-copy">Pinned baseline. Honest scoring.</p>
        </div>
        <div className="feature-grid">
          <article className="info-card">
            <h3>Exact baseline first</h3>
            <p>Exact defines the reference.</p>
          </article>
          <article className="info-card">
            <h3>Dominance gate</h3>
            <p>All cost axes must drop.</p>
          </article>
          <article className="info-card">
            <h3>Public PR workflow</h3>
            <p>PR, queue, replay.</p>
          </article>
        </div>
        <div className="section-actions">
          <a
            href="https://github.com/zeokin/Cuda-Compute-OSS/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noreferrer"
            className="button-link button-link--primary"
          >
            Open full contribution guide
          </a>
          <Link href="/resources" className="button-link">
            Browse docs and links
          </Link>
        </div>
      </section>
    </main>
  );
}
