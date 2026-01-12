import axiosInstance from "@/lib/axios";

export interface Address {
  id: string;
  userId: string;
  label?: string;
  fullName?: string;
  phone?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressDto {
  label?: string;
  fullName?: string;
  phone?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  isDefault?: boolean;
}

export interface UpdateAddressDto extends Partial<CreateAddressDto> {}

class AddressService {
  async getAllAddresses(): Promise<Address[]> {
    const response = await axiosInstance.get("/api/addresses");
    return response.data.data;
  }

  async getAddress(id: string): Promise<Address> {
    const response = await axiosInstance.get(`/api/addresses/${id}`);
    return response.data.data;
  }

  async createAddress(addressData: CreateAddressDto): Promise<Address> {
    const response = await axiosInstance.post("/api/addresses", addressData);
    return response.data.data;
  }

  async updateAddress(
    id: string,
    addressData: UpdateAddressDto
  ): Promise<Address> {
    const response = await axiosInstance.put(
      `/api/addresses/${id}`,
      addressData
    );
    return response.data.data;
  }

  async deleteAddress(id: string): Promise<void> {
    await axiosInstance.delete(`/api/addresses/${id}`);
  }

  async setDefaultAddress(id: string): Promise<Address> {
    const response = await axiosInstance.patch(
      `/api/addresses/${id}/default`,
      {}
    );
    return response.data.data;
  }
}

export const addressService = new AddressService();
