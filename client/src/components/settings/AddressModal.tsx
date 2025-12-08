"use client";

import { useState, useEffect } from "react";
import {
  Address,
  CreateAddressDto,
  UpdateAddressDto,
} from "@/services/address.service";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateAddressDto | UpdateAddressDto) => void;
  address?: Address | null;
  isLoading?: boolean;
}

export default function AddressModal({
  isOpen,
  onClose,
  onSave,
  address,
  isLoading = false,
}: AddressModalProps) {
  const [formData, setFormData] = useState<CreateAddressDto>({
    label: "",
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  });

  useEffect(() => {
    if (address) {
      setFormData({
        label: address.label || "",
        fullName: address.fullName || "",
        phone: address.phone || "",
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || "",
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country || "India",
        isDefault: address.isDefault,
      });
    } else {
      // Reset form for new address
      setFormData({
        label: "",
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        isDefault: false,
      });
    }
  }, [address, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-2xl bg-bg-card border border-border rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {address ? "Edit Address" : "Add New Address"}
          </h3>
          <button
            className="text-text-muted hover:text-text-primary"
            onClick={onClose}
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-muted mb-1">
                Label (Optional)
              </label>
              <input
                type="text"
                name="label"
                value={formData.label}
                onChange={handleChange}
                placeholder="e.g., Home, Office"
                className="w-full px-3 py-2.5 bg-bg-main border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm text-text-muted mb-1">
                Full Name (Optional)
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Recipient name"
                className="w-full px-3 py-2.5 bg-bg-main border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-muted mb-1">
              Phone (Optional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Contact number"
              className="w-full px-3 py-2.5 bg-bg-main border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm text-text-muted mb-1">
              Address Line 1 <span className="text-error">*</span>
            </label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              placeholder="Street address, building name"
              required
              className="w-full px-3 py-2.5 bg-bg-main border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm text-text-muted mb-1">
              Address Line 2 (Optional)
            </label>
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              placeholder="Apartment, suite, unit number"
              className="w-full px-3 py-2.5 bg-bg-main border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-text-muted mb-1">
                City <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
                className="w-full px-3 py-2.5 bg-bg-main border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm text-text-muted mb-1">
                State <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                required
                className="w-full px-3 py-2.5 bg-bg-main border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm text-text-muted mb-1">
                Postal Code <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="PIN code"
                required
                className="w-full px-3 py-2.5 bg-bg-main border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-muted mb-1">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full px-3 py-2.5 bg-bg-main border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="w-4 h-4 text-primary bg-bg-main border-border rounded focus:ring-primary"
            />
            <label
              htmlFor="isDefault"
              className="text-sm text-text-secondary cursor-pointer"
            >
              Set as default address
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-4 py-2 border border-border text-text-secondary rounded-md hover:bg-bg-main transition-colors"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
