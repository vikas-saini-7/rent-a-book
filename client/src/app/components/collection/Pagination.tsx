"use client";

import React, { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 21;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-border">
      {/* Page Info */}
      <p className="text-sm text-text-muted order-2 sm:order-1">
        Page {currentPage} of {totalPages}
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1 order-1 sm:order-2">
        {/* Previous */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md border border-border text-text-secondary hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-text-secondary transition-colors"
        >
          <IconChevronLeft size={18} />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-2 text-text-muted">...</span>
            ) : (
              <button
                onClick={() => goToPage(page as number)}
                className={`min-w-9 h-9 rounded-md text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "border border-border text-text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md border border-border text-text-secondary hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-text-secondary transition-colors"
        >
          <IconChevronRight size={18} />
        </button>
      </div>

      {/* Items per page */}
      <div className="flex items-center gap-2 order-3">
        <span className="text-sm text-text-muted">Show:</span>
        <select className="px-2 py-1 bg-bg-card border border-border rounded text-sm text-text-primary focus:outline-none focus:border-primary">
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
