import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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
  private getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
  }

  async getAllAddresses(): Promise<Address[]> {
    const response = await axios.get(
      `${API_URL}/api/addresses`,
      this.getAuthHeaders()
    );
    return response.data.data;
  }

  async getAddress(id: string): Promise<Address> {
    const response = await axios.get(
      `${API_URL}/api/addresses/${id}`,
      this.getAuthHeaders()
    );
    return response.data.data;
  }

  async createAddress(addressData: CreateAddressDto): Promise<Address> {
    const response = await axios.post(
      `${API_URL}/api/addresses`,
      addressData,
      this.getAuthHeaders()
    );
    return response.data.data;
  }

  async updateAddress(
    id: string,
    addressData: UpdateAddressDto
  ): Promise<Address> {
    const response = await axios.put(
      `${API_URL}/api/addresses/${id}`,
      addressData,
      this.getAuthHeaders()
    );
    return response.data.data;
  }

  async deleteAddress(id: string): Promise<void> {
    await axios.delete(`${API_URL}/api/addresses/${id}`, this.getAuthHeaders());
  }

  async setDefaultAddress(id: string): Promise<Address> {
    const response = await axios.patch(
      `${API_URL}/api/addresses/${id}/default`,
      {},
      this.getAuthHeaders()
    );
    return response.data.data;
  }
}

export const addressService = new AddressService();
