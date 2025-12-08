import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { IconHeart, IconStar, IconTrash } from "@tabler/icons-react";

const wishlistBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: "₹45/week",
    rating: 4.8,
    available: true,
  },
  {
    id: 2,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: "₹50/week",
    rating: 4.7,
    available: true,
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: "₹35/week",
    rating: 4.6,
    available: false,
  },
  {
    id: 4,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    price: "₹55/week",
    rating: 4.5,
    available: true,
  },
];

export default function WishlistPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-heading text-text-primary">
            My Wishlist
          </h1>
          <span className="text-text-muted text-sm">
            {wishlistBooks.length} books saved
          </span>
        </div>

        {wishlistBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wishlistBooks.map((book) => (
              <div
                key={book.id}
                className="bg-bg-card border border-border rounded-lg p-4 flex gap-4"
              >
                {/* Book Cover Placeholder */}
                <div className="w-20 h-28 bg-primary-light rounded-md shrink-0"></div>

                {/* Details */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        {book.title}
                      </h3>
                      <p className="text-sm text-text-muted">{book.author}</p>
                    </div>
                    <button className="p-1 text-text-muted hover:text-error transition-colors">
                      <IconTrash size={18} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-0.5">
                      <IconStar
                        size={14}
                        className="text-accent-secondary fill-accent-secondary"
                      />
                      <span className="text-sm text-text-secondary">
                        {book.rating}
                      </span>
                    </div>
                    <span className="text-primary font-medium text-sm">
                      {book.price}
                    </span>
                  </div>

                  <div className="mt-auto pt-3">
                    <button
                      disabled={!book.available}
                      className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${
                        book.available
                          ? "bg-primary text-white hover:bg-primary-hover"
                          : "bg-border text-text-muted cursor-not-allowed"
                      }`}
                    >
                      {book.available ? "Rent Now" : "Unavailable"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <IconHeart size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">Your wishlist is empty</p>
            <a
              href="/collection"
              className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
            >
              Discover Books
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
