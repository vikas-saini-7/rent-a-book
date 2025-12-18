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
      <section className="border border-border rounded-2xl bg-bg-card p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <h2 className="text-lg font-semibold text-text-primary">
            Your Books
          </h2>
          <button className="px-4 py-2 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-hover shadow-md shadow-primary/25 transition-all duration-200">
            Add Book
          </button>
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
              {items.map((item) => (
                <tr
                  key={item.title}
                  className="hover:bg-bg-main transition-colors duration-150"
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
                  <td className="px-5 py-4 text-right font-semibold text-text-primary">
                    {item.available}
                  </td>
                  <td className="px-5 py-4 text-right text-text-secondary">
                    {item.onHold}
                  </td>
                  <td className="px-5 py-4 text-right text-text-secondary">
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
