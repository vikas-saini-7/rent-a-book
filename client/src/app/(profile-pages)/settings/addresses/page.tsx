"use client";

export default function AddressesPage() {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Saved Addresses
        </h2>
        <button className="text-sm text-primary hover:underline">
          + Add New
        </button>
      </div>
      <div className="space-y-3">
        <div className="p-4 border border-border rounded-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-text-primary">Home</p>
              <p className="text-sm text-text-secondary mt-1">
                123 Main Street, Apartment 4B
                <br />
                New Delhi, 110001
              </p>
            </div>
            <span className="px-2 py-0.5 bg-primary-light text-primary text-xs rounded">
              Default
            </span>
          </div>
        </div>
        <div className="p-4 border border-border rounded-md">
          <div>
            <p className="font-medium text-text-primary">Office</p>
            <p className="text-sm text-text-secondary mt-1">
              456 Business Park, Tower A<br />
              Gurugram, 122001
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
