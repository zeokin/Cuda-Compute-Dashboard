import "./globals.css";
import MainNav from "./components/MainNav";
import ImpulseField from "./components/ImpulseField";
import { footerLinks } from "./components/siteContent";

export const metadata = {
  title: {
    default: "CCO Dashboard",
    template: "%s | CCO Dashboard",
  },
  description: "Public dashboard, guide, and resource hub for Cuda-Compute-OSS live data and participation.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ImpulseField />
        <div className="site-frame">
          <MainNav />
          {children}
          <footer className="site-footer">
            <div>
              <p className="site-footer__brand">CCO Dashboard</p>
              <p className="site-footer__copy">
                Public-facing dashboard, guide, and resource hub for Cuda-Compute-OSS and its
                SN74 context.
              </p>
            </div>
            <div className="site-footer__links">
              {footerLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
