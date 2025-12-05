"use client";

const items = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    available: 3,
    onHold: 2,
    total: 10,
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    category: "Sci-Fi",
    available: 2,
    onHold: 2,
    total: 6,
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Non-fiction",
    available: 5,
    onHold: 1,
    total: 12,
  },
];

export default function InventoryPage() {
  return (
    <div className="space-y-4">
      <section className="border border-border rounded-xl bg-bg-card p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <div>
            <h1 className="text-lg font-heading text-text-primary">
              Collection
            </h1>
            <p className="text-sm text-text-muted">
              Top movers, low stock, and holds.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary">
              Add book
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary">
              Upload CSV
            </button>
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
              {items.map((item) => (
                <tr
                  key={item.title}
                  className="hover:bg-bg-main/60 transition-colors"
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
                  <td className="px-4 py-3 text-right text-text-primary">
                    {item.available}
                  </td>
                  <td className="px-4 py-3 text-right text-text-secondary">
                    {item.onHold}
                  </td>
                  <td className="px-4 py-3 text-right text-text-secondary">
                    {item.total}
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
