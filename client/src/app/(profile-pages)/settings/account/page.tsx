"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { updateProfile } from "@/services/profile.service";
import { IconLoader2 } from "@tabler/icons-react";

export default function AccountPage() {
  const { user, loading: authLoading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });

  // Update form data when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      await updateProfile(formData);

      // Reload page to refresh user data from /me endpoint
      window.location.reload();

      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="bg-bg-card border border-border rounded-lg p-6 flex items-center justify-center min-h-[200px]">
        <IconLoader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Account Settings
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-text-muted mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full px-3 py-2 bg-bg-main border border-border rounded-md text-text-primary focus:outline-none focus:border-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1">Email</label>
          <input
            type="email"
            value={user.email || ""}
            className="w-full px-3 py-2 bg-bg-main border border-border rounded-md text-text-muted cursor-not-allowed"
            disabled
          />
          <p className="text-xs text-text-muted mt-1">
            Email cannot be changed
          </p>
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="+91 1234567890"
            className="w-full px-3 py-2 bg-bg-main border border-border rounded-md text-text-primary focus:outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {saving && <IconLoader2 className="animate-spin" size={18} />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
