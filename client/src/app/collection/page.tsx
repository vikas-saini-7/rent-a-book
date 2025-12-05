import { Suspense } from "react";
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
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Location Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading text-text-primary mb-4">
            Browse Collection
          </h1>
          <LocationInput />
        </div>

        {/* Top Filters */}
        <Suspense
          fallback={
            <div className="h-32 animate-pulse bg-bg-card rounded-lg" />
          }
        >
          <TopFilters />
        </Suspense>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <FiltersSidebar />
          </aside>

          {/* Books Grid */}
          <div className="flex-1">
            <BookGrid />
            <Pagination />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
