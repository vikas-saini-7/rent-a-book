import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  depositBalance: string;
  lockedBalance: string;
  isPremium: boolean;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  fullName?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface WalletBalance {
  depositBalance: string;
  lockedBalance: string;
}

/**
 * Get current user's profile
 */
export const getProfile = async (): Promise<Profile> => {
  const response = await axios.get(`${API_URL}/api/profile`);
  return response.data.data;
};

/**
 * Update current user's profile
 */
export const updateProfile = async (
  data: UpdateProfileData
): Promise<Profile> => {
  const response = await axios.put(`${API_URL}/api/profile`, data);
  return response.data.data;
};

/**
 * Get current user's wallet balance
 */
export const getWalletBalance = async (): Promise<WalletBalance> => {
  const response = await axios.get(`${API_URL}/api/profile/wallet`);
  return response.data.data;
};

/**
 * Delete current user's account
 */
export const deleteAccount = async (): Promise<void> => {
  await axios.delete(`${API_URL}/api/profile`);
};
