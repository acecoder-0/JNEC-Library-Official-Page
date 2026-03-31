# 🚀 React Frontend Integration Guide

## 📋 Quick Start

Your React app is now connected to the backend APIs with the following structure:

```
src/
├── api/
│   ├── apiClient.js        # Axios instance + API endpoints
│   └── hooks.js            # Custom React hooks for API calls
├── components/
│   ├── BookList.jsx        # Display all books with search/filter
│   ├── LoginRegister.jsx   # User authentication
│   └── IssueBook.jsx       # Issue and return books
└── styles/
    ├── BookList.css
    ├── Auth.css
    └── IssueBook.css
```

---

## 🔧 Installation

### 1️⃣ Install Dependencies

```bash
npm install axios
```

### 2️⃣ Update `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## 📱 Usage Examples

### 1️⃣ Display All Books

```jsx
import BookList from './components/BookList'

export default function App() {
  return (
    <div>
      <BookList />
    </div>
  )
}
```

### 2️⃣ Login/Register

```jsx
import LoginRegister from './components/LoginRegister'
import { useState } from 'react'

export default function App() {
  const [user, setUser] = useState(null)

  const handleLoginSuccess = (userData, token) => {
    setUser(userData)
    // Now user is logged in
  }

  if (!user) {
    return <LoginRegister onLoginSuccess={handleLoginSuccess} />
  }

  return <div>Welcome {user.name}!</div>
}
```

### 3️⃣ Issue/Return Books

```jsx
import IssueBook from './components/IssueBook'

export default function App() {
  return <IssueBook />
}
```

---

## 🎯 API Hooks Usage

### Get All Books

```jsx
import { useBooks } from './api/hooks'
import { useEffect, useState } from 'react'

export default function MyComponent() {
  const [books, setBooks] = useState([])
  const { loading, error, getBooks } = useBooks()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks()
        setBooks(data.data)
      } catch (err) {
        console.error('Error:', err)
      }
    }
    fetchBooks()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  )
}
```

---

### Register User

```jsx
import { useUsers } from './api/hooks'
import { useState } from 'react'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register, loading, error } = useUsers()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await register({
        name: 'John',
        email,
        password,
      })
      localStorage.setItem('token', response.token)
      alert('Registration successful!')
    } catch (err) {
      console.error('Registration failed:', err)
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}
```

---

### Issue a Book

```jsx
import { useBooks } from './api/hooks'
import { useState } from 'react'

export default function IssueBookForm() {
  const [bookId, setBookId] = useState('')
  const [days, setDays] = useState(14)
  const { issueBook, loading } = useBooks()

  const handleIssue = async (e) => {
    e.preventDefault()
    try {
      const response = await issueBook({
        book_id: parseInt(bookId),
        days: parseInt(days),
      })
      alert('Book issued successfully!')
      console.log(response.data)
    } catch (err) {
      alert(`Error: ${err.response?.data?.error}`)
    }
  }

  return (
    <form onSubmit={handleIssue}>
      <input
        type="number"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        placeholder="Book ID"
      />
      <input
        type="number"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        min="1"
        max="30"
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Issuing...' : 'Issue Book'}
      </button>
    </form>
  )
}
```

---

## 🔐 Authentication Flow

### 1️⃣ Store Token After Login

```jsx
const response = await userAPI.login({ email, password })
localStorage.setItem('token', response.token)
localStorage.setItem('user', JSON.stringify(response.user))
```

### 2️⃣ Automatic Token Injection

The `apiClient.js` automatically adds the token to all requests:

```javascript
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### 3️⃣ Handle Token Expiration

```javascript
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

---

## 💾 State Management (Optional)

If you want to use Context API for global state:

```jsx
// AuthContext.jsx
import { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  const login = (userData, userToken) => {
    setUser(userData)
    setToken(userToken)
    localStorage.setItem('token', userToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

Use it in `main.jsx`:

```jsx
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
```

---

## 🛡️ Protected Routes (Optional)

```jsx
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import LoginRegister from './components/LoginRegister'

export function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext)

  if (!token) {
    return <LoginRegister />
  }

  return children
}

// Usage:
<ProtectedRoute>
  <IssueBook />
</ProtectedRoute>
```

---

## 🚨 Error Handling

All API calls pass through error handlers:

```jsx
const { loading, error, getBooks } = useBooks()

try {
  const data = await getBooks()
  // Success
} catch (err) {
  console.error(error) // Error is automatically set
}
```

Error messages from backend:

- **Invalid email/password**: `"Invalid email or password"`
- **Email already exists**: `"Email already exists"`
- **Missing fields**: `"All fields are required"`
- **Unauthorized**: `"Token is invalid or expired"`
- **Book not found**: `"Book not found"`

---

## 📧 Environment Variables (Optional)

Create `.env` in root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Update `api/apiClient.js`:

```javascript
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})
```

---

## 🧪 Test the Integration

### 1️⃣ Start Backend
```bash
cd backend
node server.js
```

### 2️⃣ Start React Dev Server
```bash
npm run dev
```

### 3️⃣ Test Login
```
Email: john@example.com
Password: 123456
```

### 4️⃣ View Books
Navigate to the books page and see the list of 10 test books.

### 5️⃣ Issue a Book
Select a book and click "Issue Book" (14 days by default).

---

## 📚 Complete Example Component

```jsx
import { useBooks, useUsers } from './api/hooks'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [books, setBooks] = useState([])
  const { getBooks } = useBooks()
  const { getUsers } = useUsers()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const booksData = await getBooks()
      setBooks(booksData.data)

      const userData = await getUsers()
      setUser(userData[0])
    } catch (err) {
      console.error('Error loading data:', err)
    }
  }

  return (
    <div>
      <h2>Welcome {user?.name}</h2>
      <h3>Total Books: {books.length}</h3>
      <div>
        {books.map((book) => (
          <div key={book.id}>
            <h4>{book.title}</h4>
            <p>Available: {book.available_copies} / {book.total_copies}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## 🆘 Troubleshooting

### CORS Errors?
> Make sure `backend/server.js` has CORS enabled:
```javascript
import cors from 'cors'
app.use(cors())
```

### Token not being sent?
> Check `localStorage` in DevTools:
```javascript
localStorage.getItem('token') // Should return JWT token
```

### API 404 errors?
> Verify backend is running on `http://localhost:5000`

---

## 🎓 Next Steps

1. ✅ Connect BookList component
2. ✅ Add LoginRegister component
3. ✅ Add IssueBook component
4. 📍 **Create Admin Dashboard** (manage books)
5. 📍 **Add Notifications** (fines, due dates)
6. 📍 **Create User Profile** (edit details)
7. 📍 **Generate Reports** (issued books history)

---

**Your frontend is now fully integrated with the backend!** 🎉
