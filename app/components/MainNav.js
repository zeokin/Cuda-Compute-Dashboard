"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "./siteContent";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function MainNav() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link href="/" className="site-brand">
        <span className="site-brand__mark" aria-hidden="true">
          <img src={`${basePath}/icon.svg`} alt="" />
        </span>
        <span className="site-brand__text">
          <strong>C.C.O</strong>
          <small>Open arena for cheaper GPU compute</small>
        </span>
      </Link>

      <nav className="site-nav" aria-label="Primary">
        {navLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`site-nav__link ${active ? "site-nav__link--active" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
