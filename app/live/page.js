import FourierBackground from "../components/FourierBackground";
import LiveDashboard from "../components/LiveDashboard";

export const metadata = {
  title: "Live Data",
};

export default function LivePage() {
  return (
    <main className="page-shell">
      <section className="hero-band">
        <FourierBackground />
        <div className="hero">
          <div className="hero__copy">
            <p className="hero__kicker">Public queue. Public results. Same pinned regime.</p>
            <h1>Live Data</h1>
            <p className="hero__lede">
              Queue, frontier, and results.
            </p>
          </div>
          <div className="hero__visual">
            <div className="hero__visual-note">
              <span className="hero__visual-label">Reference regime</span>
              <p>Pinned workload. Shared scoring.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">Operator surface</p>
            <h2>Current queue and frontier</h2>
          </div>
          <p className="section-copy">Live machine state.</p>
        </div>
        <LiveDashboard />
      </section>
    </main>
  );
}
