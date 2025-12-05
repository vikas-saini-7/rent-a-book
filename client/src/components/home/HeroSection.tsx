import React from "react";

const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl md:text-5xl font-heading text-text-primary mb-4">
        Rent Books, Read More
      </h1>
      <p className="text-text-secondary max-w-xl mx-auto mb-8">
        Discover thousands of books available for rent. Save money, save space,
        and enjoy reading.
      </p>
      <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">
        Browse Collection
      </button>
    </section>
  );
};

export default HeroSection;
