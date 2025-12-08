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
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <IconMapPin
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          size={18}
        />
        <input
          type="text"
          placeholder="Location or pincode"
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-bg-card border border-border rounded-md text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <button
        onClick={handleGetCurrentLocation}
        title="Use current location"
        className="p-2 bg-bg-card border border-border text-text-muted rounded-md hover:border-primary hover:text-primary transition-colors"
      >
        <IconCurrentLocation size={18} />
      </button>
    </div>
  );
};

export default LocationInput;
