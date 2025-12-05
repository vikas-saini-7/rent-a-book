"use client";

const rows = [
  {
    id: "RN-1042",
    member: "Ananya Mehta",
    book: "The Midnight Library",
    due: "2025-12-14",
    status: "Active",
  },
  {
    id: "RN-1039",
    member: "Kabir Singh",
    book: "Atomic Habits",
    due: "2025-12-02",
    status: "Overdue",
  },
  {
    id: "RN-1034",
    member: "Zoya Khan",
    book: "Norwegian Wood",
    due: "2025-12-10",
    status: "Reserved",
  },
];

export default function RentalsPage() {
  return (
    <div className="space-y-4">
      <section className="border border-border rounded-xl bg-bg-card p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <div>
            <h1 className="text-lg font-heading text-text-primary">
              Active rentals
            </h1>
            <p className="text-sm text-text-muted">
              Extend, collect, or mark returned.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary">
              Filter
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-border bg-primary/10 text-sm text-primary">
              Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-[#f7f4ef] text-text-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Rental ID</th>
                <th className="px-4 py-3 text-left font-medium">Member</th>
                <th className="px-4 py-3 text-left font-medium">Book</th>
                <th className="px-4 py-3 text-left font-medium">Due</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-bg-main/60 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-text-primary">
                    {row.id}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {row.member}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{row.book}</td>
                  <td className="px-4 py-3 text-text-secondary">{row.due}</td>
                  <td className="px-4 py-3 text-text-secondary">
                    {row.status}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <button className="px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary">
                        Extend
                      </button>
                      <button className="px-3 py-1.5 rounded-lg border border-border bg-primary text-white text-sm">
                        Mark returned
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
