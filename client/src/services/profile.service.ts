import axiosInstance from "@/lib/axios";

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
  const response = await axiosInstance.get("/api/profile");
  return response.data.data;
};

/**
 * Update current user's profile
 */
export const updateProfile = async (
  data: UpdateProfileData
): Promise<Profile> => {
  const response = await axiosInstance.put("/api/profile", data);
  return response.data.data;
};

/**
 * Get current user's wallet balance
 */
export const getWalletBalance = async (): Promise<WalletBalance> => {
  const response = await axiosInstance.get("/api/profile/wallet");
  return response.data.data;
};

/**
 * Delete current user's account
 */
export const deleteAccount = async (): Promise<void> => {
  await axiosInstance.delete("/api/profile");
};
