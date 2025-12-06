"use client";

export default function SecurityPage() {
  return (
    <div className="bg-bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Security Settings
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-text-muted mb-1">
            Current Password
          </label>
          <input
            type="password"
            placeholder="Enter current password"
            className="w-full px-3 py-2 bg-bg-main border border-border rounded-md text-text-primary focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full px-3 py-2 bg-bg-main border border-border rounded-md text-text-primary focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full px-3 py-2 bg-bg-main border border-border rounded-md text-text-primary focus:outline-none focus:border-primary"
          />
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">
          Update Password
        </button>
      </div>
    </div>
  );
}
