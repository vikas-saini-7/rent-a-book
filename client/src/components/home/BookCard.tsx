import React from "react";
import Link from "next/link";

interface BookCardProps {
  id: string | number;
  title: string;
  author: string;
  price: string;
  slug?: string;
  rentalPricePerWeek?: number;
}

const BookCard = ({ id, title, author, price, slug }: BookCardProps) => {
  const bookUrl = slug ? `/collection/${slug}` : "#";

  return (
    <Link href={bookUrl}>
      <div className="bg-bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer h-full">
        <div className="w-full h-40 bg-primary-light rounded-md mb-3 overflow-hidden">
          <img
            src="https://klacey.com/wp-content/uploads/Book-cover-illustration-service-by-freelance-illustrator-Kati-Lacey.webp"
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-text-primary line-clamp-2">
          {title}
        </h3>
        <p className="text-text-muted text-sm line-clamp-1">{author}</p>
        <p className="text-primary font-medium mt-2">{price}</p>
      </div>
    </Link>
  );
};

export default BookCard;
