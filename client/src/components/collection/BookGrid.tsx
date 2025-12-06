"use client";
import React, { useState, useEffect } from "react";
import { IconHeart, IconStar } from "@tabler/icons-react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Author {
  id?: string;
  name?: string;
  imageUrl?: string;
}

interface Genre {
  id?: string;
  name?: string;
  slug?: string;
}

interface Book {
  id: string;
  title: string;
  author?: Author | string;
  authorName?: string;
  coverImage?: string;
  rentalPricePerWeek?: number;
  rating?: number;
  distance?: string;
  condition?: string;
  available?: boolean;
  genre?: Genre | string;
  averageRating?: number;
  totalCopies?: number;
  availableCopies?: number;
}

interface BookGridProps {
  filters?: {
    genres: string[];
    languages: string[];
    conditions: string[];
    priceRange: [number, number];
  };
  search?: string;
  sortBy?: string;
  location?: string;
  page?: number;
  limit?: number;
  loading?: boolean;
}

const defaultBooks: Book[] = [];

interface BookCardProps {
  id: string;
  title: string;
  authorName?: string;
  author?: string | Author;
  rentalPricePerWeek?: number;
  price?: string;
  rating?: number;
  distance?: string;
  condition?: string;
  available?: boolean;
  coverImage?: string;
  genre?: Genre | string;
}

const BookCard = ({
  title,
  authorName,
  author,
  rentalPricePerWeek,
  price,
  rating = 4.5,
  distance = "1.2 km",
  condition = "Good",
  available = true,
  coverImage,
  genre,
}: BookCardProps) => {
  // Handle author object or string
  const getAuthorName = (): string => {
    if (authorName) return authorName;
    if (typeof author === "string") return author;
    if (author && typeof author === "object" && "name" in author) {
      return (author as any).name || "Unknown Author";
    }
    return "Unknown Author";
  };

  // Handle genre object or string
  const getGenreName = (): string => {
    if (typeof genre === "string") return genre;
    if (genre && typeof genre === "object" && "name" in genre) {
      return (genre as any).name || "Unknown";
    }
    return "Unknown";
  };

  const displayAuthor = getAuthorName();
  const displayPrice =
    price || (rentalPricePerWeek ? `₹${rentalPricePerWeek}/week` : "N/A");
  const displayRating = rating || 4.5;
  const displayGenre = getGenreName();
  return (
    <div className="bg-bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative w-full h-48 bg-primary-light">
        {/* Placeholder Image */}
        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary-light to-primary-light/50">
          {coverImage ? (
            <img
              src="https://klacey.com/wp-content/uploads/Book-cover-illustration-service-by-freelance-illustrator-Kati-Lacey.webp"
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <div className="text-3xl text-primary/30">📚</div>
              <p className="text-xs text-primary/20 mt-1">No Image</p>
            </div>
          )}
        </div>
        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors">
          <IconHeart size={18} className="text-text-muted hover:text-error" />
        </button>
        {/* Availability Badge */}
        {!available && (
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-text-primary/80 text-white text-xs rounded">
            Currently Rented
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-text-primary line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <IconStar
              size={14}
              className="text-accent-secondary fill-accent-secondary"
            />
            <span className="text-sm text-text-secondary">{displayRating}</span>
          </div>
        </div>
        <p className="text-text-muted text-sm mb-2">{displayAuthor}</p>

        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 bg-primary-light text-primary text-xs rounded">
            {displayGenre}
          </span>
          <span className="text-xs text-text-muted">{distance} away</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-primary font-semibold">{displayPrice}</p>
          <button
            disabled={!available}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
              available
                ? "bg-primary text-white hover:bg-primary-hover"
                : "bg-border text-text-muted cursor-not-allowed"
            }`}
          >
            {available ? "Rent Now" : "Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
};

const BookGrid = ({
  filters,
  search,
  sortBy = "relevance",
  location,
  page = 1,
  limit = 12,
  loading = false,
}: BookGridProps) => {
  const [books, setBooks] = useState<Book[]>(defaultBooks);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);

        // Build query params
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (sortBy) params.append("sortBy", sortBy);
        if (location) params.append("location", location);
        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());

        // Add filters
        if (filters) {
          if (filters.genres.length > 0) {
            params.append("genre", filters.genres.join(","));
          }
          if (filters.languages.length > 0) {
            params.append("language", filters.languages.join(","));
          }
          if (filters.conditions.length > 0) {
            params.append("condition", filters.conditions.join(","));
          }
          if (filters.priceRange) {
            params.append("minPrice", filters.priceRange[0].toString());
            params.append("maxPrice", filters.priceRange[1].toString());
          }
        }

        const response = await axios.get(
          `${API_URL}/api/books?${params.toString()}`
        );

        if (response.data.success) {
          setBooks(response.data.data.books || []);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [filters, search, sortBy, location, page, limit]);

  if (loading || isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="bg-bg-card border border-border rounded-lg overflow-hidden animate-pulse"
            >
              <div className="w-full h-48 bg-bg-main" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-bg-main rounded w-3/4" />
                <div className="h-3 bg-bg-main rounded w-1/2" />
                <div className="h-3 bg-bg-main rounded w-full" />
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-12">
        <p className="text-text-muted mb-2">No books found</p>
        <p className="text-sm text-text-secondary">
          Try adjusting your filters or search terms
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </div>
  );
};

export default BookGrid;
