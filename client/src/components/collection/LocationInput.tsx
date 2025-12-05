"use client";

import React, { useState } from "react";
import { IconMapPin, IconCurrentLocation } from "@tabler/icons-react";

const LocationInput = () => {
  const [location, setLocation] = useState("");

  const handleGetCurrentLocation = () => {
    // In a real app, this would use the Geolocation API
    setLocation("Detecting location...");
    setTimeout(() => {
      setLocation("New Delhi, India");
    }, 1000);
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
            onChange={(e) => setLocation(e.target.value)}
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
