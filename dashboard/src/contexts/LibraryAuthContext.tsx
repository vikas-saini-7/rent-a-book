"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Configure axios to always send cookies
axios.defaults.withCredentials = true;

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Setup axios interceptor for token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't try to refresh if:
    // 1. Already retried
    // 2. The request itself is a refresh request
    // 3. The request is the /me endpoint (initial auth check)
    // 4. Not a 401 error
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh") &&
      !originalRequest.url?.includes("/auth/me")
    ) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh the token
        const response = await axios.post(
          `${API_URL}/api/library/auth/refresh`
        );

        if (response.data.success) {
          processQueue(null);
          isRefreshing = false;

          // Retry the original request
          return axios(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError);
        isRefreshing = false;

        // Don't redirect here - let the component handle it
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

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
      // Skip auth check on login/register pages to avoid unnecessary API calls
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        if (pathname === "/login" || pathname === "/register") {
          setLoading(false);
          return;
        }
      }

      // Call /me endpoint to verify authentication via cookies
      const response = await axios.get(`${API_URL}/api/library/auth/me`);

      if (response.data.success) {
        setLibrary(response.data.data.library);
      }
    } catch (error) {
      // Not authenticated or error - that's fine
      console.log("Not authenticated");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/library/auth/login`, {
        email,
        password,
      });

      setLibrary(data.data.library);
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
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/library/auth/logout`, {});
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLibrary(null);
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
