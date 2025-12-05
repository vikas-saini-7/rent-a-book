import React from "react";

interface BookCardProps {
  title: string;
  author: string;
  price: string;
}

const BookCard = ({ title, author, price }: BookCardProps) => {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="w-full h-40 bg-primary-light rounded-md mb-3"></div>
      <h3 className="font-semibold text-text-primary">{title}</h3>
      <p className="text-text-muted text-sm">{author}</p>
      <p className="text-primary font-medium mt-2">{price}</p>
    </div>
  );
};

export default BookCard;
