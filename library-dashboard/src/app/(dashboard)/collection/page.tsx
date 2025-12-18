"use client";

import { useState, useEffect } from "react";
import bookService, { Book } from "@/services/book.service";
import BookModal, { BookFormData } from "@/components/BookModal";

export default function InventoryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  useEffect(() => {
    fetchBooks();
  }, [page, search]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await bookService.getLibraryBooks(page, 10, search);
      setBooks(response.data.books);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch books");
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    fetchBooks();
  };

  const handleAddBook = () => {
    setSelectedBook(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDeleteBook = async (bookId: number) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await bookService.deleteBook(bookId);
      fetchBooks();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete book");
    }
  };

  const handleModalSubmit = async (data: BookFormData) => {
    if (modalMode === "create") {
      await bookService.createBook(data);
    } else if (selectedBook) {
      await bookService.updateBook(selectedBook.id, data);
    }
    fetchBooks();
  };

  return (
    <div className="space-y-4">
      <section className="border border-border rounded-2xl bg-bg-card p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Your Books
            </h2>
            <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-bg-main transition-all duration-200"
              >
                Search
              </button>
            </form>
          </div>
          <button
            onClick={handleAddBook}
            className="px-4 py-2 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-hover shadow-md shadow-primary/25 transition-all duration-200"
          >
            Add Book
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-text-muted">Loading...</div>
        ) : books.length === 0 ? (
          <div className="text-center py-8 text-text-muted">
            No books found. Add your first book to get started!
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-stone-200 to-stone-300/80 text-text-secondary">
                  <tr>
                    <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wide">
                      Title
                    </th>
                    <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wide">
                      Author
                    </th>
                    <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wide">
                      Genre
                    </th>
                    <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wide">
                      ISBN
                    </th>
                    <th className="px-5 py-3.5 text-right font-semibold text-xs uppercase tracking-wide">
                      Available
                    </th>
                    <th className="px-5 py-3.5 text-right font-semibold text-xs uppercase tracking-wide">
                      Total
                    </th>
                    <th className="px-5 py-3.5 text-right font-semibold text-xs uppercase tracking-wide">
                      Rental/Week
                    </th>
                    <th className="px-5 py-3.5 text-right font-semibold text-xs uppercase tracking-wide">
                      Deposit
                    </th>
                    <th className="px-5 py-3.5 text-center font-semibold text-xs uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {books.map((book) => {
                    const libraryBook = book.libraryBooks?.[0];
                    return (
                      <tr
                        key={book.id}
                        className="hover:bg-bg-main transition-colors duration-150"
                      >
                        <td className="px-5 py-4 font-semibold text-text-primary">
                          {book.title}
                        </td>
                        <td className="px-5 py-4 text-text-secondary">
                          {book.author?.name || "Unknown"}
                        </td>
                        <td className="px-5 py-4 text-text-secondary">
                          {book.genre?.name || "N/A"}
                        </td>
                        <td className="px-5 py-4 text-text-secondary font-mono text-xs">
                          {book.isbn || "N/A"}
                        </td>
                        <td className="px-5 py-4 text-right font-semibold text-green-600">
                          {libraryBook?.availableCopies || 0}
                        </td>
                        <td className="px-5 py-4 text-right text-text-secondary">
                          {libraryBook?.totalCopies || 0}
                        </td>
                        <td className="px-5 py-4 text-right text-text-secondary">
                          ₹{book.rentalPricePerWeek || "0"}
                        </td>
                        <td className="px-5 py-4 text-right text-text-secondary">
                          ₹{book.depositAmount || "0"}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEditBook(book)}
                              className="text-xs px-2 py-1 rounded border border-border text-text-secondary hover:bg-bg-main transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBook(book.id)}
                              className="text-xs px-2 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {!loading && books.length > 0 && totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-main transition-colors"
            >
              Previous
            </button>
            <span className="px-3 py-1.5 text-sm text-text-secondary">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-main transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </section>

      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        book={selectedBook}
        mode={modalMode}
      />
    </div>
  );
}
