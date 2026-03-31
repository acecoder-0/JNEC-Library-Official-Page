# 📚 Library Management API Documentation

## 🚀 Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 👤 USER ENDPOINTS

### 1️⃣ Register User
**POST** `/users/register`

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** 201 Created
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-03-31T13:44:54.931Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2️⃣ Login User
**POST** `/users/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** 200 OK
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3️⃣ Get All Users
**GET** `/users` (Protected)

**Response:** 200 OK
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-03-31T13:44:54.931Z"
  }
]
```

---

### 4️⃣ Get User by ID
**GET** `/users/:id` (Protected)

**Response:** 200 OK
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-03-31T13:44:54.931Z"
}
```

---

### 5️⃣ Update User
**PUT** `/users/:id` (Protected)

**Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response:** 200 OK
```json
{
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

---

### 6️⃣ Delete User
**DELETE** `/users/:id` (Protected)

**Response:** 200 OK
```json
{
  "message": "User deleted successfully"
}
```

---

## 📚 BOOK ENDPOINTS

### 1️⃣ Get All Books
**GET** `/books`

**Query Parameters:**
- `category` (optional): Filter by category
- `search` (optional): Search by title or author

**Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Introduction to Algorithms",
      "author": "Thomas H. Cormen",
      "isbn": "9780262033848",
      "category": "Computer Science",
      "available": true,
      "total_copies": 5,
      "available_copies": 5,
      "added_date": "2026-03-31T13:44:04.633Z"
    }
  ],
  "count": 10
}
```

---

### 2️⃣ Get Book by ID
**GET** `/books/:id`

**Response:** 200 OK
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Introduction to Algorithms",
    "author": "Thomas H. Cormen",
    "isbn": "9780262033848",
    "category": "Computer Science",
    "publication_year": 2009,
    "available": true,
    "total_copies": 5,
    "available_copies": 5,
    "added_date": "2026-03-31T13:44:04.633Z"
  }
}
```

---

### 3️⃣ Add New Book
**POST** `/books` (Protected - Admin only)

**Body:**
```json
{
  "title": "New Book Title",
  "author": "Author Name",
  "isbn": "9780000000000",
  "category": "Category Name",
  "total_copies": 5
}
```

**Response:** 201 Created
```json
{
  "success": true,
  "message": "Book added successfully",
  "data": {
    "id": 11,
    "title": "New Book Title",
    "author": "Author Name",
    "isbn": "9780000000000",
    "category": "Category Name",
    "total_copies": 5,
    "available_copies": 5
  }
}
```

---

### 4️⃣ Update Book
**PUT** `/books/:id` (Protected - Admin only)

**Body:**
```json
{
  "title": "Updated Title",
  "author": "Updated Author",
  "category": "Updated Category",
  "total_copies": 10
}
```

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": { /* updated book object */ }
}
```

---

### 5️⃣ Delete Book
**DELETE** `/books/:id` (Protected - Admin only)

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

---

## 📦 ISSUE/RETURN ENDPOINTS

### 1️⃣ Issue Book to User
**POST** `/books/issue` (Protected)

**Body:**
```json
{
  "book_id": 1,
  "days": 14
}
```

**Response:** 201 Created
```json
{
  "success": true,
  "message": "Book issued successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "book_id": 1,
    "issue_date": "2026-03-31T13:44:54.931Z",
    "due_date": "2026-04-14T13:44:54.931Z",
    "status": "issued"
  }
}
```

---

### 2️⃣ Return Book
**POST** `/books/return/:issueId` (Protected)

**Response:** 200 OK
```json
{
  "success": true,
  "message": "Book returned successfully",
  "data": {
    "id": 1,
    "user_id": 1,
    "book_id": 1,
    "issue_date": "2026-03-31T13:44:54.931Z",
    "due_date": "2026-04-14T13:44:54.931Z",
    "return_date": "2026-04-05T13:44:54.931Z",
    "fine": 0,
    "status": "returned"
  }
}
```

---

### 3️⃣ Get User's Issued Books
**GET** `/books/issued` (Protected)

**Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "book_id": 1,
      "issue_date": "2026-03-31T13:44:54.931Z",
      "due_date": "2026-04-14T13:44:54.931Z",
      "return_date": null,
      "fine": 0,
      "status": "issued"
    }
  ]
}
```

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "error": "All fields are required"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid email or password"
}
```

### 404 Not Found
```json
{
  "error": "User not found"
}
```

### 409 Conflict
```json
{
  "error": "Email already exists"
}
```

### 500 Server Error
```json
{
  "error": "Failed to fetch users"
}
```

---

## 🧪 Test Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@library.com | 123456 | admin |
| john@example.com | 123456 | user |
| jane@example.com | 123456 | user |

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- JWT tokens expire after 7 days
- Protected routes require valid token in `Authorization: Bearer <token>` header
- Admin routes can only be accessed by users with `role: 'admin'`
- Books with `available_copies > 0` can be issued
- Fine is calculated as: `overdue_days * 5` (₹5 per day)
