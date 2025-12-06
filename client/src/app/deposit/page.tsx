"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import {
  IconLock,
  IconWallet,
  IconPigMoney,
  IconInfoCircle,
  IconCash,
} from "@tabler/icons-react";
import { useState } from "react";

const DepositPage = () => {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  // Placeholder data; replace with real API data when available
  const totalDeposit = 1500;
  const lockedAmount = 600; // locked in active rentals
  const availableAmount = totalDeposit - lockedAmount;

  const activeLocks = [
    {
      id: "rn-1042",
      title: "The Midnight Library",
      locked: 300,
      returnDate: "Dec 18, 2025",
    },
    {
      id: "rn-1038",
      title: "The Pragmatic Programmer",
      locked: 300,
      returnDate: "Dec 22, 2025",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg-main">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading text-text-primary">
              Deposit Wallet
            </h1>
            <p className="text-text-muted mt-1">
              Funds are locked while you have active rentals. You can rent until
              your locked amount reaches your deposit.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-4 py-2 border border-border text-text-secondary rounded-md hover:bg-bg-main transition-colors"
              onClick={() => setIsWithdrawOpen(true)}
            >
              Withdraw
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors whitespace-nowrap">
              Add Deposit
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-bg-card border border-border rounded-lg p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-primary-light flex items-center justify-center">
              <IconWallet size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Total Deposit</p>
              <p className="text-xl font-semibold text-text-primary">
                ₹{totalDeposit}
              </p>
            </div>
          </div>
          <div className="bg-bg-card border border-border rounded-lg p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-accent-secondary-light flex items-center justify-center">
              <IconLock size={20} className="text-accent-secondary" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Locked for Rentals</p>
              <p className="text-xl font-semibold text-text-primary">
                ₹{lockedAmount}
              </p>
            </div>
          </div>
          <div className="bg-bg-card border border-border rounded-lg p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-success/10 flex items-center justify-center">
              <IconPigMoney size={20} className="text-success" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Available to Rent</p>
              <p
                className={`text-xl font-semibold ${
                  availableAmount > 0 ? "text-success" : "text-error"
                }`}
              >
                ₹{availableAmount}
              </p>
            </div>
          </div>
        </div>

        {/* Active locks list */}
        <div className="bg-bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-text-primary">
              Active Rental Locks
            </h2>
            <span className="text-sm text-text-muted">
              {activeLocks.length} active
            </span>
          </div>

          {activeLocks.length === 0 ? (
            <p className="text-text-muted text-sm">
              No active rentals right now.
            </p>
          ) : (
            <div className="space-y-3">
              {activeLocks.map((lock) => (
                <div
                  key={lock.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 border border-border rounded-md"
                >
                  <div>
                    <p className="font-medium text-text-primary">
                      {lock.title}
                    </p>
                    <p className="text-xs text-text-muted">
                      Rental ID: {lock.id}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-text-secondary">
                    <span className="font-semibold text-text-primary">
                      ₹{lock.locked} locked
                    </span>
                    <span className="text-text-muted">
                      Return by {lock.returnDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info note */}
        <div className="flex items-start gap-2 text-sm text-text-muted bg-bg-card border border-border rounded-lg p-3">
          <IconInfoCircle size={16} className="text-primary mt-0.5" />
          <p>
            Your deposit is held securely. Locked amounts free up automatically
            when a rental is returned. Add more deposit to rent additional
            books, or withdraw any available amount anytime.
          </p>
        </div>
      </main>

      {/* Withdraw modal */}
      {isWithdrawOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
          <div className="w-full max-w-md bg-bg-card border border-border rounded-lg shadow-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Withdraw deposit
                </h3>
                <p className="text-sm text-text-muted">
                  Available to withdraw: ₹{availableAmount}
                </p>
              </div>
              <button
                className="text-text-muted hover:text-text-primary"
                onClick={() => setIsWithdrawOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-text-muted">Amount</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={withdrawAmount}
                  min={0}
                  max={availableAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="flex-1 px-3 py-2.5 bg-bg-main border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
                  placeholder="Enter amount"
                />
                <button
                  type="button"
                  className="px-3 py-2 bg-bg-main border border-border text-text-secondary rounded-md hover:border-primary hover:text-primary transition-colors"
                  onClick={() => setWithdrawAmount(availableAmount)}
                >
                  Max
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 border border-border text-text-secondary rounded-md hover:bg-bg-main transition-colors"
                onClick={() => setIsWithdrawOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors disabled:opacity-60"
                disabled={
                  withdrawAmount <= 0 || withdrawAmount > availableAmount
                }
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DepositPage;
