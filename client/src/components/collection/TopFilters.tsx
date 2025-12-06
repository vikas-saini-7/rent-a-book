"use client";

import React, { useState, useEffect } from "react";
import {
  IconSearch,
  IconAdjustmentsHorizontal,
  IconX,
} from "@tabler/icons-react";

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "new_arrivals", label: "Newest First" },
  { value: "top_rated", label: "Highest Rated" },
  { value: "distance", label: "Nearest First" },
];

const quickFilters = [
  { value: "available_now", label: "Available Now" },
  { value: "free_delivery", label: "Free Delivery" },
  { value: "top_rated", label: "Top Rated" },
  { value: "new_arrivals", label: "New Arrivals" },
];

interface TopFiltersProps {
  onSearch?: (query: string) => void;
  onSortChange?: (sortBy: string) => void;
  currentSearch?: string;
}

const TopFilters = ({
  onSearch,
  onSortChange,
  currentSearch = "",
}: TopFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [sortBy, setSortBy] = useState("relevance");
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);

  useEffect(() => {
    setSearchQuery(currentSearch);
  }, [currentSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery.trim());
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch?.("");
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    onSortChange?.(newSort);
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
            onChange={(e) => handleSortChange(e.target.value)}
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
      {currentSearch && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-muted">Searching for:</span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-light text-primary rounded-full text-sm">
            {currentSearch}
            <button onClick={clearSearch} className="hover:text-primary-hover">
              <IconX size={14} />
            </button>
          </span>
        </div>
      )}

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter) => {
          const isActive = activeQuickFilters.includes(filter.value);
          return (
            <button
              key={filter.value}
              onClick={() => toggleQuickFilter(filter.value)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-bg-card border border-border text-text-secondary hover:border-primary hover:text-primary"
              }`}
            >
              {filter.label}
              {isActive && <IconX size={14} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopFilters;
