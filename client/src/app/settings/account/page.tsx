"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <div className="bg-bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Account Settings
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-text-muted mb-1">
            Full Name
          </label>
          <input
            type="text"
            defaultValue={user?.fullName || ""}
            className="w-full px-3 py-2 bg-bg-main border border-border rounded-md text-text-primary focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1">Email</label>
          <input
            type="email"
            defaultValue={user?.email || ""}
            className="w-full px-3 py-2 bg-bg-main border border-border rounded-md text-text-primary focus:outline-none focus:border-primary"
          />
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}
