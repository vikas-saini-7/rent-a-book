import React from "react";
import BookCardSkeleton from "./BookCardSkeleton";

interface BookGridSkeletonProps {
  count?: number;
}

const BookGridSkeleton: React.FC<BookGridSkeletonProps> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default BookGridSkeleton;
