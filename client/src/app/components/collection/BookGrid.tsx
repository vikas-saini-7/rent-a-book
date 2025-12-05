import React from "react";
import { IconHeart, IconStar } from "@tabler/icons-react";

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: "₹50/week",
    rating: 4.5,
    distance: "1.2 km",
    condition: "Like New",
    available: true,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: "₹45/week",
    rating: 4.8,
    distance: "2.5 km",
    condition: "Good",
    available: true,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    price: "₹40/week",
    rating: 4.7,
    distance: "3.1 km",
    condition: "Like New",
    available: false,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: "₹35/week",
    rating: 4.6,
    distance: "0.8 km",
    condition: "Good",
    available: true,
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: "₹42/week",
    rating: 4.3,
    distance: "1.5 km",
    condition: "Fair",
    available: true,
  },
  {
    id: 6,
    title: "Lord of the Flies",
    author: "William Golding",
    price: "₹38/week",
    rating: 4.4,
    distance: "2.0 km",
    condition: "Good",
    available: true,
  },
  {
    id: 7,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: "₹55/week",
    rating: 4.9,
    distance: "4.2 km",
    condition: "Like New",
    available: true,
  },
  {
    id: 8,
    title: "Brave New World",
    author: "Aldous Huxley",
    price: "₹40/week",
    rating: 4.5,
    distance: "1.8 km",
    condition: "Good",
    available: false,
  },
  {
    id: 9,
    title: "Animal Farm",
    author: "George Orwell",
    price: "₹30/week",
    rating: 4.6,
    distance: "0.5 km",
    condition: "Like New",
    available: true,
  },
];

interface BookCardProps {
  title: string;
  author: string;
  price: string;
  rating: number;
  distance: string;
  condition: string;
  available: boolean;
}

const BookCard = ({
  title,
  author,
  price,
  rating,
  distance,
  condition,
  available,
}: BookCardProps) => {
  return (
    <div className="bg-bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="relative w-full h-48 bg-primary-light">
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
            <span className="text-sm text-text-secondary">{rating}</span>
          </div>
        </div>
        <p className="text-text-muted text-sm mb-2">{author}</p>

        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 bg-primary-light text-primary text-xs rounded">
            {condition}
          </span>
          <span className="text-xs text-text-muted">{distance} away</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-primary font-semibold">{price}</p>
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

const BookGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} {...book} />
      ))}
    </div>
  );
};

export default BookGrid;
