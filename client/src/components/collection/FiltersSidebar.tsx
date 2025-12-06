"use client";

import React, { useState, useEffect } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface FilterOptions {
  genres: Array<{ id: string; name: string; slug: string }>;
  languages: Array<{ value: string; count: number }>;
  conditions: Array<{ value: string; count: number }>;
  priceRange: { min: number; max: number };
  rentalPeriods: Array<{ value: string; label: string }>;
}

const defaultFilterOptions: FilterOptions = {
  genres: [],
  languages: [],
  conditions: [],
  priceRange: { min: 0, max: 100 },
  rentalPeriods: [
    { value: "1_week", label: "1 Week" },
    { value: "2_weeks", label: "2 Weeks" },
    { value: "1_month", label: "1 Month" },
    { value: "3_months", label: "3 Months" },
  ],
};

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-text-primary font-medium"
      >
        {title}
        <IconChevronDown
          size={18}
          className={`text-text-muted transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

interface FiltersSidebarProps {
  onFilterChange: (filters: {
    genres: string[];
    languages: string[];
    conditions: string[];
    priceRange: [number, number];
  }) => void;
  loading?: boolean;
}

const FiltersSidebar = ({
  onFilterChange,
  loading = false,
}: FiltersSidebarProps) => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(defaultFilterOptions);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  // Fetch filter options from API
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setIsLoadingOptions(true);
        const response = await axios.get(
          `${API_URL}/api/books/filters-options`
        );
        if (response.data.success) {
          setFilterOptions(response.data.data);
          // Update price range with API data
          if (response.data.data.priceRange) {
            setPriceRange([
              response.data.data.priceRange.min,
              response.data.data.priceRange.max,
            ]);
          }
        }
      } catch (error) {
        console.error("Error fetching filter options:", error);
      } finally {
        setIsLoadingOptions(false);
      }
    };

    fetchFilterOptions();
  }, []);

  // Notify parent of filter changes
  useEffect(() => {
    onFilterChange({
      genres: selectedGenres,
      languages: selectedLanguages,
      conditions: selectedConditions,
      priceRange: [priceRange[0], priceRange[1]],
    });
  }, [
    selectedGenres,
    selectedLanguages,
    selectedConditions,
    priceRange,
    onFilterChange,
  ]);

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedGenres([]);
    setSelectedLanguages([]);
    setSelectedConditions([]);
    setPriceRange([0, 100]);
  };

  const hasActiveFilters =
    selectedGenres.length > 0 ||
    selectedLanguages.length > 0 ||
    selectedConditions.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 100;

  return (
    <div className="bg-bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text-primary">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection title="Price (per week)">
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            className="w-full accent-primary"
          />
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      {/* Genre */}
      <FilterSection title="Genre">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {isLoadingOptions ? (
            <div className="text-sm text-text-muted">Loading...</div>
          ) : (
            filterOptions.genres.map((genre) => (
              <label
                key={genre.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre.slug)}
                  onChange={() =>
                    toggleFilter(genre.slug, selectedGenres, setSelectedGenres)
                  }
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-text-secondary">
                  {genre.name}
                </span>
              </label>
            ))
          )}
        </div>
      </FilterSection>

      {/* Language */}
      <FilterSection title="Language">
        <div className="space-y-2">
          {filterOptions.languages.map((language) => (
            <label
              key={language.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedLanguages.includes(language.value)}
                onChange={() =>
                  toggleFilter(
                    language.value,
                    selectedLanguages,
                    setSelectedLanguages
                  )
                }
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-text-secondary">
                {language.value}
              </span>
              <span className="text-xs text-text-muted">
                ({language.count})
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Condition */}
      <FilterSection title="Book Condition">
        <div className="space-y-2">
          {filterOptions.conditions.map((condition) => (
            <label
              key={condition.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedConditions.includes(condition.value)}
                onChange={() =>
                  toggleFilter(
                    condition.value,
                    selectedConditions,
                    setSelectedConditions
                  )
                }
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-text-secondary capitalize">
                {condition.value.replace(/_/g, " ")}
              </span>
              <span className="text-xs text-text-muted">
                ({condition.count})
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rental Period */}
      <FilterSection title="Rental Period" defaultOpen={false}>
        <div className="space-y-2">
          {filterOptions.rentalPeriods.map((period) => (
            <label
              key={period.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="rental-period"
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-text-secondary">
                {period.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability" defaultOpen={false}>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 accent-primary" />
          <span className="text-sm text-text-secondary">Available Now</span>
        </label>
      </FilterSection>
    </div>
  );
};

export default FiltersSidebar;
