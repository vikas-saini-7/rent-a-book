"use client";

import React, { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);

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
        <div className="relative flex-1">
          <IconSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-bg-card border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
          />
        </div>

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
        </p>
      </div>
    </div>
  );
};

export default TopFilters;
