import { loadFeeds } from "../lib/feeds";

export const dynamic = "force-dynamic";

function formatTimestamp(value) {
  if (!value) return "n/a";
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatScore(value) {
  if (value === null || value === undefined) return "n/a";
  return typeof value === "number" ? value.toFixed(2) : String(value);
}

function formatLabel(value) {
  return value || "n/a";
}

function SummaryCard({ label, value, tone = "default" }) {
  return (
    <article className={`summary-card summary-card--${tone}`}>
      <p className="summary-label">{label}</p>
      <p className="summary-value">{value}</p>
    </article>
  );
}

function FeedStatus({ title, url, error }) {
  return (
    <section className="feed-card">
      <div className="feed-card__header">
        <h2>{title}</h2>
        <span className={`pill ${error ? "pill--bad" : "pill--good"}`}>
          {error ? "Feed error" : "Live"}
        </span>
      </div>
      <p className="feed-card__url">{url}</p>
      {error ? <p className="feed-card__error">{error}</p> : null}
    </section>
  );
}

function QueueTable({ rows }) {
  if (!rows.length) {
    return <div className="empty-state">No queued PRs right now.</div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>PR</th>
            <th>Author</th>
            <th>State</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.pr}-${row.head_sha}`}>
              <td>{row.position ?? "-"}</td>
              <td>
                <a href={row.url} target="_blank" rel="noreferrer">
                  #{row.pr}
                </a>
              </td>
              <td>{row.author}</td>
              <td>{row.state}</td>
              <td>{row.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResultsTable({ rows }) {
  if (!rows.length) {
    return <div className="empty-state">No published evaluation results yet.</div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>PR</th>
            <th>Track</th>
            <th>Label</th>
            <th>Accuracy</th>
            <th>Latency</th>
            <th>VRAM MiB</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.num}>
              <td>
                <a href={row.url} target="_blank" rel="noreferrer">
                  #{row.num}
                </a>
              </td>
              <td>{row.track}</td>
              <td>{formatLabel(row.label)}</td>
              <td>{formatScore(row.accuracy)}</td>
              <td>{formatScore(row.latency_s)}</td>
              <td>{formatScore(row.peak_vram_mib)}</td>
              <td>{formatScore(row.score)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FrontierList({ tracks }) {
  const entries = Object.entries(tracks || {});
  if (!entries.length) {
    return <div className="empty-state">No frontier data available.</div>;
  }

  return (
    <div className="frontier-grid">
      {entries.map(([name, info]) => (
        <article key={name} className="frontier-card">
          <div className="frontier-card__header">
            <h3>{name}</h3>
            <span>{formatScore(info.frontier_score)}</span>
          </div>
          <p>Accuracy floor: {formatScore(info.accuracy_floor)}</p>
        </article>
      ))}
    </div>
  );
}

export default async function Page() {
  const { queueUrl, resultsUrl, queue, results } = await loadFeeds();
  const queueRows = Array.isArray(queue.queue) ? queue.queue : [];
  const openRows = Array.isArray(queue.open_prs) ? queue.open_prs : [];
  const resultRows = Array.isArray(results.prs) ? results.prs : [];
  const trackStatus = results.status?.tracks || {};

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Private maintainer view</p>
          <h1>Cuda Compute OSS Dashboard</h1>
          <p className="hero__lede">
            Live queue and evaluation results pulled from the bot-managed state branch.
          </p>
        </div>
        <div className="hero__meta">
          <SummaryCard label="Queue updated" value={formatTimestamp(queue.updated)} tone="cool" />
          <SummaryCard
            label="Results updated"
            value={formatTimestamp(results.updated)}
            tone="warm"
          />
          <SummaryCard label="Queued PRs" value={queueRows.length} />
          <SummaryCard label="Published results" value={resultRows.length} />
        </div>
      </section>

      <section className="feed-grid">
        <FeedStatus title="Queue feed" url={queueUrl} error={queue.error} />
        <FeedStatus title="Results feed" url={resultsUrl} error={results.error} />
      </section>

      <section className="content-grid">
        <section className="panel">
          <div className="panel__header">
            <h2>GPU Queue</h2>
            <span>{queue.gpu_policy?.cadence || "Cadence unavailable"}</span>
          </div>
          <QueueTable rows={queueRows} />
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2>Open PR Snapshot</h2>
            <span>{openRows.length} tracked</span>
          </div>
          <QueueTable rows={openRows} />
        </section>
      </section>

      <section className="content-grid">
        <section className="panel">
          <div className="panel__header">
            <h2>Published Results</h2>
            <span>{results.status?.gpu || "GPU not reported"}</span>
          </div>
          <ResultsTable rows={resultRows} />
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2>Track Frontier</h2>
            <span>{Object.keys(trackStatus).length} tracks</span>
          </div>
          <FrontierList tracks={trackStatus} />
        </section>
      </section>
    </main>
  );
}
