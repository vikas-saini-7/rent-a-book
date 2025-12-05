import React from "react";
import BookCard from "./BookCard";
import SectionTitle from "./SectionTitle";

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: "₹50/week",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: "₹45/week",
  },
  { id: 3, title: "1984", author: "George Orwell", price: "₹40/week" },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: "₹35/week",
  },
];

const FeaturedBooks = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <SectionTitle>Featured Books</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedBooks;
