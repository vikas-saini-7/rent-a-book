"use client";

import React, { useState } from "react";
import { IconPlus, IconMinus } from "@tabler/icons-react";

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
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-12 text-center">
        Have Questions? Get Answers.
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-border last:border-b-0">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full py-6 flex justify-between items-start text-left group"
            >
              <span className="font-medium text-text-primary text-lg pr-8 group-hover:text-primary transition-colors">
                {faq.question}
              </span>
              <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                {openIndex === index ? (
                  <IconMinus className="w-5 h-5 text-primary" />
                ) : (
                  <IconPlus className="w-5 h-5 text-text-muted" />
                )}
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 pb-6" : "max-h-0"
              }`}
            >
              <p className="text-text-secondary leading-relaxed pr-8">
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
