"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import {
  IconUser,
  IconBell,
  IconLock,
  IconMapPin,
  IconCreditCard,
  IconChevronRight,
} from "@tabler/icons-react";
import { useState } from "react";

const settingsSections = [
  {
    id: "account",
    icon: IconUser,
    title: "Account",
    description: "Manage your account details",
  },
  {
    id: "notifications",
    icon: IconBell,
    title: "Notifications",
    description: "Configure notification preferences",
  },
  {
    id: "security",
    icon: IconLock,
    title: "Security",
    description: "Password and security settings",
  },
  {
    id: "addresses",
    icon: IconMapPin,
    title: "Addresses",
    description: "Manage delivery addresses",
  },
  {
    id: "payment",
    icon: IconCreditCard,
    title: "Payment Methods",
    description: "Add or remove payment methods",
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    reminders: true,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        <h1 className="text-3xl font-heading text-text-primary mb-8">
          Settings
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-bg-card border border-border rounded-lg overflow-hidden">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-primary-light text-primary"
                      : "text-text-secondary hover:bg-bg-main"
                  }`}
                >
                  <section.icon size={20} />
                  <span className="flex-1">{section.title}</span>
                  <IconChevronRight size={16} className="text-text-muted" />
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            {activeSection === "account" && (
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
                      defaultValue="John Doe"
                      className="w-full px-3 py-2 bg-bg-main border border-border rounded-md text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-3 py-2 bg-bg-main border border-border rounded-md text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      defaultValue="+91 98765 43210"
                      className="w-full px-3 py-2 bg-bg-main border border-border rounded-md text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                  <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="bg-bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Notification Preferences
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      key: "email",
                      label: "Email Notifications",
                      desc: "Receive updates via email",
                    },
                    {
                      key: "push",
                      label: "Push Notifications",
                      desc: "Browser push notifications",
                    },
                    {
                      key: "sms",
                      label: "SMS Notifications",
                      desc: "Get text message alerts",
                    },
                    {
                      key: "reminders",
                      label: "Due Date Reminders",
                      desc: "Reminder before books are due",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between py-2"
                    >
                      <div>
                        <p className="text-text-primary">{item.label}</p>
                        <p className="text-sm text-text-muted">{item.desc}</p>
                      </div>
                      <button
                        onClick={() =>
                          setNotifications((prev) => ({
                            ...prev,
                            [item.key]: !prev[item.key as keyof typeof prev],
                          }))
                        }
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notifications[item.key as keyof typeof notifications]
                            ? "bg-primary"
                            : "bg-border"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            notifications[
                              item.key as keyof typeof notifications
                            ]
                              ? "translate-x-6"
                              : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "security" && (
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
            )}

            {activeSection === "addresses" && (
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
            )}

            {activeSection === "payment" && (
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
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
