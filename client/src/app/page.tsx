"use client";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import {
  HeroSection,
  FeaturedBooks,
  MostRented,
  MostLoved,
  FAQSection,
} from "../components/home";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <FeaturedBooks />
        <MostRented />
        <MostLoved />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
