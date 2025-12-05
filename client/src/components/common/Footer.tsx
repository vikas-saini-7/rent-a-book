import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-bg-card">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="text-xl font-heading text-primary font-semibold"
          >
            RentABook
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/"
              className="text-text-muted hover:text-primary transition-colors text-sm"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-text-muted hover:text-primary transition-colors text-sm"
            >
              About
            </Link>
            <Link
              href="/collection"
              className="text-text-muted hover:text-primary transition-colors text-sm"
            >
              Collection
            </Link>
            <Link
              href="/faq"
              className="text-text-muted hover:text-primary transition-colors text-sm"
            >
              FAQ
            </Link>
            <Link
              href="/privacy"
              className="text-text-muted hover:text-primary transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-text-muted hover:text-primary transition-colors text-sm"
            >
              Terms & Conditions
            </Link>
          </nav>
          <p className="text-text-muted text-sm">
            © 2025 RentABook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
