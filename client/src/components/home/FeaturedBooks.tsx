"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import SectionTitle from "./SectionTitle";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Book {
  id: string;
  title: string;
  slug?: string;
  author?: string | { name: string };
  authorName?: string;
  rentalPricePerWeek?: number;
}

const FeaturedBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/books/featured`);

        if (response.data.success && response.data.data) {
          setBooks(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching featured books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  const getAuthorName = (book: Book): string => {
    if (book.authorName) return book.authorName;
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

  const displayBooks =
    books.length > 0
      ? books
      : [
          {
            id: "1",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            rentalPricePerWeek: 50,
          },
          {
            id: "2",
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            rentalPricePerWeek: 45,
          },
          {
            id: "3",
            title: "1984",
            author: "George Orwell",
            rentalPricePerWeek: 40,
          },
          {
            id: "4",
            title: "Pride and Prejudice",
            author: "Jane Austen",
            rentalPricePerWeek: 35,
          },
        ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <SectionTitle>Featured Books</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayBooks.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={getAuthorName(book)}
            price={`₹${book.rentalPricePerWeek}/week`}
            slug={book.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedBooks;
