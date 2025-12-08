import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import {
  IconBook,
  IconCalendar,
  IconMapPin,
  IconClock,
} from "@tabler/icons-react";

const activeRentals = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    rentedOn: "Nov 28, 2024",
    dueDate: "Dec 12, 2024",
    daysLeft: 7,
    location: "Pickup Point A",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    rentedOn: "Dec 1, 2024",
    dueDate: "Dec 15, 2024",
    daysLeft: 10,
    location: "Pickup Point B",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    rentedOn: "Dec 3, 2024",
    dueDate: "Dec 17, 2024",
    daysLeft: 12,
    location: "Home Delivery",
  },
];

export default function RentalsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-heading text-text-primary">
            Track Rentals
          </h1>
          <span className="px-3 py-1 bg-primary-light text-primary rounded-full text-sm font-medium">
            {activeRentals.length} Active
          </span>
        </div>

        {activeRentals.length > 0 ? (
          <div className="space-y-4">
            {activeRentals.map((rental) => (
              <div
                key={rental.id}
                className="bg-bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row gap-4"
              >
                {/* Book Cover Placeholder */}
                <div className="w-20 h-28 bg-primary-light rounded-md shrink-0 flex items-center justify-center">
                  <IconBook size={32} className="text-primary" />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">
                    {rental.title}
                  </h3>
                  <p className="text-sm text-text-muted mb-3">
                    {rental.author}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <IconCalendar size={16} />
                      <span>Rented: {rental.rentedOn}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <IconClock size={16} />
                      <span>Due: {rental.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <IconMapPin size={16} />
                      <span>{rental.location}</span>
                    </div>
                  </div>
                </div>

                {/* Days Left & Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      rental.daysLeft <= 3
                        ? "bg-error/10 text-error"
                        : "bg-success/10 text-success"
                    }`}
                  >
                    {rental.daysLeft} days left
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm border border-border rounded-md text-text-secondary hover:border-primary hover:text-primary transition-colors">
                      Extend
                    </button>
                    <button className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">
                      Return
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <IconBook size={48} className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary">No active rentals</p>
            <a
              href="/collection"
              className="inline-block mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
            >
              Browse Collection
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
