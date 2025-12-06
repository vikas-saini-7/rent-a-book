"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconUser,
  IconBell,
  IconLock,
  IconMapPin,
  IconCreditCard,
  IconChevronRight,
} from "@tabler/icons-react";

const settingsSections = [
  {
    id: "account",
    path: "/settings/account",
    icon: IconUser,
    title: "Account",
    description: "Manage your account details",
  },
  {
    id: "notifications",
    path: "/settings/notifications",
    icon: IconBell,
    title: "Notifications",
    description: "Configure notification preferences",
  },
  {
    id: "security",
    path: "/settings/security",
    icon: IconLock,
    title: "Security",
    description: "Password and security settings",
  },
  {
    id: "addresses",
    path: "/settings/addresses",
    icon: IconMapPin,
    title: "Addresses",
    description: "Manage delivery addresses",
  },
  {
    id: "payment",
    path: "/settings/payment",
    icon: IconCreditCard,
    title: "Payment Methods",
    description: "Add or remove payment methods",
  },
];

interface SettingsSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function SettingsSidebar({
  activeSection,
  setActiveSection,
}: SettingsSidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-bg-card border border-border rounded-lg overflow-hidden">
        {settingsSections.map((section) => (
          <Link key={section.id} href={section.path}>
            <button
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                isActive(section.path)
                  ? "bg-primary-light text-primary"
                  : "text-text-secondary hover:bg-bg-main"
              }`}
            >
              <section.icon size={20} />
              <span className="flex-1">{section.title}</span>
              <IconChevronRight size={16} className="text-text-muted" />
            </button>
          </Link>
        ))}
      </div>
    </aside>
  );
}
