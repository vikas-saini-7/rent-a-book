import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import {
  IconBook,
  IconCalendar,
  IconStar,
  IconCheck,
} from "@tabler/icons-react";

const rentalHistory = [
  {
    id: 1,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    rentedOn: "Oct 15, 2024",
    returnedOn: "Oct 29, 2024",
    rating: 5,
  },
  {
    id: 2,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    rentedOn: "Sep 20, 2024",
    returnedOn: "Oct 4, 2024",
    rating: 4,
  },
  {
    id: 3,
    title: "Brave New World",
    author: "Aldous Huxley",
    rentedOn: "Aug 10, 2024",
    returnedOn: "Aug 24, 2024",
    rating: 4,
  },
  {
    id: 4,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    rentedOn: "Jul 5, 2024",
    returnedOn: "Jul 19, 2024",
    rating: 3,
  },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-heading text-text-primary">
            Rental History
          </h1>
          <span className="text-text-muted text-sm">
            {rentalHistory.length} books rented
          </span>
        </div>

        {rentalHistory.length > 0 ? (
          <div className="space-y-4">
            {rentalHistory.map((rental) => (
              <div
                key={rental.id}
                className="bg-bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row gap-4"
              >
                {/* Book Cover Placeholder */}
                <div className="w-16 h-24 bg-primary-light rounded-md shrink-0 flex items-center justify-center">
                  <IconBook size={28} className="text-primary" />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">
                    {rental.title}
                  </h3>
                  <p className="text-sm text-text-muted mb-2">
                    {rental.author}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-1">
                      <IconCalendar size={14} />
                      <span>
                        {rental.rentedOn} - {rental.returnedOn}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IconCheck size={14} className="text-success" />
                      <span className="text-success">Returned</span>
                    </div>
                  </div>
                </div>

                {/* Rating & Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <IconStar
                        key={i}
                        size={16}
                        className={
                          i < rental.rating
                            ? "text-accent-secondary fill-accent-secondary"
                            : "text-border"
                        }
                      />
                    ))}
                  </div>
                  <button className="px-3 py-1.5 text-sm border border-border rounded-md text-text-secondary hover:border-primary hover:text-primary transition-colors">
                    Rent Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <IconBook size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">No rental history yet</p>
            <a
              href="/collection"
              className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
            >
              Start Reading
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
