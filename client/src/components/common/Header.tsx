import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full border-b border-border bg-bg-card">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo & Nav */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-2xl font-heading text-primary font-semibold"
          >
            RentABook
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/collection"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              Collection
            </Link>
            <Link
              href="/contact"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/about"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-text-secondary hover:text-primary transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </button>
          <Link
            href="/login"
            className="text-text-secondary hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
