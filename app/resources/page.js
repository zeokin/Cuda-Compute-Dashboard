import FourierBackground from "../components/FourierBackground";
import { resourceGroups } from "../components/siteContent";

export const metadata = {
  title: "Resources",
};

export default function ResourcesPage() {
  return (
    <main className="page-shell">
      <section className="hero-band">
        <FourierBackground />
        <div className="hero">
          <div className="hero__copy">
            <p className="hero__kicker">Primary docs only. Public links only. No hidden context required.</p>
            <h1>Resources</h1>
            <p className="hero__lede">
              Short path to the core links.
            </p>
          </div>
          <div className="hero__visual">
            <div className="hero__visual-note">
              <span className="hero__visual-label">Source discipline</span>
              <p>Primary docs only.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">Documentation hub</p>
            <h2>Open the right page directly</h2>
          </div>
          <p className="section-copy">Open the right doc fast.</p>
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
