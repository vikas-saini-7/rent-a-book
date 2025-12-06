"use client";

import { useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    reminders: true,
  });

  return (
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
                  notifications[item.key as keyof typeof notifications]
                    ? "translate-x-6"
                    : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
