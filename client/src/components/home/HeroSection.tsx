"use client";

import React from "react";
import Link from "next/link";

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
            <br />
            & Read More
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
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl"></div>

            {/* Main content */}
            <div className="relative h-full flex items-center justify-center">
              <div className="space-y-6 w-full px-8">
                {/* Minimalist book cards */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100 transition-transform hover:scale-105 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-16 bg-linear-to-br from-primary/30 to-primary/10 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2.5 bg-gray-200 rounded-full w-3/4"></div>
                      <div className="h-2 bg-gray-100 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100 transition-transform hover:scale-105 hover:shadow-md ml-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-16 bg-linear-to-br from-primary/40 to-primary/15 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2.5 bg-gray-200 rounded-full w-2/3"></div>
                      <div className="h-2 bg-gray-100 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100 transition-transform hover:scale-105 hover:shadow-md mr-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-16 bg-linear-to-br from-primary/25 to-primary/10 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2.5 bg-gray-200 rounded-full w-4/5"></div>
                      <div className="h-2 bg-gray-100 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
