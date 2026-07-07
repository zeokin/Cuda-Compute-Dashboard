import "./globals.css";

export const metadata = {
  title: "Cuda Compute Dashboard",
  description: "Private dashboard for the Cuda-Compute-OSS PR queue and evaluation results.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
