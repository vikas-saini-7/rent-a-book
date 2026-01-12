"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string | null;
  depositBalance?: string;
  lockedBalance?: string;
  phone?: string;
  isPremium?: boolean;
  isVerified?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount by calling /me endpoint
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Skip auth check on login/signup pages to avoid unnecessary API calls
        if (typeof window !== "undefined") {
          const pathname = window.location.pathname;
          if (pathname === "/login" || pathname === "/signup") {
            setLoading(false);
            return;
          }
        }

        // Call /me endpoint to verify authentication via cookies
        const response = await axiosInstance.get("/api/auth/me");

        if (response.data.success) {
          setUser(response.data.data.user);
        }
      } catch (error) {
        // Not authenticated or error - that's fine
        console.log("Not authenticated");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        const userData = response.data.data.user;
        setUser(userData);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        const userData = response.data.data.user;
        setUser(userData);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Signup failed";
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      // Redirect to home after logout
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
