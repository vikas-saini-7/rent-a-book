# Client-Side Profile Integration

## Overview

The client application now properly integrates with the backend profile API that uses JWT authentication and `req.user.id` from the authenticate middleware.

## Key Changes

### 1. Profile Service (`/client/src/services/profile.service.ts`)

A centralized service for all profile-related API calls:

```typescript
import axios from "axios";

// Functions:
- getProfile(): Get current user's profile
- updateProfile(data): Update profile (name, phoneNumber, profileImage)
- getWalletBalance(): Get wallet and deposit balances
- deleteAccount(): Delete user account
```

**Important Notes:**

- All endpoints use `/api/profile` (no user ID in URL)
- Backend extracts user ID from JWT token via `req.user.id`
- Authentication is automatic via axios (cookies + Authorization header)

### 2. Profile Page (`/client/src/app/profile/page.tsx`)

Complete profile management with:

- ✅ Fetches profile using `getProfile()` API
- ✅ Fetches wallet balance using `getWalletBalance()` API
- ✅ Edit mode for name and phone number
- ✅ Updates profile using `updateProfile()` API
- ✅ Loading states with spinner
- ✅ Error handling with user feedback
- ✅ Profile image display (if available)
- ✅ Member since date formatting
- ✅ Wallet and deposit balance display

### 3. Account Settings (`/client/src/app/settings/account/page.tsx`)

Form-based account management:

- ✅ Fetches profile data on mount
- ✅ Editable fields: name, phoneNumber
- ✅ Email field disabled (read-only)
- ✅ Form validation
- ✅ Save button with loading state
- ✅ Success/error feedback

## Authentication Flow

1. **Login/Signup**: User authenticates via `/api/auth/login` or `/api/auth/register`
2. **Token Storage**:
   - Access token stored in httpOnly cookie (secure)
   - Access token also in localStorage (for axios headers)
   - User data in sessionStorage (quick access)
3. **API Requests**:
   - axios automatically sends cookies: `withCredentials: true`
   - axios sends Bearer token: `Authorization: Bearer <token>`
4. **Backend Middleware**:
   - `authenticate` middleware verifies token
   - Extracts user info and sets `req.user = { id, email, role }`
5. **Profile Endpoints**:
   - Get user ID from `req.user.id` (not from URL)
   - No need to pass user ID from client

## Security Benefits

✅ **No User ID in URLs**: Prevents users from accessing other users' profiles
✅ **Token-Based Auth**: User ID comes from verified JWT token
✅ **Field Restrictions**: Only allowed fields can be updated
✅ **Password Excluded**: Password never returned in API responses
✅ **Balance Protection**: Wallet balances can't be updated via profile API

## API Endpoints Used

| Endpoint              | Method | Purpose                       | Auth Required |
| --------------------- | ------ | ----------------------------- | ------------- |
| `/api/profile`        | GET    | Get current user's profile    | ✅            |
| `/api/profile`        | PUT    | Update current user's profile | ✅            |
| `/api/profile/wallet` | GET    | Get wallet balances           | ✅            |
| `/api/profile`        | DELETE | Delete account                | ✅            |

## Usage Example

```typescript
import { getProfile, updateProfile } from "@/services/profile.service";

// Get profile
const profile = await getProfile();
// No user ID needed - backend gets it from token

// Update profile
const updated = await updateProfile({
  name: "John Doe",
  phoneNumber: "+91 1234567890",
});
```

## Response Format

All profile API responses follow this structure:

```json
{
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+91 1234567890",
    "role": "user",
    "walletBalance": "100.00",
    "depositBalance": "50.00",
    "profileImage": null,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
}
```

## Testing

1. **Login** at `/login`
2. **Visit Profile** at `/profile`
3. **Edit Profile**: Click "Edit Profile", modify name/phone, click "Save"
4. **View Settings**: Go to `/settings/account` for form-based editing
5. **Check Wallet**: View wallet and deposit balances on profile page

## Error Handling

All API calls include proper error handling:

```typescript
try {
  const profile = await getProfile();
  // Handle success
} catch (error: any) {
  const message = error.response?.data?.message || "Failed to load profile";
  alert(message); // Or use a toast notification
}
```

## Future Enhancements

- [ ] Profile image upload functionality
- [ ] Replace `alert()` with toast notifications (react-hot-toast)
- [ ] Add profile image crop/resize before upload
- [ ] Add phone number validation
- [ ] Add address management
- [ ] Add email verification status display
