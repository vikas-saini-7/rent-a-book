"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IconUser,
  IconSettings,
  IconBook,
  IconHeart,
  IconHistory,
  IconLogout,
  IconChevronDown,
  IconX,
  IconArrowRight,
  IconWallet,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const recentSearches = ["The Great Gatsby", "Harry Potter", "Fiction books"];
const popularBooks = [
  { title: "Atomic Habits", author: "James Clear" },
  { title: "The Alchemist", author: "Paulo Coelho" },
  { title: "Sapiens", author: "Yuval Noah Harari" },
];

const Header = () => {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const cartItemCount = getTotalItems();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle escape key to close search
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/collection?search=${encodeURIComponent(searchQuery.trim())}`
      );
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleQuickSearch = (query: string) => {
    router.push(`/collection?search=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const handleLogout = async () => {
    await logout();
    setIsProfileOpen(false);
    router.push("/");
  };

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
              href="/about"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-text-secondary hover:text-primary transition-colors"
            >
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

            {/* Search Modal/Dropdown */}
            {isSearchOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black/20 z-40"
                  onClick={() => setIsSearchOpen(false)}
                />

                {/* Search Panel */}
                <div className="fixed top-0 left-0 right-0 bg-bg-card border-b border-border shadow-lg z-50 animate-in slide-in-from-top duration-200">
                  <div className="max-w-3xl mx-auto px-6 py-4">
                    {/* Search Input */}
                    <form onSubmit={handleSearch} className="relative">
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </svg>
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search books, authors, genres..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-12 py-3 bg-bg-main border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary text-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                      >
                        <IconX size={20} />
                      </button>
                    </form>

                    {/* Search Content */}
                    <div className="mt-4 pb-2">
                      {searchQuery ? (
                        /* Search Results Preview */
                        <div>
                          <button
                            onClick={() =>
                              handleSearch({
                                preventDefault: () => {},
                              } as React.FormEvent)
                            }
                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-bg-main transition-colors group"
                          >
                            <span className="text-text-primary">
                              Search for &quot;
                              <span className="text-primary font-medium">
                                {searchQuery}
                              </span>
                              &quot;
                            </span>
                            <IconArrowRight
                              size={18}
                              className="text-text-muted group-hover:text-primary transition-colors"
                            />
                          </button>
                        </div>
                      ) : (
                        /* Recent & Popular */
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Recent Searches */}
                          <div>
                            <p className="text-sm text-text-muted mb-2 px-1">
                              Recent Searches
                            </p>
                            <div className="space-y-1">
                              {recentSearches.map((search, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleQuickSearch(search)}
                                  className="w-full flex items-center gap-3 p-2 rounded-lg text-text-secondary hover:bg-bg-main hover:text-primary transition-colors text-left"
                                >
                                  <IconHistory size={16} className="shrink-0" />
                                  <span>{search}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Popular Books */}
                          <div>
                            <p className="text-sm text-text-muted mb-2 px-1">
                              Popular Books
                            </p>
                            <div className="space-y-1">
                              {popularBooks.map((book, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleQuickSearch(book.title)}
                                  className="w-full flex items-center gap-3 p-2 rounded-lg text-text-secondary hover:bg-bg-main hover:text-primary transition-colors text-left"
                                >
                                  <IconBook size={16} className="shrink-0" />
                                  <div>
                                    <span className="block">{book.title}</span>
                                    <span className="text-xs text-text-muted">
                                      {book.author}
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Keyboard Hint */}
                    <div className="flex items-center justify-center gap-4 pt-3 border-t border-border text-xs text-text-muted">
                      <span>
                        <kbd className="px-1.5 py-0.5 bg-bg-main rounded">
                          Enter
                        </kbd>{" "}
                        to search
                      </span>
                      <span>
                        <kbd className="px-1.5 py-0.5 bg-bg-main rounded">
                          Esc
                        </kbd>{" "}
                        to close
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Cart Icon */}
          {isAuthenticated && (
            <Link
              href="/cart"
              className="relative p-2 text-text-secondary hover:text-primary transition-colors"
            >
              <IconShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          )}

          {isAuthenticated ? (
            /* Profile Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-bg-main transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <IconUser size={18} className="text-primary" />
                  )}
                </div>
                <IconChevronDown
                  size={16}
                  className={`text-text-muted transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-bg-card border border-border rounded-lg shadow-lg py-2 z-50">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-border">
                    <p className="font-medium text-text-primary">
                      {user?.fullName || "User"}
                    </p>
                    <p className="text-sm text-text-muted">{user?.email}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-text-secondary hover:bg-bg-main hover:text-primary transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <IconUser size={18} />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/deposit"
                      className="flex items-center gap-3 px-4 py-2 text-text-secondary hover:bg-bg-main hover:text-primary transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <IconWallet size={18} />
                      <span>Deposit</span>
                    </Link>
                    <Link
                      href="/rentals"
                      className="flex items-center gap-3 px-4 py-2 text-text-secondary hover:bg-bg-main hover:text-primary transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <IconBook size={18} />
                      <span>Track Rentals</span>
                    </Link>
                    <Link
                      href="/history"
                      className="flex items-center gap-3 px-4 py-2 text-text-secondary hover:bg-bg-main hover:text-primary transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <IconHistory size={18} />
                      <span>Rental History</span>
                    </Link>
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-3 px-4 py-2 text-text-secondary hover:bg-bg-main hover:text-primary transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <IconHeart size={18} />
                      <span>Wishlist</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-2 text-text-secondary hover:bg-bg-main hover:text-primary transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <IconSettings size={18} />
                      <span>Settings</span>
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-border pt-1">
                    <button
                      className="flex items-center gap-3 px-4 py-2 w-full text-error hover:bg-bg-main transition-colors"
                      onClick={handleLogout}
                    >
                      <IconLogout size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
