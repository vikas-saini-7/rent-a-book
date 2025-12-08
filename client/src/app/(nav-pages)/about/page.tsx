import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { IconBook, IconUsers, IconLeaf, IconHeart } from "@tabler/icons-react";

const values = [
  {
    icon: IconBook,
    title: "Accessible Reading",
    description:
      "Making books affordable and accessible to everyone through rentals.",
  },
  {
    icon: IconUsers,
    title: "Community First",
    description:
      "Building a community of readers who share their love for books.",
  },
  {
    icon: IconLeaf,
    title: "Sustainability",
    description: "Reducing waste by reusing books instead of buying new ones.",
  },
  {
    icon: IconHeart,
    title: "Passion for Books",
    description:
      "Every book has a story to tell, and we help you discover them.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-text-primary mb-4">
            About RentABook
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            We believe everyone deserves access to great books. Our mission is
            to make reading affordable, sustainable, and accessible to all.
          </p>
        </section>

        {/* Story Section */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-heading text-text-primary mb-4">
              Our Story
            </h2>
            <div className="space-y-4 text-text-secondary">
              <p>
                RentABook started with a simple idea: why buy a book you&apos;ll
                only read once? Founded in 2024, we set out to create a platform
                where book lovers can access thousands of titles without the
                cost or clutter of ownership.
              </p>
              <p>
                Today, we serve readers across the country, delivering books
                right to their doorsteps and picking them up when they&apos;re
                done. It&apos;s reading made simple.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-heading text-text-primary mb-8 text-center">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-bg-card border border-border rounded-lg p-6 flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                  <value.icon size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="bg-primary-light rounded-lg p-8">
            <h2 className="text-2xl font-heading text-text-primary mb-3">
              Ready to Start Reading?
            </h2>
            <p className="text-text-secondary mb-6">
              Join thousands of readers who rent instead of buy.
            </p>
            <a
              href="/collection"
              className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
            >
              Browse Collection
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
