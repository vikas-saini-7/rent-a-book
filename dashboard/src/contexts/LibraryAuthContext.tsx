"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Configure axios to always send cookies
axios.defaults.withCredentials = true;

interface Library {
  id: string;
  name: string;
  email: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  phone?: string;
  operatingHours?: string;
}

interface LibraryAuthContextType {
  library: Library | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  description?: string;
  imageUrl?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  phone?: string;
  operatingHours?: string;
}

const LibraryAuthContext = createContext<LibraryAuthContextType | undefined>(
  undefined
);

export const useLibraryAuth = () => {
  const context = useContext(LibraryAuthContext);
  if (!context) {
    throw new Error("useLibraryAuth must be used within LibraryAuthProvider");
  }
  return context;
};

export const LibraryAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [library, setLibrary] = useState<Library | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedLibrary = localStorage.getItem("library");
      if (storedLibrary) {
        setLibrary(JSON.parse(storedLibrary));
      }
    } catch (error) {
      console.error("Error checking auth:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/library/auth/login`,
        { email, password }
      );

      setLibrary(data.data.library);
      localStorage.setItem("library", JSON.stringify(data.data.library));
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (registerData: RegisterData) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/library/auth/register`,
        registerData
      );

      setLibrary(data.data.library);
      localStorage.setItem("library", JSON.stringify(data.data.library));
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/library/auth/logout`,
        {}
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLibrary(null);
      localStorage.removeItem("library");
    }
  };

  return (
    <LibraryAuthContext.Provider
      value={{
        library,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!library,
      }}
    >
      {children}
    </LibraryAuthContext.Provider>
  );
};
