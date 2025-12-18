"use client";

import { useMemo, useState } from "react";

type RentalStatus = "active" | "overdue" | "returned" | "reserved";

type Rental = {
  id: string;
  member: string;
  book: string;
  status: RentalStatus;
  dueDate: string;
  daysLeft: number;
  value: number;
};

type InventoryItem = {
  id: string;
  title: string;
  author: string;
  category: string;
  available: number;
  total: number;
  onHold: number;
};

const rentals: Rental[] = [
  {
    id: "RN-1042",
    member: "Ananya Mehta",
    book: "The Midnight Library",
    status: "active",
    dueDate: "2025-12-14",
    daysLeft: 8,
    value: 249,
  },
  {
    id: "RN-1039",
    member: "Kabir Singh",
    book: "Atomic Habits",
    status: "overdue",
    dueDate: "2025-12-02",
    daysLeft: -3,
    value: 199,
  },
  {
    id: "RN-1034",
    member: "Zoya Khan",
    book: "Norwegian Wood",
    status: "reserved",
    dueDate: "2025-12-10",
    daysLeft: 4,
    value: 0,
  },
  {
    id: "RN-1030",
    member: "Rohan Patel",
    book: "Project Hail Mary",
    status: "active",
    dueDate: "2025-12-11",
    daysLeft: 5,
    value: 249,
  },
  {
    id: "RN-1022",
    member: "Meera Das",
    book: "Sapiens",
    status: "returned",
    dueDate: "2025-11-30",
    daysLeft: 0,
    value: 0,
  },
];

const inventory: InventoryItem[] = [
  {
    id: "BK-201",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    available: 3,
    total: 10,
    onHold: 2,
  },
  {
    id: "BK-189",
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    available: 4,
    total: 8,
    onHold: 1,
  },
  {
    id: "BK-175",
    title: "Project Hail Mary",
    author: "Andy Weir",
    category: "Sci-Fi",
    available: 2,
    total: 6,
    onHold: 2,
  },
  {
    id: "BK-142",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Non-fiction",
    available: 5,
    total: 12,
    onHold: 1,
  },
  {
    id: "BK-131",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Finance",
    available: 6,
    total: 10,
    onHold: 0,
  },
];

const statusCopy: Record<
  RentalStatus,
  { label: string; tone: string; subtle: string; text: string }
> = {
  active: {
    label: "Active",
    tone: "bg-emerald-50 border-emerald-100",
    subtle: "bg-emerald-100/60",
    text: "text-emerald-800",
  },
  overdue: {
    label: "Overdue",
    tone: "bg-red-50 border-red-100",
    subtle: "bg-red-100/60",
    text: "text-red-800",
  },
  returned: {
    label: "Returned",
    tone: "bg-slate-50 border-slate-200",
    subtle: "bg-slate-100",
    text: "text-slate-800",
  },
  reserved: {
    label: "Reserved",
    tone: "bg-amber-50 border-amber-100",
    subtle: "bg-amber-100/70",
    text: "text-amber-800",
  },
};

const StatCard = ({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint: string;
}) => (
  <div className="border border-border rounded-xl bg-bg-card p-4 shadow-sm">
    <p className="text-sm text-text-muted mb-2">{title}</p>
    <p className="text-2xl font-semibold text-text-primary">{value}</p>
    <p className="text-sm text-text-secondary mt-1">{hint}</p>
  </div>
);

const StatusPill = ({ status }: { status: RentalStatus }) => {
  const tone = statusCopy[status];
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full border ${tone.tone} ${tone.text}`}
    >
      <span className={`w-2 h-2 rounded-full ${tone.subtle}`} />
      {tone.label}
    </span>
  );
};

export default function OverviewPage() {
  const [statusFilter, setStatusFilter] = useState<"all" | RentalStatus>("all");

  const filteredRentals = useMemo(() => {
    if (statusFilter === "all") return rentals;
    return rentals.filter((rental) => rental.status === statusFilter);
  }, [statusFilter]);

  const activeCount = rentals.filter((r) => r.status === "active").length;
  const overdueCount = rentals.filter((r) => r.status === "overdue").length;
  const reservedCount = rentals.filter((r) => r.status === "reserved").length;
  const catalogSize = inventory.reduce((sum, item) => sum + item.total, 0);

  return null;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Active rentals"
          value={`${activeCount}`}
          hint="Now on loan"
        />
        <StatCard
          title="Overdue"
          value={`${overdueCount}`}
          hint="Need follow-up"
        />
        <StatCard
          title="Reserved"
          value={`${reservedCount}`}
          hint="Awaiting pickup"
        />
        <StatCard
          title="Catalog size"
          value={`${catalogSize}`}
          hint="Total copies on-shelf"
        />
      </section>

      <section className="border border-border rounded-xl bg-bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h2 className="text-lg font-heading text-text-primary">Rentals</h2>
            <p className="text-sm text-text-muted">
              Track pickups, returns, and dues.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "active", "overdue", "reserved", "returned"].map((key) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key as "all" | RentalStatus)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  statusFilter === key
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-text-secondary hover:border-text-muted"
                }`}
              >
                {key === "all" ? "All" : statusCopy[key as RentalStatus].label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-[#f7f4ef] text-text-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Rental ID</th>
                <th className="px-4 py-3 text-left font-medium">Member</th>
                <th className="px-4 py-3 text-left font-medium">Book</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Due</th>
                <th className="px-4 py-3 text-right font-medium">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRentals.map((rental) => (
                <tr
                  key={rental.id}
                  className="hover:bg-bg-main/60 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-text-primary">
                    {rental.id}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {rental.member}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {rental.book}
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={rental.status} />
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {rental.dueDate} {rental.daysLeft < 0 ? "(overdue)" : ""}
                  </td>
                  <td className="px-4 py-3 text-right text-text-primary">
                    {rental.value > 0 ? `₹${rental.value}` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border border-border rounded-xl bg-bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-3">
          <div>
            <h2 className="text-lg font-heading text-text-primary">
              Inventory
            </h2>
            <p className="text-sm text-text-muted">
              Spot shortages and holds quickly.
            </p>
          </div>
          <div className="flex gap-2 text-sm text-text-secondary flex-wrap">
            <span className="px-3 py-1.5 rounded-lg border border-border bg-bg-main">
              Low stock &lt; 3 copies
            </span>
            <span className="px-3 py-1.5 rounded-lg border border-border bg-bg-main">
              Holds included
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-[#f7f4ef] text-text-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Author</th>
                <th className="px-4 py-3 text-left font-medium">Category</th>
                <th className="px-4 py-3 text-right font-medium">Available</th>
                <th className="px-4 py-3 text-right font-medium">On hold</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventory.map((item) => {
                const isLow = item.available < 3;
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-bg-main/60 transition-colors ${
                      isLow ? "bg-red-50/60" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-text-primary">
                      {item.title}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {item.author}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {item.category}
                    </td>
                    <td
                      className={`px-4 py-3 text-right ${
                        isLow ? "text-red-700" : "text-text-primary"
                      }`}
                    >
                      {item.available}
                    </td>
                    <td className="px-4 py-3 text-right text-text-secondary">
                      {item.onHold}
                    </td>
                    <td className="px-4 py-3 text-right text-text-secondary">
                      {item.total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
