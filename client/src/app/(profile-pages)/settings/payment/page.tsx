"use client";

export default function PaymentPage() {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Payment Methods
        </h2>
        <button className="text-sm text-primary hover:underline">
          + Add New
        </button>
      </div>
      <div className="space-y-3">
        <div className="p-4 border border-border rounded-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-6 bg-primary-light rounded flex items-center justify-center text-xs font-bold text-primary">
              VISA
            </div>
            <div>
              <p className="text-text-primary">•••• •••• •••• 4242</p>
              <p className="text-sm text-text-muted">Expires 12/25</p>
            </div>
          </div>
          <span className="px-2 py-0.5 bg-primary-light text-primary text-xs rounded">
            Default
          </span>
        </div>
        <div className="p-4 border border-border rounded-md flex items-center gap-3">
          <div className="w-10 h-6 bg-accent-secondary/20 rounded flex items-center justify-center text-xs font-bold text-accent-secondary">
            UPI
          </div>
          <p className="text-text-primary">john@upi</p>
        </div>
      </div>
    </div>
  );
}
