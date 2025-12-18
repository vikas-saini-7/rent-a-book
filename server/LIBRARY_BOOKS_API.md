# Library Book Management APIs

APIs for librarians to manage books on the RentABook platform.

## Authentication

All endpoints require library authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <libraryAccessToken>
```

## Base URL

```
/api/library/books
```

---

## Endpoints

### 1. Create New Book

Create a new book on the platform and add it to your library inventory.

**Endpoint:** `POST /api/library/books/create`

**Request Body:**

```json
{
  "title": "The Great Gatsby",
  "authorName": "F. Scott Fitzgerald",
  "genreName": "Fiction",
  "isbn": "9780743273565",
  "description": "The story of the mysteriously wealthy Jay Gatsby...",
  "coverImage": "https://example.com/cover.jpg",
  "publisher": "Scribner",
  "publishedYear": 1925,
  "language": "English",
  "totalPages": 180,
  "rentalPricePerWeek": 50.0,
  "depositAmount": 200.0,
  "condition": "good",
  "totalCopies": 5
}
```

**Response:**

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "book": { ... },
    "libraryBook": { ... },
    "author": { ... },
    "genre": { ... }
  }
}
```

---

### 2. Get Library Books

Get all books in your library inventory with pagination and search.

**Endpoint:** `GET /api/library/books`

**Query Parameters:**

- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20) - Items per page
- `search` (optional) - Search in title, author name, or ISBN

**Example:** `GET /api/library/books?page=1&limit=20&search=gatsby`

**Response:**

```json
{
  "success": true,
  "data": {
    "books": [
      {
        "id": 1,
        "title": "The Great Gatsby",
        "author": { "id": 1, "name": "F. Scott Fitzgerald" },
        "genre": { "id": 1, "name": "Fiction" },
        "libraryBook": {
          "totalCopies": 5,
          "availableCopies": 3,
          "isAvailable": true
        },
        ...
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

---

### 3. Update Book Details

Update book information (title, author, price, etc.).

**Endpoint:** `PUT /api/library/books/:bookId`

**Request Body:** (all fields optional)

```json
{
  "title": "Updated Title",
  "authorName": "Updated Author",
  "genreName": "Updated Genre",
  "description": "Updated description",
  "rentalPricePerWeek": 60.0,
  "depositAmount": 250.0,
  "condition": "like_new"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": { ... }
}
```

---

### 4. Delete Book

Delete a book from the platform. Only allowed if book is not in other libraries.

**Endpoint:** `DELETE /api/library/books/:bookId`

**Response:**

```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

---

### 5. Add Existing Book to Library

Add an existing book from the platform to your library inventory.

**Endpoint:** `POST /api/library/books/add`

**Request Body:**

```json
{
  "bookId": 123,
  "totalCopies": 3
}
```

**Response:**

```json
{
  "success": true,
  "message": "Book added to library inventory",
  "data": { ... }
}
```

---

### 6. Update Book Stock

Update the total copies or available copies for a book in your library.

**Endpoint:** `PATCH /api/library/books/:bookId/stock`

**Request Body:**

```json
{
  "totalCopies": 10,
  "availableCopies": 8
}
```

**Response:**

```json
{
  "success": true,
  "message": "Book stock updated successfully",
  "data": { ... }
}
```

---

### 7. Remove Book from Library

Remove a book from your library inventory (doesn't delete from platform).

**Endpoint:** `DELETE /api/library/books/:bookId/remove`

**Response:**

```json
{
  "success": true,
  "message": "Book removed from library inventory"
}
```

---

## Book Condition Enum

- `new`
- `like_new`
- `good`
- `fair`
- `poor`

## Error Responses

All endpoints may return error responses in this format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

Common status codes:

- `400` - Bad Request
- `401` - Unauthorized (no/invalid token)
- `404` - Resource not found
- `500` - Server error
