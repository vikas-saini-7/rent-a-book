"use client";

import React, { useState, useEffect } from "react";
import { IconMapPin, IconCurrentLocation } from "@tabler/icons-react";

interface LocationInputProps {
  onLocationChange?: (location: string) => void;
  initialLocation?: string;
}

const LocationInput = ({
  onLocationChange,
  initialLocation = "",
}: LocationInputProps) => {
  const [location, setLocation] = useState(initialLocation);

  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    onLocationChange?.(newLocation);
  };

  const handleGetCurrentLocation = () => {
    // In a real app, this would use the Geolocation API
    setLocation("Detecting location...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // For now, we'll just use a placeholder
          // In production, you'd use a geocoding service
          setLocation("Current Location");
          onLocationChange?.("current");
        },
        (error) => {
          console.error("Error getting location:", error);
          setTimeout(() => {
            setLocation("New Delhi, India");
            onLocationChange?.("New Delhi");
          }, 1000);
        }
      );
    } else {
      setTimeout(() => {
        setLocation("New Delhi, India");
        onLocationChange?.("New Delhi");
      }, 1000);
    }
  };

  return (
    <div className="bg-bg-card border border-border rounded-lg p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <IconMapPin
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            size={20}
          />
          <input
            type="text"
            placeholder="Enter your location or pincode"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-bg-main border border-border rounded-md text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
          />
        </div>
        <button
          onClick={handleGetCurrentLocation}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-light text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
        >
          <IconCurrentLocation size={20} />
          <span className="whitespace-nowrap">Use Current Location</span>
        </button>
      </div>
      {location && location !== "Detecting location..." && (
        <p className="mt-3 text-sm text-text-secondary">
          Showing books available near{" "}
          <span className="font-medium text-primary">{location}</span>
        </p>
      )}
    </div>
  );
};

export default LocationInput;
