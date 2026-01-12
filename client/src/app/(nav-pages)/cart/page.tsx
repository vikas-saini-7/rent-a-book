"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import {
  IconTrash,
  IconShoppingCart,
  IconArrowLeft,
  IconAlertCircle,
} from "@tabler/icons-react";

function CartPageContent() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalRental,
    getTotalDeposit,
    clearCart,
  } = useCart();
  const { user } = useAuth();

  const totalRental = getTotalRental();
  const totalDeposit = getTotalDeposit();

  const depositBalance = user?.depositBalance
    ? typeof user.depositBalance === "string"
      ? parseFloat(user.depositBalance)
      : user.depositBalance
    : 0;
  const lockedBalance = user?.lockedBalance
    ? typeof user.lockedBalance === "string"
      ? parseFloat(user.lockedBalance)
      : user.lockedBalance
    : 0;

  const availableDeposit = Math.max(0, depositBalance - lockedBalance);
  const hasEnoughDeposit = availableDeposit >= totalDeposit;
  const depositShortfall = Math.max(0, totalDeposit - availableDeposit);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto px-6 py-16 w-full flex items-center justify-center">
          <div className="text-center">
            <IconShoppingCart
              size={64}
              className="mx-auto text-text-muted mb-4"
            />
            <h1 className="text-2xl font-heading text-text-primary mb-2">
              Your cart is empty
            </h1>
            <p className="text-text-secondary mb-6">
              Explore our collection and add books to your cart.
            </p>
            <button
              onClick={() => router.push("/collection")}
              className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors"
            >
              Browse Books
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary hover:text-primary-hover mb-6 transition-colors"
        >
          <IconArrowLeft size={20} />
          <span>Continue Shopping</span>
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading text-text-primary mb-2">
            Your Cart
          </h1>
          <p className="text-text-secondary">
            {cart.length} {cart.length === 1 ? "book" : "books"} ready to rent
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.bookId}
                className="bg-white border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Book Cover */}
                  <div className="shrink-0 w-24 h-32 bg-primary-light rounded overflow-hidden">
                    <img
                      src="https://klacey.com/wp-content/uploads/Book-cover-illustration-service-by-freelance-illustrator-Kati-Lacey.webp"
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-text-primary mb-1 truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-muted mb-2">
                      {item.author}
                    </p>
                    <p className="text-xs text-text-secondary mb-3">
                      {item.libraryName} • {item.availableCopies} available
                    </p>

                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-text-secondary">
                          Rental:{" "}
                          <span className="font-semibold text-primary">
                            ₹{item.rentalPricePerWeek}/week
                          </span>
                        </p>
                        <p className="text-xs text-text-muted">
                          Deposit: ₹{item.depositAmount}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.bookId, item.quantity - 1)
                            }
                            className="px-2 py-1 text-text-secondary hover:bg-bg-main transition-colors text-sm"
                            disabled={item.quantity <= 1}
                          >
                            −
                          </button>
                          <span className="px-3 py-1 text-text-primary font-medium text-sm min-w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.bookId, item.quantity + 1)
                            }
                            className="px-2 py-1 text-text-secondary hover:bg-bg-main transition-colors text-sm"
                            disabled={item.quantity >= item.availableCopies}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.bookId)}
                          className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                          title="Remove from cart"
                        >
                          <IconTrash size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="w-full py-2 text-sm text-error hover:text-error/80 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Total Rental/Week</span>
                  <span className="font-semibold text-text-primary">
                    ₹{totalRental.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Total Deposit</span>
                  <span className="font-semibold text-text-primary">
                    ₹{totalDeposit.toFixed(2)}
                  </span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">
                      Your Available Deposit
                    </span>
                    <span
                      className={`font-semibold ${
                        hasEnoughDeposit ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      ₹{availableDeposit.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {!hasEnoughDeposit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex gap-2 items-start">
                    <IconAlertCircle
                      size={20}
                      className="text-red-600 shrink-0 mt-0.5"
                    />
                    <div className="text-sm">
                      <p className="text-red-800 font-medium mb-1">
                        Insufficient Deposit
                      </p>
                      <p className="text-red-600">
                        Add ₹{depositShortfall.toFixed(2)} more to proceed.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {hasEnoughDeposit ? (
                  <button className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors">
                    Proceed to Rent
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/deposit")}
                    className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-colors"
                  >
                    Add Deposit
                  </button>
                )}

                <button
                  onClick={() => router.push("/collection")}
                  className="w-full px-6 py-3 border border-border text-text-secondary hover:border-primary hover:text-primary rounded-lg font-semibold transition-colors"
                >
                  Add More Books
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-text-muted text-center">
                  Deposits are refundable when you return the books in good
                  condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
    </div>
  );
}

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartPageContent />
    </ProtectedRoute>
  );
}
