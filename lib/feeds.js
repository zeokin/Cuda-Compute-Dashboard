const DEFAULT_QUEUE_URL =
  "https://raw.githubusercontent.com/zeokin/Cuda-Compute-OSS/bot/dashboard-state/dashboard/data.json";
const DEFAULT_RESULTS_URL =
  "https://raw.githubusercontent.com/zeokin/Cuda-Compute-OSS/bot/dashboard-state/dashboard/results.json";

export function getFeedUrls() {
  return {
    queueUrl: process.env.DASHBOARD_QUEUE_URL || DEFAULT_QUEUE_URL,
    resultsUrl: process.env.DASHBOARD_RESULTS_URL || DEFAULT_RESULTS_URL,
  };
}

async function fetchJson(url) {
  const response = await fetch(url, {
    next: { revalidate: 30 },
    headers: { accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function loadFeeds() {
  const { queueUrl, resultsUrl } = getFeedUrls();

  const [queue, results] = await Promise.allSettled([
    fetchJson(queueUrl),
    fetchJson(resultsUrl),
  ]);

  return {
    queueUrl,
    resultsUrl,
    queue:
      queue.status === "fulfilled"
        ? queue.value
        : { error: queue.reason instanceof Error ? queue.reason.message : "Unknown queue error" },
    results:
      results.status === "fulfilled"
        ? results.value
        : {
            error:
              results.reason instanceof Error ? results.reason.message : "Unknown results error",
          },
  };
}
