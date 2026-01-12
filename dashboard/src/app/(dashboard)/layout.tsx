"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useMemo } from "react";
import { useLibraryAuth } from "@/contexts/LibraryAuthContext";
import { IconBuilding } from "@tabler/icons-react";

const navItems = [
  { label: "Overview", href: "/overview" },
  { label: "Collection", href: "/collection" },
  { label: "Rentals", href: "/rentals" },
  { label: "Payments", href: "/payments" },
];

const pageMeta: Record<string, { title: string; desc: string }> = {
  "/overview": {
    title: "Overview",
    desc: "Quick view of your library activity",
  },
  "/rentals": {
    title: "Rentals",
    desc: "Manage active and past rentals",
  },
  "/collection": {
    title: "Books",
    desc: "View and manage your book inventory",
  },
  "/payments": {
    title: "Payments",
    desc: "Track member payments and fees",
  },
  "/settings": {
    title: "Settings",
    desc: "Manage library preferences",
  },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { library, logout, loading } = useLibraryAuth();

  const current = useMemo(() => {
    return (
      navItems.find((item) => pathname.startsWith(item.href)) ?? navItems[0]
    );
  }, [pathname]);

  const meta = pageMeta[current.href] ?? pageMeta["/overview"];

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  const libraryInitials =
    library?.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "LB";

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex bg-bg-main text-text-primary">
      <aside className="hidden lg:flex lg:w-64 border-r border-border bg-bg-card p-6 flex-col gap-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="RentABook Logo"
            width={60}
            height={60}
            className="object-contain"
            unoptimized
          />
          <div>
            <p className="text-2xl font-semibold text-black">Rent<span className="text-text-muted">A</span>Book</p>
            <p className="text-xs text-text-muted font-medium">
              Library Console
            </p>
          </div>
        </div>

        <nav className="space-y-1.5 text-sm">
          {navItems.map((item) => {
            const active = current.href === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block w-full px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  active
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "text-text-secondary hover:bg-bg-main hover:text-text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-2 text-sm">
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg border border-border">
            <div className="p-1.5 rounded bg-primary/5 shrink-0">
              <IconBuilding className="w-4 h-4 text-primary" strokeWidth={2} />
            </div>
            <div className="flex-1 leading-tight overflow-hidden min-w-0">
              <p className="text-xs font-semibold text-text-primary truncate">
                {library?.name}
              </p>
              <p className="text-xs text-text-muted truncate">
                {library?.email}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/settings"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-bg-main hover:text-text-primary transition-all duration-200"
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-red-50 hover:text-error transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 lg:overflow-hidden">
        <header className="sticky top-0 z-10 bg-bg-card/80 backdrop-blur-xl border-b border-border px-6 py-4">
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            {meta.title}
          </h1>
          <p className="text-sm text-text-muted mt-1">{meta.desc}</p>
        </header>

        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
