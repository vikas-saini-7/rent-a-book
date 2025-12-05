"use client";

import React, { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

const genres = [
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Biography",
  "Self-Help",
  "History",
  "Children",
];

const languages = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi"];

const conditions = ["Like New", "Good", "Fair"];

const rentalPeriods = ["1 Week", "2 Weeks", "1 Month", "3 Months"];

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

const FiltersSidebar = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

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
          {genres.map((genre) => (
            <label
              key={genre}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() =>
                  toggleFilter(genre, selectedGenres, setSelectedGenres)
                }
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-text-secondary">{genre}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Language */}
      <FilterSection title="Language">
        <div className="space-y-2">
          {languages.map((language) => (
            <label
              key={language}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedLanguages.includes(language)}
                onChange={() =>
                  toggleFilter(
                    language,
                    selectedLanguages,
                    setSelectedLanguages
                  )
                }
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-text-secondary">{language}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Condition */}
      <FilterSection title="Book Condition">
        <div className="space-y-2">
          {conditions.map((condition) => (
            <label
              key={condition}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedConditions.includes(condition)}
                onChange={() =>
                  toggleFilter(
                    condition,
                    selectedConditions,
                    setSelectedConditions
                  )
                }
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-text-secondary">{condition}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rental Period */}
      <FilterSection title="Rental Period" defaultOpen={false}>
        <div className="space-y-2">
          {rentalPeriods.map((period) => (
            <label
              key={period}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="rental-period"
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm text-text-secondary">{period}</span>
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
