"use client";

import React, { useState } from "react";
import { IconChevronDown, IconHelpCircle } from "@tabler/icons-react";

const faqs = [
  {
    question: "How does renting work?",
    answer:
      "Browse our collection, select a book, and rent it for your desired duration. We deliver to your doorstep.",
  },
  {
    question: "What is the rental period?",
    answer:
      "You can rent books for 1 week, 2 weeks, or 1 month. Extensions are available.",
  },
  {
    question: "How do I return books?",
    answer:
      "Schedule a pickup through your account or drop it at any of our partner locations.",
  },
  {
    question: "Is there a security deposit?",
    answer:
      "Yes, a refundable deposit is required which is returned after the book is returned in good condition.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <IconHelpCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-heading text-text-primary mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-text-secondary">
          Everything you need to know about renting books
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex justify-between items-center text-left"
            >
              <span className="font-medium text-text-primary pr-4">
                {faq.question}
              </span>
              <IconChevronDown
                size={20}
                className={`text-primary flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40" : "max-h-0"
              }`}
            >
              <p className="px-6 pb-5 text-text-secondary leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
