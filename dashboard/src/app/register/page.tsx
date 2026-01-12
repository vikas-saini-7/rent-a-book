"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLibraryAuth } from "@/contexts/LibraryAuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useLibraryAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    description: "",
    imageUrl: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    phone: "",
    operatingHours: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
    }

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      router.push("/overview");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-text-primary mb-2">
            Library Dashboard
          </h1>
          <p className="text-text-secondary">
            Register your library to get started
          </p>
        </div>

        <div className="bg-bg-card rounded-lg shadow-sm border border-border p-8">
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                1
              </div>
              <div
                className={`w-24 h-1 ${
                  step >= 2 ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                2
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-text-primary mb-6">
            {step === 1 ? "Basic Information" : "Library Details"}
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleNextStep} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Library Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Central City Library"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="library@example.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Min. 6 characters"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Re-enter password"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="+91 1234567890"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Brief description of your library"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-md transition-colors"
              >
                Next Step
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="addressLine1"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Street address"
                />
              </div>

              <div>
                <label
                  htmlFor="addressLine2"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Apartment, suite, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="State"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="123456"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="India"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="operatingHours"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Operating Hours
                </label>
                <input
                  type="text"
                  id="operatingHours"
                  name="operatingHours"
                  value={formData.operatingHours}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="Mon-Fri: 9AM-6PM"
                />
              </div>

              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-text-primary mb-2"
                >
                  Library Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="https://example.com/library-image.jpg"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-text-primary font-medium py-3 rounded-md transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary hover:bg-primary-hover text-white font-medium py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Registering..." : "Complete Registration"}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary-hover font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
