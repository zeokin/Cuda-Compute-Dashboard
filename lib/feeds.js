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
