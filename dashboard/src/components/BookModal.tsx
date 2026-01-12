"use client";

import { useState, useEffect } from "react";
import { Book } from "@/services/book.service";

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookFormData) => Promise<void>;
  book?: Book | null;
  mode: "create" | "edit";
}

export interface BookFormData {
  title: string;
  authorName: string;
  genreName: string;
  isbn: string;
  description: string;
  coverImage: string;
  publisher: string;
  publishedYear: number;
  language: string;
  totalPages: number;
  rentalPricePerWeek: number;
  depositAmount: number;
  totalCopies: number;
  condition: string;
}

export default function BookModal({
  isOpen,
  onClose,
  onSubmit,
  book,
  mode,
}: BookModalProps) {
  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    authorName: "",
    genreName: "",
    isbn: "",
    description: "",
    coverImage: "",
    publisher: "",
    publishedYear: new Date().getFullYear(),
    language: "English",
    totalPages: 0,
    rentalPricePerWeek: 0,
    depositAmount: 0,
    totalCopies: 1,
    condition: "new",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (book && mode === "edit") {
      setFormData({
        title: book.title,
        authorName: book.author?.name || "",
        genreName: book.genre?.name || "",
        isbn: book.isbn || "",
        description: book.description || "",
        coverImage: book.coverImage || "",
        publisher: book.publisher || "",
        publishedYear: book.publishedYear || new Date().getFullYear(),
        language: book.language || "English",
        totalPages: book.totalPages || 0,
        rentalPricePerWeek: parseFloat(book.rentalPricePerWeek) || 0,
        depositAmount: parseFloat(book.depositAmount) || 0,
        totalCopies: book.libraryBooks?.[0]?.totalCopies || 1,
        condition: book.condition || "new",
      });
    } else {
      setFormData({
        title: "",
        authorName: "",
        genreName: "",
        isbn: "",
        description: "",
        coverImage: "",
        publisher: "",
        publishedYear: new Date().getFullYear(),
        language: "English",
        totalPages: 0,
        rentalPricePerWeek: 0,
        depositAmount: 0,
        totalCopies: 1,
        condition: "new",
      });
    }
    setError("");
  }, [book, mode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await onSubmit(formData);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "publishedYear" ||
        name === "totalPages" ||
        name === "rentalPricePerWeek" ||
        name === "depositAmount" ||
        name === "totalCopies"
          ? Number(value)
          : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-bg-card rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-bg-card border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-text-primary">
            {mode === "create" ? "Add New Book" : "Edit Book"}
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Genre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="genreName"
                value={formData.genreName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                ISBN
              </label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Publisher
              </label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Published Year
              </label>
              <input
                type="number"
                name="publishedYear"
                value={formData.publishedYear}
                onChange={handleChange}
                min="1000"
                max={new Date().getFullYear() + 1}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Language
              </label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Total Pages
              </label>
              <input
                type="number"
                name="totalPages"
                value={formData.totalPages}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Rental Price/Week (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="rentalPricePerWeek"
                value={formData.rentalPricePerWeek}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Deposit Amount (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="depositAmount"
                value={formData.depositAmount}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Total Copies <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="totalCopies"
                value={formData.totalCopies}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                Condition
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-primary mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-text-secondary hover:bg-bg-main transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-hover shadow-md shadow-primary/25 transition-all duration-200 disabled:opacity-50"
            >
              {loading
                ? mode === "create"
                  ? "Adding..."
                  : "Updating..."
                : mode === "create"
                ? "Add Book"
                : "Update Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
