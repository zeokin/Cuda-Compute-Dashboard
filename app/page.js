import Link from "next/link";

import FourierBackground from "./components/FourierBackground";
import LiveDashboard from "./components/LiveDashboard";
import { audienceCards, resourceGroups, workflowSteps } from "./components/siteContent";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata = {
  title: "Overview",
};

function AudienceCard({ card }) {
  const body = (
    <article className="info-card info-card--feature">
      <p className="section-eyebrow">{card.eyebrow}</p>
      <h3>{card.title}</h3>
      <p>{card.body}</p>
      <span className="text-link">{card.cta}</span>
    </article>
  );

  if (card.external) {
    return (
      <a href={card.href} target="_blank" rel="noreferrer" className="card-link-wrap">
        {body}
      </a>
    );
  }

  return (
    <Link href={card.href} className="card-link-wrap">
      {body}
    </Link>
  );
}

function ImageCard({ eyebrow, title, body, src, alt }) {
  return (
    <article className="visual-card visual-card--image">
      <div className="visual-card__media">
        <img src={src} alt={alt} />
      </div>
      <p className="section-eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

export default function Page() {
  return (
    <main className="page-shell">
      <section className="hero-band">
        <FourierBackground />
        <div className="hero">
          <div className="hero__copy">
            <p className="hero__kicker">Pinned evaluation regime. Public participation. Deterministic scoring.</p>
            <h1>
              <span>C.C.O -</span>
              <span>Cheaper Faster</span>
              <span>GPU compute</span>
            </h1>
            <p className="hero__lede">
              Live data, guide, docs, and links for CCO.
            </p>
            <div className="hero__actions">
              <Link href="/live" className="button-link button-link--primary">
                Open live data
              </Link>
              <Link href="/guide" className="button-link">
                Read the guide
              </Link>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__visual-note">
              <span className="hero__visual-label">Network context</span>
              <p>Powered by SN74 - GitTensor.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">What CCO targets</p>
            <h2>GPU compute, LLM scale, measured gains</h2>
          </div>
          <p className="section-copy">Show it visually.</p>
        </div>
        <div className="visual-grid">
          <ImageCard
            eyebrow="GPU"
            title="Pinned hardware"
            body="Pinned hardware keeps runs honest."
            src={`${basePath}/visuals/chip.jpg`}
            alt="Close-up photo of an integrated circuit on a microchip"
          />
          <ImageCard
            eyebrow="LLM"
            title="Attention path"
            body="Attention drives the roadmap."
            src={`${basePath}/visuals/attention.png`}
            alt="Diagram of a multi-headed attention mechanism"
          />
          <ImageCard
            eyebrow="FFT"
            title="Spectral route"
            body="Transforms push past dense matmul."
            src={`${basePath}/visuals/fft.png`}
            alt="Butterfly diagram of a fast Fourier transform"
          />
        </div>
        <p className="asset-credit">
          Visual sources: chip photo by Jon Sullivan / PD Photo.org (public domain); attention
          diagram by dvgodoy (CC BY 4.0); FFT butterfly diagram by Yangwenbo99 (CC BY-SA 4.0).
        </p>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">Participants</p>
            <h2>For miners, contributors, and researchers</h2>
          </div>
          <p className="section-copy">Public participation across the CCO workflow.</p>
        </div>
        <div className="feature-grid">
          {audienceCards.map((card) => (
            <AudienceCard key={card.title} card={card} />
          ))}
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">How CCO works</p>
            <h2>Submit a strategy. Measure it honestly.</h2>
          </div>
          <p className="section-copy">Matmul now. Attention later.</p>
        </div>
        <div className="step-grid">
          {workflowSteps.map((item) => (
            <article key={item.step} className="info-card info-card--step">
              <span className="step-tag">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">Live reference state</p>
            <h2>Queue, frontier, and recent results</h2>
          </div>
          <p className="section-copy">Public queue and sealed results.</p>
        </div>
        <LiveDashboard compact />
        <div className="section-actions">
          <Link href="/live" className="button-link">
            View the full live dashboard
          </Link>
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">Related pages</p>
            <h2>Docs, landing pages, and repository surfaces</h2>
          </div>
          <p className="section-copy">Core docs, public pages, and repository surfaces.</p>
        </div>
        <div className="resource-stack">
          {resourceGroups.map((group) => (
            <section key={group.title} className="resource-group">
              <div className="resource-group__header">
                <h3>{group.title}</h3>
              </div>
              <div className="feature-grid feature-grid--resources">
                {group.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="card-link-wrap"
                  >
                    <article className="info-card">
                      <h4>{item.title}</h4>
                      <p>{item.body}</p>
                      <span className="text-link">Open resource</span>
                    </article>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
