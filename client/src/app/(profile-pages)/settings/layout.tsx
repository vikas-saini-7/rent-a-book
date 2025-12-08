"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useState } from "react";
import SettingsSidebar from "@/components/settings/SettingsSidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState("account");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        <h1 className="text-3xl font-heading text-text-primary mb-8">
          Settings
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <SettingsSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          <div className="flex-1">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
