"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold font-heading text-text-primary leading-tight">
            Rent Books,
            <br />
            Save Money
            <br />& Read More
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Discover thousands of books available for rent. Save money, save
            space, and enjoy reading without the clutter.
          </p>
          <Link
            href="/collection"
            className="inline-block px-8 py-4 bg-primary text-white text-lg font-medium rounded-lg hover:bg-primary-hover transition-all hover:shadow-lg"
          >
            Browse Collection
          </Link>
        </div>

        {/* Right Visual */}
        <div className="relative">
          <div className="relative aspect-square max-w-md mx-auto">
            {/* Decorative gradient circle */}
            <div className="absolute inset-0 from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl"></div>

            {/* Hero Image */}
            <div className="relative h-full flex items-center justify-center">
              <Image
                src="/assets/hero.png"
                alt="Books Collection"
                width={500}
                height={500}
                className="object-contain "
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
