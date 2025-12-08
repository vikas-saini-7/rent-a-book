"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconEdit,
  IconCamera,
  IconWallet,
  IconLoader2,
} from "@tabler/icons-react";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <IconLoader2 className="animate-spin text-primary" size={40} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        <h1 className="text-3xl font-heading text-text-primary mb-8">
          My Profile
        </h1>

        {/* Profile Header */}
        <div className="bg-bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center">
                  <IconUser size={40} className="text-primary" />
                </div>
              )}
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary-hover transition-colors">
                <IconCamera size={16} />
              </button>
            </div>

            {/* Info */}
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-semibold text-text-primary">
                {user.fullName}
              </h2>
              <p className="text-text-muted">
                Member since{" "}
                {new Date(user.createdAt || "").toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm text-text-secondary mt-1">
                {user.isPremium ? "Premium Member" : "Standard Member"}
              </p>
            </div>

            {/* Edit Button */}
            <Link
              href="/settings/account"
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-md text-text-secondary hover:border-primary hover:text-primary transition-colors"
            >
              <IconEdit size={18} />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="bg-bg-card border border-border rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
            <IconWallet size={20} />
            Wallet Balance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-bg-main rounded-lg p-4">
              <p className="text-sm text-text-muted mb-1">Total Deposit</p>
              <p className="text-2xl font-semibold text-primary">
                ₹{parseFloat(user.depositBalance || "0").toFixed(2)}
              </p>
            </div>
            <div className="bg-bg-main rounded-lg p-4">
              <p className="text-sm text-text-muted mb-1">Locked in Rentals</p>
              <p className="text-2xl font-semibold text-orange-500">
                ₹{parseFloat(user.lockedBalance || "0").toFixed(2)}
              </p>
            </div>
            <div className="bg-bg-main rounded-lg p-4">
              <p className="text-sm text-text-muted mb-1">Available Balance</p>
              <p className="text-2xl font-semibold text-green-600">
                ₹
                {(
                  parseFloat(user.depositBalance || "0") -
                  parseFloat(user.lockedBalance || "0")
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-text-primary mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bg-main flex items-center justify-center">
                <IconUser size={18} className="text-text-muted" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text-muted">Full Name</p>
                <p className="text-text-primary">{user.fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bg-main flex items-center justify-center">
                <IconMail size={18} className="text-text-muted" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Email</p>
                <p className="text-text-primary">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bg-main flex items-center justify-center">
                <IconPhone size={18} className="text-text-muted" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text-muted">Phone</p>
                <p className="text-text-primary">{user.phone || "-"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-bg-main flex items-center justify-center">
                <IconMapPin size={18} className="text-text-muted" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Address</p>
                <p className="text-text-primary">-</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
