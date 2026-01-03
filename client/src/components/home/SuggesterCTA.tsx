import React from "react";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

const SuggesterCTA = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-linear-to-b from-primary/20 to-bg-main">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
          Need help choosing your next book?
        </h2>

        <p className="text-text-secondary text-xl mb-10">
          Get personalized recommendations based on your preferences
        </p>

        <Link
          href="/suggester"
          className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-all group text-lg"
        >
          Try Book Suggester
          <IconArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default SuggesterCTA;
