"use client";

const members = [
  {
    name: "Ananya Mehta",
    tier: "Premium",
    active: true,
    borrowed: 3,
    fines: 0,
  },
  {
    name: "Kabir Singh",
    tier: "Standard",
    active: true,
    borrowed: 1,
    fines: 150,
  },
  { name: "Zoya Khan", tier: "Premium", active: false, borrowed: 0, fines: 0 },
];

export default function MembersPage() {
  return (
    <div className="space-y-4">
      <section className="border border-border rounded-xl bg-bg-card p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <div>
            <h1 className="text-lg font-heading text-text-primary">Members</h1>
            <p className="text-sm text-text-muted">
              Tiers, dues, and activity.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary">
              Invite member
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary">
              Send reminders
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-[#f7f4ef] text-text-secondary">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Tier</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Borrowed</th>
                <th className="px-4 py-3 text-right font-medium">
                  Outstanding fines
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {members.map((member) => (
                <tr
                  key={member.name}
                  className="hover:bg-bg-main/60 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-text-primary">
                    {member.name}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {member.tier}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {member.active ? "Active" : "Paused"}
                  </td>
                  <td className="px-4 py-3 text-right text-text-primary">
                    {member.borrowed}
                  </td>
                  <td className="px-4 py-3 text-right text-text-secondary">
                    {member.fines > 0 ? `₹${member.fines}` : "-"}
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
