"use client";

import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { IconRefresh, IconBook, IconSparkles } from "@tabler/icons-react";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
}

// Sample book data (replace with API call later)
const sampleBooks: Book[] = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fiction",
    description:
      "A dazzling novel about all the choices that go into a life well lived.",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help",
    description:
      "An easy and proven way to build good habits and break bad ones.",
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Science Fiction",
    description:
      "A reckless astronaut races against the clock to save humanity.",
  },
  {
    id: 4,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    genre: "Historical Fiction",
    description:
      "A legendary Hollywood star finally tells the story of her life.",
  },
  {
    id: 5,
    title: "Educated",
    author: "Tara Westover",
    genre: "Memoir",
    description:
      "A memoir about a young woman who leaves her survivalist family.",
  },
  {
    id: 6,
    title: "The Song of Achilles",
    author: "Madeline Miller",
    genre: "Historical Fiction",
    description: "A tale of gods, kings, and the Trojan War.",
  },
  {
    id: 7,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    description: "A brief history of humankind.",
  },
  {
    id: 8,
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    genre: "Fantasy",
    description: "A life no one will remember. A story you will never forget.",
  },
  {
    id: 9,
    title: "Anxious People",
    author: "Fredrik Backman",
    genre: "Fiction",
    description: "A poignant comedy about a crime that never took place.",
  },
  {
    id: 10,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    description:
      "A woman's act of violence against her husband—and of the therapist obsessed with uncovering her motive.",
  },
  {
    id: 11,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    genre: "Mystery",
    description: "A mysterious young woman named Kya who lives in the marshes.",
  },
  {
    id: 12,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    description: "A mystical story about following your dreams.",
  },
];

export default function SuggesterPage() {
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  const handleShuffle = () => {
    setIsShuffling(true);

    // Simulate loading animation
    setTimeout(() => {
      // Get 3 random books
      const shuffled = [...sampleBooks].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 3);
      setSuggestedBooks(selected);
      setIsShuffling(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-heading text-text-primary mb-8 text-center">
            Book Suggester
          </h1>

          {/* Suggested Books Section or Placeholder */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {suggestedBooks.length > 0
              ? suggestedBooks.map((book, index) => (
                  <div
                    key={book.id}
                    className="bg-bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Book Cover */}
                    <div className="w-full h-56 bg-primary-light rounded-md mb-3 overflow-hidden">
                      <img
                        src="https://klacey.com/wp-content/uploads/Book-cover-illustration-service-by-freelance-illustrator-Kati-Lacey.webp"
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Book Details */}
                    <h3 className="text-lg font-semibold text-text-primary font-heading line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-text-secondary text-sm mt-1">
                      {book.author}
                    </p>
                    <span className="inline-block px-2 py-1 bg-primary-light text-primary text-xs rounded mt-2">
                      {book.genre}
                    </span>
                  </div>
                ))
              : // Placeholder cards
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-bg-card border border-border rounded-lg p-4"
                  >
                    <div className="w-full h-56 bg-primary-light rounded-md mb-3 flex items-center justify-center">
                      <IconBook className="w-16 h-16 text-accent-secondary opacity-30" />
                    </div>
                    <div className="h-6 bg-primary-light rounded mb-2"></div>
                    <div className="h-4 bg-primary-light rounded w-2/3"></div>
                  </div>
                ))}
          </div>

          {/* Shuffle Button */}
          <div className="text-center">
            <button
              onClick={handleShuffle}
              disabled={isShuffling}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-3"
            >
              <IconRefresh
                className={`w-5 h-5 ${isShuffling ? "animate-spin" : ""}`}
              />
              {isShuffling ? "Shuffling..." : "Shuffle"}
            </button>
            <p className="text-text-muted text-sm max-w-md mx-auto">
              Suggestions based on your recent reads, browsing history, and
              collection interests
            </p>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
