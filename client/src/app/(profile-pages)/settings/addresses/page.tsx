"use client";

import { useState, useEffect } from "react";
import {
  addressService,
  Address,
  CreateAddressDto,
  UpdateAddressDto,
} from "@/services/address.service";
import AddressModal from "@/components/settings/AddressModal";
import { IconMapPin, IconEdit, IconTrash } from "@tabler/icons-react";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await addressService.getAllAddresses();
      setAddresses(data);
    } catch (err) {
      console.error("Failed to load addresses:", err);
      setError("Failed to load addresses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (address?: Address) => {
    setSelectedAddress(address || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAddress(null);
  };

  const handleSaveAddress = async (
    data: CreateAddressDto | UpdateAddressDto
  ) => {
    try {
      setIsSaving(true);
      setError(null);

      if (selectedAddress) {
        await addressService.updateAddress(selectedAddress.id, data);
      } else {
        await addressService.createAddress(data as CreateAddressDto);
      }

      await loadAddresses();
      handleCloseModal();
    } catch (err) {
      console.error("Failed to save address:", err);
      setError(err instanceof Error ? err.message : "Failed to save address");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      setError(null);
      await addressService.deleteAddress(id);
      await loadAddresses();
    } catch (err) {
      console.error("Failed to delete address:", err);
      setError("Failed to delete address");
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      setError(null);
      await addressService.setDefaultAddress(id);
      await loadAddresses();
    } catch (err) {
      console.error("Failed to set default address:", err);
      setError("Failed to set default address");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-32 bg-bg-main rounded animate-pulse" />
          <div className="h-5 w-20 bg-bg-main rounded animate-pulse" />
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="p-4 border border-border rounded-md">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-24 bg-bg-main rounded animate-pulse" />
                  <div className="h-4 w-full bg-bg-main rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-bg-main rounded animate-pulse" />
                </div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-bg-main rounded animate-pulse" />
                  <div className="h-8 w-8 bg-bg-main rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Saved Addresses
          </h2>
          <button
            onClick={() => handleOpenModal()}
            className="text-sm text-primary hover:underline"
          >
            + Add New
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-md text-sm text-error">
            {error}
          </div>
        )}

        {addresses.length === 0 ? (
          <div className="text-center py-8">
            <IconMapPin
              size={48}
              className="mx-auto text-text-muted mb-3"
              stroke={1.5}
            />
            <p className="text-text-muted mb-4">No addresses saved yet</p>
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
            >
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="p-4 border border-border rounded-md hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {address.label && (
                        <p className="font-medium text-text-primary">
                          {address.label}
                        </p>
                      )}
                      {address.isDefault && (
                        <span className="px-2 py-0.5 bg-primary-light text-primary text-xs rounded">
                          Default
                        </span>
                      )}
                    </div>
                    {address.fullName && (
                      <p className="text-sm text-text-secondary">
                        {address.fullName}
                      </p>
                    )}
                    <p className="text-sm text-text-secondary mt-1">
                      {address.addressLine1}
                      {address.addressLine2 && `, ${address.addressLine2}`}
                      <br />
                      {address.city}, {address.state} {address.postalCode}
                      {address.country && address.country !== "India" && (
                        <>, {address.country}</>
                      )}
                    </p>
                    {address.phone && (
                      <p className="text-sm text-text-muted mt-1">
                        {address.phone}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal(address)}
                      className="p-2 text-text-muted hover:text-primary hover:bg-primary-light rounded-md transition-colors"
                      title="Edit address"
                    >
                      <IconEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="p-2 text-text-muted hover:text-error hover:bg-error/10 rounded-md transition-colors"
                      title="Delete address"
                    >
                      <IconTrash size={18} />
                    </button>
                  </div>
                </div>

                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="mt-3 text-sm text-primary hover:underline"
                  >
                    Set as default
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAddress}
        address={selectedAddress}
        isLoading={isSaving}
      />
    </>
  );
}
