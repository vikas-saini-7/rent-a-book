"use client";

const payments = [
  {
    id: "PM-7821",
    member: "Ananya Mehta",
    amount: 499,
    method: "Card",
    status: "Captured",
  },
  {
    id: "PM-7816",
    member: "Kabir Singh",
    amount: 150,
    method: "UPI",
    status: "Pending",
  },
  {
    id: "PM-7799",
    member: "Zoya Khan",
    amount: 299,
    method: "Card",
    status: "Refunded",
  },
];

export default function PaymentsPage() {
  return (
    <div className="space-y-4">
      <section className="border border-border rounded-xl bg-bg-card p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <div>
            <h1 className="text-lg font-heading text-text-primary">Payments</h1>
            <p className="text-sm text-text-muted">
              Memberships and fines tracking.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary">
              Reconcile
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary">
              Download report
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-[#f7f4ef] text-text-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Payment ID</th>
                <th className="px-4 py-3 text-left font-medium">Member</th>
                <th className="px-4 py-3 text-left font-medium">Method</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-bg-main/60 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-text-primary">
                    {payment.id}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {payment.member}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {payment.method}
                  </td>
                  <td className="px-4 py-3 text-right text-text-primary">
                    ₹{payment.amount}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {payment.status}
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
