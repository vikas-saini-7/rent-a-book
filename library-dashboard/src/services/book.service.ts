import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Book {
  id: number;
  title: string;
  slug: string;
  isbn?: string;
  description?: string;
  coverImage?: string;
  publisher?: string;
  publishedYear?: number;
  language: string;
  totalPages?: number;
  rentalPricePerWeek: string;
  depositAmount: string;
  condition: string;
  averageRating: string;
  totalRatings: number;
  totalRentals: number;
  author: {
    id: number;
    name: string;
  };
  genre: {
    id: number;
    name: string;
  };
  libraryBooks?: Array<{
    totalCopies: number;
    availableCopies: number;
    isAvailable: boolean;
  }>;
}

export interface CreateBookData {
  title: string;
  authorName: string;
  genreName: string;
  isbn?: string;
  description?: string;
  coverImage?: string;
  publisher?: string;
  publishedYear?: number;
  language?: string;
  totalPages?: number;
  rentalPricePerWeek: number;
  depositAmount: number;
  condition?: string;
  totalCopies?: number;
}

export interface UpdateBookData {
  title?: string;
  authorName?: string;
  genreName?: string;
  isbn?: string;
  description?: string;
  coverImage?: string;
  publisher?: string;
  publishedYear?: number;
  language?: string;
  totalPages?: number;
  rentalPricePerWeek?: number;
  depositAmount?: number;
  condition?: string;
}

export interface UpdateStockData {
  totalCopies?: number;
  availableCopies?: number;
}

export interface BooksResponse {
  success: boolean;
  data: {
    books: Book[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

const bookService = {
  // Get all books in library inventory
  getLibraryBooks: async (
    page: number = 1,
    limit: number = 20,
    search?: string
  ): Promise<BooksResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) {
      params.append("search", search);
    }

    const { data } = await axios.get(
      `${API_URL}/api/library/books?${params.toString()}`,
      {
        withCredentials: true,
      }
    );
    return data;
  },

  // Create a new book
  createBook: async (bookData: CreateBookData) => {
    const { data } = await axios.post(
      `${API_URL}/api/library/books/create`,
      bookData,
      {
        withCredentials: true,
      }
    );
    return data;
  },

  // Update book details
  updateBook: async (bookId: number, updateData: UpdateBookData) => {
    const { data } = await axios.put(
      `${API_URL}/api/library/books/${bookId}`,
      updateData,
      {
        withCredentials: true,
      }
    );
    return data;
  },

  // Delete book
  deleteBook: async (bookId: number) => {
    const { data } = await axios.delete(
      `${API_URL}/api/library/books/${bookId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  },

  // Add existing book to library
  addBookToLibrary: async (bookId: number, totalCopies: number = 1) => {
    const { data } = await axios.post(
      `${API_URL}/api/library/books/add`,
      { bookId, totalCopies },
      {
        withCredentials: true,
      }
    );
    return data;
  },

  // Update book stock
  updateBookStock: async (bookId: number, stockData: UpdateStockData) => {
    const { data } = await axios.patch(
      `${API_URL}/api/library/books/${bookId}/stock`,
      stockData,
      {
        withCredentials: true,
      }
    );
    return data;
  },

  // Remove book from library
  removeBookFromLibrary: async (bookId: number) => {
    const { data } = await axios.delete(
      `${API_URL}/api/library/books/${bookId}/remove`,
      {
        withCredentials: true,
      }
    );
    return data;
  },
};

export default bookService;
