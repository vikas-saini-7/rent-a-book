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
  <div className="border border-border rounded-xl bg-gradient-to-br from-bg-card to-gray-50/30 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
    <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
      {title}
    </p>
    <p className="text-3xl font-bold text-text-primary">{value}</p>
    <p className="text-sm text-text-secondary mt-1.5">{hint}</p>
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

      <section className="border border-border rounded-2xl bg-bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Rentals</h2>
            <p className="text-sm text-text-muted mt-0.5">
              Track pickups, returns, and dues.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "active", "overdue", "reserved", "returned"].map((key) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key as "all" | RentalStatus)}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  statusFilter === key
                    ? "bg-primary text-white shadow-sm"
                    : "bg-bg-main text-text-secondary hover:bg-gray-100"
                }`}
              >
                {key === "all" ? "All" : statusCopy[key as RentalStatus].label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 text-text-secondary">
              <tr>
                <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wide">
                  Rental ID
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wide">
                  Member
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wide">
                  Book
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wide">
                  Status
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wide">
                  Due
                </th>
                <th className="px-5 py-3.5 text-right font-semibold text-xs uppercase tracking-wide">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRentals.map((rental) => (
                <tr
                  key={rental.id}
                  className="hover:bg-bg-main transition-colors duration-150"
                >
                  <td className="px-5 py-4 font-semibold text-text-primary">
                    {rental.id}
                  </td>
                  <td className="px-5 py-4 text-text-secondary">
                    {rental.member}
                  </td>
                  <td className="px-5 py-4 text-text-secondary">
                    {rental.book}
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={rental.status} />
                  </td>
                  <td className="px-5 py-4 text-text-secondary">
                    {rental.dueDate} {rental.daysLeft < 0 ? "(overdue)" : ""}
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-text-primary">
                    {rental.value > 0 ? `₹${rental.value}` : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border border-border rounded-2xl bg-bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Inventory</h2>
            <p className="text-sm text-text-muted mt-0.5">
              Spot shortages and holds quickly.
            </p>
          </div>
          <div className="flex gap-2 text-sm text-text-secondary flex-wrap">
            <span className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 font-medium">
              Low stock &lt; 3 copies
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-medium">
              Holds included
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 text-text-secondary">
              <tr>
                <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wide">
                  Title
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wide">
                  Author
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-xs uppercase tracking-wide">
                  Category
                </th>
                <th className="px-5 py-3.5 text-right font-semibold text-xs uppercase tracking-wide">
                  Available
                </th>
                <th className="px-5 py-3.5 text-right font-semibold text-xs uppercase tracking-wide">
                  On hold
                </th>
                <th className="px-5 py-3.5 text-right font-semibold text-xs uppercase tracking-wide">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inventory.map((item) => {
                const isLow = item.available < 3;
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-bg-main transition-colors duration-150 ${
                      isLow ? "bg-red-50/40" : ""
                    }`}
                  >
                    <td className="px-5 py-4 font-semibold text-text-primary">
                      {item.title}
                    </td>
                    <td className="px-5 py-4 text-text-secondary">
                      {item.author}
                    </td>
                    <td className="px-5 py-4 text-text-secondary">
                      {item.category}
                    </td>
                    <td
                      className={`px-5 py-4 text-right font-semibold ${
                        isLow ? "text-red-600" : "text-text-primary"
                      }`}
                    >
                      {item.available}
                    </td>
                    <td className="px-5 py-4 text-right text-text-secondary">
                      {item.onHold}
                    </td>
                    <td className="px-5 py-4 text-right text-text-secondary">
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
