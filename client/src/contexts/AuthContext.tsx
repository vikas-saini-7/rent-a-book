"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Configure axios to always send cookies
axios.defaults.withCredentials = true;

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Setup axios interceptor for token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Access token expired" &&
      !originalRequest._retry
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
        const response = await axios.post(`${API_URL}/api/auth/refresh`);

        if (response.data.success) {
          const { accessToken } = response.data.data;

          // Update localStorage and axios defaults
          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
          }

          processQueue(null, accessToken);
          isRefreshing = false;

          // Retry the original request
          return axios(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Refresh failed - clear auth state
        sessionStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        delete axios.defaults.headers.common["Authorization"];

        // Redirect to login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

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

  // Check authentication status on mount by trying to get user profile
  // or checking if cookies exist (the backend will validate)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get profile or validate session with backend
        const userData = sessionStorage.getItem("user");
        const accessToken = localStorage.getItem("accessToken");

        if (userData) {
          setUser(JSON.parse(userData));
        }

        // Set axios header if token exists
        if (accessToken) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const userData = response.data.data.user;
        const { accessToken } = response.data.data;

        setUser(userData);

        // Store tokens
        sessionStorage.setItem("user", JSON.stringify(userData));
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        }
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        const userData = response.data.data.user;
        const { accessToken } = response.data.data;

        setUser(userData);

        // Store tokens
        sessionStorage.setItem("user", JSON.stringify(userData));
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;
        }
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Signup failed";
      throw new Error(message);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      sessionStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      delete axios.defaults.headers.common["Authorization"];
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
