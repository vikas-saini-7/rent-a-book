"use client";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <section className="border border-border rounded-xl bg-bg-card p-4 shadow-sm">
        <h1 className="text-lg font-heading text-text-primary mb-2">
          Settings
        </h1>
        <p className="text-sm text-text-muted mb-4">
          Configure policies, reminders, and billing.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary">
            Organization profile
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary">
            Notifications
          </button>
          <button className="px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700 hover:border-red-300">
            Logout
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="p-3 border border-border rounded-lg bg-bg-main">
            <h2 className="text-sm font-semibold text-text-primary">
              Loan policy
            </h2>
            <p className="text-sm text-text-secondary">
              Set duration, grace days, and renewals.
            </p>
            <button className="mt-2 px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary">
              Edit policy
            </button>
          </div>
          <div className="p-3 border border-border rounded-lg bg-bg-main">
            <h2 className="text-sm font-semibold text-text-primary">
              Reminders
            </h2>
            <p className="text-sm text-text-secondary">
              Overdue emails, SMS, and cadence.
            </p>
            <button className="mt-2 px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary">
              Configure
            </button>
          </div>
          <div className="p-3 border border-border rounded-lg bg-bg-main">
            <h2 className="text-sm font-semibold text-text-primary">
              Branding
            </h2>
            <p className="text-sm text-text-secondary">
              Logo, colors, and receipts.
            </p>
            <button className="mt-2 px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary">
              Update
            </button>
          </div>
          <div className="p-3 border border-border rounded-lg bg-bg-main">
            <h2 className="text-sm font-semibold text-text-primary">Billing</h2>
            <p className="text-sm text-text-secondary">
              Subscription, invoices, payments.
            </p>
            <button className="mt-2 px-3 py-1.5 rounded-lg border border-border text-sm text-text-secondary">
              Manage
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
