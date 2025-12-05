import React from "react";
import { IconChevronDown } from "@tabler/icons-react";
import SectionTitle from "./SectionTitle";

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
  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <SectionTitle>Frequently Asked Questions</SectionTitle>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="bg-bg-card border border-border rounded-lg p-4 group"
          >
            <summary className="font-medium text-text-primary cursor-pointer list-none flex justify-between items-center">
              {faq.question}
              <IconChevronDown
                size={18}
                className="text-text-muted group-open:rotate-180 transition-transform"
              />
            </summary>
            <p className="text-text-secondary mt-3 text-sm">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
