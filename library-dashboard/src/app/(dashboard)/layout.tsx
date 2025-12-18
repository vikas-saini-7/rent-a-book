"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useMemo } from "react";
import { useLibraryAuth } from "@/contexts/LibraryAuthContext";

const navItems = [
  { label: "Overview", href: "/overview" },
  { label: "Collection", href: "/collection" },
  { label: "Rentals", href: "/rentals" },
  { label: "Payments", href: "/payments" },
];

const pageMeta: Record<string, { title: string; desc: string }> = {
  "/overview": {
    title: "Dashboard Overview",
    desc: "Snapshot of rentals, collection health, and quick actions.",
  },
  "/rentals": {
    title: "Rentals",
    desc: "Track pickups, returns, and dues in real time.",
  },
  "/collection": {
    title: "Collection",
    desc: "Manage stock, holds, and condition of every copy.",
  },
  "/payments": {
    title: "Payments",
    desc: "Reconcile rental fees, deposits, and refunds.",
  },
  "/settings": {
    title: "Settings",
    desc: "Branch preferences, delivery, notifications, and users.",
  },
};

const pageActions: Record<string, { label: string; secondary?: boolean }[]> = {
  "/overview": [
    { label: "Export snapshot", secondary: true },
    { label: "Add book" },
  ],
  "/rentals": [
    { label: "New rental" },
    { label: "Mark returned", secondary: true },
  ],
  "/collection": [
    { label: "Add book" },
    { label: "Adjust stock", secondary: true },
  ],
  "/payments": [
    { label: "Record payment" },
    { label: "Export CSV", secondary: true },
  ],
  "/settings": [{ label: "Save changes" }],
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

  const actions = pageActions[current.href] ?? pageActions["/overview"];
  const meta = pageMeta[current.href] ?? pageMeta["/overview"];

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-main">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading...</p>
        </div>
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
      <aside className="hidden lg:flex lg:w-64 border-r border-border bg-bg-card p-4 flex-col gap-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center font-heading text-lg">
            R
          </div>
          <div>
            <p className="text-lg font-heading text-text-primary">RentABook</p>
            <p className="text-xs text-text-muted">Library console</p>
          </div>
        </div>

        <nav className="space-y-1 text-sm">
          {navItems.map((item) => {
            const active = current.href === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block w-full px-3 py-2 rounded-lg border transition-colors ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-transparent hover:border-border text-text-secondary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3 text-sm">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-border bg-bg-main">
            <div className="h-10 w-10 rounded-md bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-semibold">
              {libraryInitials}
            </div>
            <div className="leading-tight overflow-hidden">
              <p className="text-sm font-semibold text-text-primary truncate">
                {library?.name}
              </p>
              <p className="text-xs text-text-secondary truncate">
                {library?.email}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/settings"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border bg-bg-main text-sm text-text-primary hover:border-text-secondary"
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border bg-bg-main text-sm text-text-primary hover:border-error hover:text-error"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 lg:overflow-hidden">
        <header className="sticky top-0 z-10 bg-bg-card border-b border-border px-4 py-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-heading text-text-primary">
              {meta.title}
            </h1>
            <p className="text-sm text-text-secondary">{meta.desc}</p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            {actions.map((action) => (
              <button
                key={action.label}
                className={`px-4 py-2 rounded-lg transition-colors border ${
                  action.secondary
                    ? "border-border text-text-primary hover:border-text-secondary"
                    : "bg-primary text-white border-primary hover:bg-primary-hover"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </header>

        <main className="p-4 md:p-6 flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
