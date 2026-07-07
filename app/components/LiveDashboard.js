"use client";

import { useEffect, useState } from "react";

import { getFeedUrls } from "../../lib/feeds";

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
            <th>FLOP ratio</th>
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
              <td>{row.label || "n/a"}</td>
              <td>{formatScore(row.accuracy)}</td>
              <td>{formatScore(row.latency_s)}</td>
              <td>{formatScore(row.peak_vram_mib)}</td>
              <td>{formatScore(row.flop_ratio)}</td>
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

function buildInitialState() {
  return {
    queueUrl: "",
    resultsUrl: "",
    queue: {},
    results: {},
    loading: true,
  };
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export default function LiveDashboard({ compact = false }) {
  const [state, setState] = useState(buildInitialState);

  useEffect(() => {
    let active = true;
    const { queueUrl, resultsUrl } = getFeedUrls();

    async function load() {
      const [queue, results] = await Promise.allSettled([
        fetchJson(queueUrl),
        fetchJson(resultsUrl),
      ]);

      if (!active) return;

      setState({
        queueUrl,
        resultsUrl,
        loading: false,
        queue:
          queue.status === "fulfilled"
            ? queue.value
            : { error: queue.reason instanceof Error ? queue.reason.message : "Unknown queue error" },
        results:
          results.status === "fulfilled"
            ? results.value
            : {
                error:
                  results.reason instanceof Error
                    ? results.reason.message
                    : "Unknown results error",
              },
      });
    }

    load();
    const interval = window.setInterval(load, 30000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const { queueUrl, resultsUrl, queue, results, loading } = state;
  const queueRows = Array.isArray(queue.queue) ? queue.queue : [];
  const openRows = Array.isArray(queue.open_prs) ? queue.open_prs : [];
  const resultRows = Array.isArray(results.prs) ? results.prs : [];
  const trackStatus = results.status?.tracks || {};
  const previewQueue = compact ? queueRows.slice(0, 5) : queueRows;
  const previewResults = compact ? resultRows.slice(0, 5) : resultRows;

  return (
    <div className="live-dashboard">
      <section className="status-strip" aria-label="CCO status overview">
        <SummaryCard
          label="Queue updated"
          value={loading ? "Loading..." : formatTimestamp(queue.updated)}
          tone="cool"
        />
        <SummaryCard
          label="Results updated"
          value={loading ? "Loading..." : formatTimestamp(results.updated)}
          tone="warm"
        />
        <SummaryCard label="Queued PRs" value={loading ? "..." : queueRows.length} />
        <SummaryCard label="Tracks live" value={loading ? "..." : Object.keys(trackStatus).length} />
        <SummaryCard label="Pinned GPU" value={loading ? "Loading..." : results.status?.gpu || "n/a"} />
        <SummaryCard label="Published evals" value={loading ? "..." : resultRows.length} />
      </section>

      <div className="feed-grid">
        <FeedStatus title="Queue feed" url={queueUrl || "Loading..."} error={queue.error} />
        <FeedStatus title="Results feed" url={resultsUrl || "Loading..."} error={results.error} />
      </div>

      <div className="content-grid">
        <section className="panel">
          <div className="panel__header">
            <h2>{compact ? "Queue preview" : "GPU Queue"}</h2>
            <span>{queue.gpu_policy?.cadence || (loading ? "Loading..." : "Cadence unavailable")}</span>
          </div>
          <QueueTable rows={previewQueue} />
        </section>

        <section className="panel">
          <div className="panel__header">
            <h2>{compact ? "Frontier" : "Track Frontier"}</h2>
            <span>{loading ? "Loading..." : `${Object.keys(trackStatus).length} tracks`}</span>
          </div>
          <FrontierList tracks={trackStatus} />
        </section>
      </div>

      {!compact ? (
        <div className="content-grid">
          <section className="panel">
            <div className="panel__header">
              <h2>Open PR Snapshot</h2>
              <span>{loading ? "Loading..." : `${openRows.length} tracked`}</span>
            </div>
            <QueueTable rows={openRows} />
          </section>

          <section className="panel">
            <div className="panel__header">
              <h2>Published Results</h2>
              <span>{loading ? "Loading..." : results.status?.gpu || "GPU not reported"}</span>
            </div>
            <ResultsTable rows={resultRows} />
          </section>
        </div>
      ) : (
        <section className="panel panel--single">
          <div className="panel__header">
            <h2>Recent published results</h2>
            <span>{loading ? "Loading..." : results.status?.gpu || "GPU not reported"}</span>
          </div>
          <ResultsTable rows={previewResults} />
        </section>
      )}
    </div>
  );
}
