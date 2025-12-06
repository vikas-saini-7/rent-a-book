"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import {
  IconArrowLeft,
  IconStar,
  IconHeart,
  IconShare2,
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
} from "@tabler/icons-react";

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

interface Library {
  id?: string;
  name?: string;
  city?: string;
  state?: string;
  addressLine1?: string;
  addressLine2?: string;
  phone?: string;
  email?: string;
  totalCopies?: number;
  availableCopies?: number;
  rentalPrice?: number;
}

interface BookDetails {
  id: string;
  title: string;
  slug: string;
  isbn: string;
  description: string;
  coverImage: string;
  publisher: string;
  publishedYear: number;
  language: string;
  totalPages: number;
  rentalPricePerWeek: number;
  depositAmount: number;
  condition: string;
  averageRating: number;
  totalRatings: number;
  totalRentals: number;
  author?: Author | string;
  genre?: Genre | string;
  libraries?: Library[];
}

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookSlug = params.bookSlug as string;

  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/books/${bookSlug}`);

        if (response.data.success) {
          setBook(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    if (bookSlug) {
      fetchBookDetails();
    }
  }, [bookSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-bg-card rounded w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="h-96 bg-bg-card rounded" />
              <div className="md:col-span-2 space-y-4">
                <div className="h-8 bg-bg-card rounded" />
                <div className="h-4 bg-bg-card rounded w-2/3" />
                <div className="h-4 bg-bg-card rounded w-1/2" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full flex items-center justify-center">
          <div className="text-center">
            <p className="text-text-secondary mb-4">
              {error || "Book not found"}
            </p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors"
            >
              Go Back
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getAuthorName = (): string => {
    if (typeof book.author === "string") return book.author;
    if (
      book.author &&
      typeof book.author === "object" &&
      "name" in book.author
    ) {
      return (book.author as any).name || "Unknown Author";
    }
    return "Unknown Author";
  };

  const getGenreName = (): string => {
    if (typeof book.genre === "string") return book.genre;
    if (book.genre && typeof book.genre === "object" && "name" in book.genre) {
      return (book.genre as any).name || "Unknown";
    }
    return "Unknown";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:text-primary-hover mb-6 transition-colors"
        >
          <IconArrowLeft size={20} />
          <span>Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <div className="sticky top-8 space-y-4">
              <div className="w-full aspect-3/4 bg-primary-light rounded-lg overflow-hidden border border-border">
                {book.coverImage ? (
                  <img
                    src="https://klacey.com/wp-content/uploads/Book-cover-illustration-service-by-freelance-illustrator-Kati-Lacey.webp"
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary-light to-primary-light/50">
                    <div className="text-center">
                      <div className="text-5xl text-primary/30">📚</div>
                      <p className="text-xs text-primary/20 mt-2">No Image</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded transition-colors ${
                    liked
                      ? "bg-error text-white"
                      : "border border-border text-text-secondary hover:border-error hover:text-error"
                  }`}
                >
                  <IconHeart
                    size={18}
                    className={liked ? "fill-current" : ""}
                  />
                  <span className="hidden sm:inline text-sm">
                    {liked ? "Liked" : "Like"}
                  </span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded text-text-secondary hover:border-primary hover:text-primary transition-colors">
                  <IconShare2 size={18} />
                  <span className="hidden sm:inline text-sm">Share</span>
                </button>
              </div>

              {/* Quick Info */}
              <div className="bg-bg-card border border-border rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-xs text-text-muted mb-1">Language</p>
                  <p className="text-sm text-text-primary font-medium">
                    {book.language}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Pages</p>
                  <p className="text-sm text-text-primary font-medium">
                    {book.totalPages}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">ISBN</p>
                  <p className="text-sm text-text-primary font-medium">
                    {book.isbn}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-3xl md:text-4xl font-heading text-text-primary">
                  {book.title}
                </h1>
              </div>

              <p className="text-lg text-text-muted mb-4">{getAuthorName()}</p>

              {/* Rating and Genre */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <IconStar
                          key={i}
                          size={16}
                          className={`${
                            i < Math.round(book.averageRating)
                              ? "fill-accent-secondary text-accent-secondary"
                              : "text-text-muted"
                          }`}
                        />
                      ))}
                  </div>
                  <span className="text-sm text-text-secondary">
                    {book.averageRating} ({book.totalRatings} reviews)
                  </span>
                </div>

                <div className="px-3 py-1 bg-primary-light text-primary text-xs rounded-full">
                  {getGenreName()}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold text-text-muted mb-2 uppercase">
                About
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {book.description}
              </p>
            </div>

            {/* Book Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-text-muted mb-1">Publisher</p>
                <p className="text-sm text-text-primary font-medium">
                  {book.publisher}
                </p>
              </div>
              <div className="bg-bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-text-muted mb-1">Published</p>
                <p className="text-sm text-text-primary font-medium">
                  {book.publishedYear}
                </p>
              </div>
              <div className="bg-bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-text-muted mb-1">
                  Rental Price/Week
                </p>
                <p className="text-sm text-primary font-semibold">
                  ₹{book.rentalPricePerWeek}
                </p>
              </div>
              <div className="bg-bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-text-muted mb-1">Deposit</p>
                <p className="text-sm text-text-primary font-medium">
                  ₹{book.depositAmount}
                </p>
              </div>
            </div>

            {/* Nearest Library Section */}
            {book.libraries && book.libraries.length > 0 ? (
              <div className="mt-8 pt-8 border-t border-border">
                <div className="bg-linear-to-br from-primary-light via-white to-accent-secondary-light rounded-xl border border-primary-light/50 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Header with Badge */}
                  <div className="bg-linear-to-r from-primary to-primary-hover px-6 py-4 text-white flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold opacity-90 tracking-wide">
                        NEAREST LIBRARY
                      </p>
                      <h3 className="text-xl font-bold mt-1">
                        {book.libraries[0].name}
                      </h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <IconMapPin size={24} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Location */}
                    <div className="flex gap-4">
                      <div className="shrink-0">
                        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary-light">
                          <IconMapPin size={20} className="text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-text-muted font-semibold mb-1">
                          Location
                        </p>
                        <p className="text-sm text-text-primary font-medium">
                          {book.libraries[0].addressLine1}
                        </p>
                        {book.libraries[0].addressLine2 && (
                          <p className="text-xs text-text-secondary">
                            {book.libraries[0].addressLine2}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-bg-card rounded-lg p-3 border border-border">
                        <p className="text-xs text-text-muted mb-1">
                          Available Copies
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {book.libraries[0].availableCopies || 0}
                        </p>
                      </div>
                      <div className="bg-bg-card rounded-lg p-3 border border-border">
                        <p className="text-xs text-text-muted mb-1">In Stock</p>
                        <p className="text-sm text-text-primary font-semibold">
                          {book.libraries[0].totalCopies || 0} copies
                        </p>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex gap-3 pt-2">
                      {book.libraries[0].phone && (
                        <a
                          href={`tel:${book.libraries[0].phone}`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-bg-card border border-border rounded-lg hover:border-primary hover:bg-primary-light transition-colors group"
                        >
                          <IconPhone
                            size={18}
                            className="text-primary group-hover:scale-110 transition-transform"
                          />
                          <span className="text-xs font-medium text-text-secondary group-hover:text-primary">
                            Call
                          </span>
                        </a>
                      )}
                      {book.libraries[0].email && (
                        <a
                          href={`mailto:${book.libraries[0].email}`}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-bg-card border border-border rounded-lg hover:border-primary hover:bg-primary-light transition-colors group"
                        >
                          <IconMail
                            size={18}
                            className="text-primary group-hover:scale-110 transition-transform"
                          />
                          <span className="text-xs font-medium text-text-secondary group-hover:text-primary">
                            Email
                          </span>
                        </a>
                      )}
                    </div>

                    {/* Rent Button */}
                    <button className="w-full px-6 py-3 bg-linear-to-r from-primary to-primary-hover text-white rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 active:scale-95">
                      Start Renting • ₹{book.rentalPricePerWeek}/week
                    </button>

                    {/* Additional Info */}
                    <p className="text-xs text-text-muted text-center pt-2">
                      Deposit required:{" "}
                      <span className="font-semibold text-text-secondary">
                        ₹{book.depositAmount}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 pt-8 border-t border-border">
                <div className="bg-bg-card border border-border rounded-lg p-8 text-center">
                  <p className="text-text-secondary mb-2">
                    📚 No libraries currently have this book
                  </p>
                  <p className="text-xs text-text-muted">
                    Check back soon or explore similar books
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
