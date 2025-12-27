import React from "react";
import Link from "next/link";
import { IconSparkles, IconArrowRight } from "@tabler/icons-react";

const SuggesterCTA = () => {
  return (
    <section className="w-full bg-gradient-to-br from-primary/5 via-primary/3 to-transparent py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl border border-gray-100">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative grid md:grid-cols-2 gap-12 items-center p-8 md:p-16">
            {/* Left Content */}
            <div className="space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <IconSparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-semibold tracking-wide">
                  AI-POWERED
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Not Sure What to Read?
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                Get personalized book recommendations tailored to your taste in
                seconds
              </p>

              <Link
                href="/suggester"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 group"
              >
                Try Book Suggester
                <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Visual - Simplified */}
            <div className="relative hidden md:flex justify-center items-center">
              <div className="relative w-64 h-64">
                {/* Central sparkle icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconSparkles
                      className="w-10 h-10 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Orbiting book elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-md shadow-sm animate-pulse"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-16 bg-gradient-to-br from-primary/15 to-primary/5 rounded-md shadow-sm animate-pulse delay-150"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-16 bg-gradient-to-br from-primary/25 to-primary/10 rounded-md shadow-sm animate-pulse delay-300"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-md shadow-sm animate-pulse delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuggesterCTA;
