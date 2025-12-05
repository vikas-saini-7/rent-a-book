"use client";

import React, { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does RentABook work?",
    answer:
      "RentABook connects book lovers who want to rent books with those who have books to share. Simply browse our collection, select a book you'd like to rent, and arrange pickup or delivery with the owner. You can also list your own books for others to rent.",
  },
  {
    question: "How do I rent a book?",
    answer:
      "To rent a book, browse our collection and click on a book you're interested in. You'll see the rental price, duration options, and the owner's location. Click 'Rent Now' to send a rental request. Once approved, you can arrange pickup or delivery and enjoy your book!",
  },
  {
    question: "How do I list my books for rent?",
    answer:
      "After creating an account, go to your profile and click 'Add Book'. Fill in the book details including title, author, condition, and your rental price. Add some photos and set your preferred rental duration. Your book will then be visible to other users in your area.",
  },
  {
    question: "What are the rental periods?",
    answer:
      "Rental periods are set by the book owner and typically range from 1 week to 1 month. You can request an extension before your rental period ends, subject to the owner's approval.",
  },
  {
    question: "What happens if a book is damaged?",
    answer:
      "We encourage renters to handle books with care. If a book is damaged during your rental period, you may be required to pay for repairs or replacement at the owner's discretion. We recommend inspecting books at pickup and noting any pre-existing damage.",
  },
  {
    question: "How are payments handled?",
    answer:
      "All payments are processed securely through our platform. When you rent a book, the payment is held until the rental is completed. The owner receives payment after you return the book in good condition.",
  },
  {
    question: "Can I cancel a rental?",
    answer:
      "Yes, you can cancel a rental request before it's confirmed by the owner at no charge. After confirmation, cancellations must be made at least 24 hours before the scheduled pickup time for a full refund. Late cancellations may incur a fee.",
  },
  {
    question: "Is there a security deposit?",
    answer:
      "Some book owners may require a security deposit for high-value or rare books. This deposit is refunded when the book is returned in the same condition. The deposit amount, if any, is shown on the book listing.",
  },
  {
    question: "How do I contact a book owner?",
    answer:
      "Once you've sent a rental request, you can message the book owner through our platform. All communication is kept within RentABook for your security and convenience.",
  },
  {
    question: "What areas does RentABook serve?",
    answer:
      "RentABook is available in many cities and towns. When browsing books, you can filter by location to find books available near you. We're constantly expanding to new areas!",
  },
  {
    question: "How do I report a problem?",
    answer:
      "If you encounter any issues with a rental, book condition, or another user, please contact our support team through the Help section in your account. We take all reports seriously and will work to resolve issues promptly.",
  },
  {
    question: "Can I leave reviews?",
    answer:
      "Yes! After completing a rental, both renters and owners can leave reviews. Reviews help build trust in our community and help others make informed decisions.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-base py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold text-text-main mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-text-muted text-lg">
              Find answers to common questions about RentABook
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-bg-card border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bg-base/50 transition-colors"
                >
                  <span className="font-medium text-text-main pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <IconChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <IconChevronDown className="w-5 h-5 text-text-muted flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 bg-bg-card border border-border rounded-lg">
            <h2 className="text-2xl font-heading font-semibold text-text-main mb-4">
              Still have questions?
            </h2>
            <p className="text-text-muted mb-6">
              Can&apos;t find the answer you&apos;re looking for? Please reach
              out to our friendly support team.
            </p>
            <a
              href="mailto:support@rentabook.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FAQPage;
