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
          <h2 className="text-lg font-semibold text-text-primary">
            Payment History
          </h2>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 text-text-secondary">
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
