import React from "react";
import Link from "next/link";
import { IconSparkles, IconArrowRight } from "@tabler/icons-react";

const SuggesterCTA = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="relative overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-12 md:p-16 border border-primary/20">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <IconSparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                Personalized
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading text-text-primary leading-tight">
              Not Sure What to Read?
            </h2>
            <p className="text-text-secondary text-lg">
              Get instant recommendations based on your reading preferences and
              history
            </p>
            <Link
              href="/suggester"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-all hover:shadow-lg group"
            >
              Try Book Suggester
              <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Visual */}
          <div className="relative hidden md:block">
            <div className="space-y-3">
              {/* Book suggestion cards */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-100 transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-14 bg-gradient-to-br from-primary/30 to-primary/10 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-2 bg-gray-100 rounded-full w-1/2"></div>
                  </div>
                  <IconSparkles className="w-5 h-5 text-primary/40" />
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-100 transform hover:scale-105 transition-transform ml-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-14 bg-gradient-to-br from-primary/40 to-primary/15 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-gray-200 rounded-full w-2/3"></div>
                    <div className="h-2 bg-gray-100 rounded-full w-3/4"></div>
                  </div>
                  <IconSparkles className="w-5 h-5 text-primary/40" />
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-100 transform hover:scale-105 transition-transform mr-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-14 bg-gradient-to-br from-primary/25 to-primary/10 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-gray-200 rounded-full w-4/5"></div>
                    <div className="h-2 bg-gray-100 rounded-full w-1/2"></div>
                  </div>
                  <IconSparkles className="w-5 h-5 text-primary/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuggesterCTA;
