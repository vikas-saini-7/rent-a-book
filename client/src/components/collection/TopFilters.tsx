"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  IconSearch,
  IconAdjustmentsHorizontal,
  IconX,
} from "@tabler/icons-react";

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
  { value: "distance", label: "Nearest First" },
];

const quickFilters = [
  "Available Now",
  "Free Delivery",
  "Top Rated",
  "New Arrivals",
];

const TopFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlSearch = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [sortBy, setSortBy] = useState("relevance");
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);

  // Sync search query with URL when it changes
  useEffect(() => {
    const search = searchParams.get("search") || "";
    setSearchQuery(search);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    } else {
      params.delete("search");
    }
    router.push(`/collection?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`/collection?${params.toString()}`);
  };

  const toggleQuickFilter = (filter: string) => {
    if (activeQuickFilters.includes(filter)) {
      setActiveQuickFilters(activeQuickFilters.filter((f) => f !== filter));
    } else {
      setActiveQuickFilters([...activeQuickFilters, filter]);
    }
  };

  return (
    <div className="mb-6 space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative flex-1">
          <IconSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-bg-card border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
            >
              <IconX size={18} />
            </button>
          )}
        </form>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-muted whitespace-nowrap">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2.5 bg-bg-card border border-border rounded-md text-text-primary focus:outline-none focus:border-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile Filter Toggle */}
        <button className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-bg-card border border-border rounded-md text-text-primary">
          <IconAdjustmentsHorizontal size={20} />
          <span>Filters</span>
        </button>
      </div>

      {/* Active Search Tag */}
      {urlSearch && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-muted">Searching for:</span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-light text-primary rounded-full text-sm">
            {urlSearch}
            <button onClick={clearSearch} className="hover:text-primary-hover">
              <IconX size={14} />
            </button>
          </span>
        </div>
      )}

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter) => {
          const isActive = activeQuickFilters.includes(filter);
          return (
            <button
              key={filter}
              onClick={() => toggleQuickFilter(filter)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-bg-card border border-border text-text-secondary hover:border-primary hover:text-primary"
              }`}
            >
              {filter}
              {isActive && <IconX size={14} />}
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-text-secondary">
          Showing <span className="font-medium text-text-primary">1-12</span> of{" "}
          <span className="font-medium text-text-primary">248</span> books
          {urlSearch && (
            <span>
              {" "}
              for &quot;<span className="text-primary">{urlSearch}</span>&quot;
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default TopFilters;
