# Profile API Documentation

## Overview

The Profile API provides endpoints for managing user profiles. All endpoints require authentication via JWT token.

## Authentication

All profile endpoints require a valid JWT access token. The token can be provided in two ways:

1. **Authorization Header**: `Authorization: Bearer <token>`
2. **Cookie**: `accessToken=<token>`

## Endpoints

### 1. Get Current User Profile

Get the authenticated user's profile information.

**Endpoint**: `GET /api/profile`

**Headers**:

```
Authorization: Bearer <access_token>
```

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "role": "user",
    "walletBalance": "100.00",
    "depositBalance": "50.00",
    "profileImage": "https://example.com/image.jpg",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

**Error Responses**:

- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: User not found

---

### 2. Update Current User Profile

Update the authenticated user's profile information.

**Endpoint**: `PUT /api/profile`

**Headers**:

```
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Allowed Fields**:

- `name` (string): User's full name
- `phoneNumber` (string): User's phone number
- `profileImage` (string): URL to profile image

**Request Body**:

```json
{
  "name": "John Smith",
  "phoneNumber": "+1234567890",
  "profileImage": "https://example.com/new-image.jpg"
}
```

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "uuid",
    "name": "John Smith",
    "email": "john@example.com",
    "phoneNumber": "+1234567890",
    "role": "user",
    "walletBalance": "100.00",
    "depositBalance": "50.00",
    "profileImage": "https://example.com/new-image.jpg",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
}
```

**Error Responses**:

- `400 Bad Request`: No valid fields to update
- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: User not found

**Security Notes**:

- Sensitive fields like `password`, `role`, `walletBalance`, and `depositBalance` cannot be updated through this endpoint
- Only allowed fields will be processed; other fields will be ignored

---

### 3. Get Wallet Balance

Get the authenticated user's wallet and deposit balances.

**Endpoint**: `GET /api/profile/wallet`

**Headers**:

```
Authorization: Bearer <access_token>
```

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Wallet balance fetched successfully",
  "data": {
    "walletBalance": "100.00",
    "depositBalance": "50.00"
  }
}
```

**Error Responses**:

- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: User not found

---

### 4. Delete Account

Delete the authenticated user's account permanently.

**Endpoint**: `DELETE /api/profile`

**Headers**:

```
Authorization: Bearer <access_token>
```

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

**Error Responses**:

- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: User not found

**Notes**:

- This action is permanent and cannot be undone
- All cookies (accessToken, refreshToken) will be cleared
- Associated data may be deleted based on cascade rules

---

## Testing with curl

### Get Profile

```bash
curl -X GET http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Update Profile

```bash
curl -X PUT http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "phoneNumber": "+1234567890"
  }'
```

### Get Wallet Balance

```bash
curl -X GET http://localhost:5000/api/profile/wallet \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Delete Account

```bash
curl -X DELETE http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Implementation Details

### Authentication Middleware

The `authenticate` middleware:

1. Checks for token in `Authorization` header (Bearer token)
2. Falls back to `accessToken` cookie if header is not present
3. Verifies the token using JWT
4. Attaches user info (`id`, `email`, `role`) to `req.user`
5. Throws `401 Unauthorized` if token is missing or invalid

### Service Layer

- **Error Handling**: Uses `AppError` class for operational errors
- **Security**: Password field is never returned in responses
- **Validation**: Only allowed fields can be updated
- **Database**: Uses Drizzle ORM with PostgreSQL

### Controller Layer

- **User Context**: Gets user ID from `req.user.id` (set by authenticate middleware)
- **No URL Parameters**: User ID is not taken from URL params for security
- **Async/Await**: Uses `asyncHandler` to catch async errors
- **Consistent Responses**: All responses follow the same structure
