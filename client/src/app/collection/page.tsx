"use client";

import { Suspense, useState, useCallback } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import {
  LocationInput,
  FiltersSidebar,
  TopFilters,
  BookGrid,
  Pagination,
} from "../../components/collection";

export default function CollectionPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({
    genres: [] as string[],
    languages: [] as string[],
    conditions: [] as string[],
    priceRange: [0, 100] as [number, number],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = useCallback(
    (newFilters: {
      genres: string[];
      languages: string[];
      conditions: string[];
      priceRange: [number, number];
    }) => {
      setFilters(newFilters);
      setCurrentPage(1); // Reset to first page when filters change
    },
    []
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search changes
  }, []);

  const handleSortChange = useCallback((newSort: string) => {
    setSortBy(newSort);
    setCurrentPage(1); // Reset to first page when sort changes
  }, []);

  const handleLocationChange = useCallback((newLocation: string) => {
    setLocation(newLocation);
    setCurrentPage(1); // Reset to first page when location changes
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Location Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading text-text-primary mb-4">
            Browse Collection
          </h1>
          <LocationInput
            onLocationChange={handleLocationChange}
            initialLocation={location}
          />
        </div>

        {/* Top Filters */}
        <Suspense
          fallback={
            <div className="h-32 animate-pulse bg-bg-card rounded-lg" />
          }
        >
          <TopFilters
            onSearch={handleSearch}
            onSortChange={handleSortChange}
            totalBooks={totalBooks}
            currentSearch={searchQuery}
          />
        </Suspense>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <FiltersSidebar
              onFilterChange={handleFilterChange}
              loading={isLoading}
            />
          </aside>

          {/* Books Grid */}
          <div className="flex-1">
            <BookGrid
              filters={filters}
              search={searchQuery}
              sortBy={sortBy}
              location={location}
              page={currentPage}
              limit={12}
              loading={isLoading}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalBooks={totalBooks}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
