# JNEC Central Library 📚

[![React](https://img.shields.io/badge/React-19.2.4-brightgreen)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0.0-orange)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple)](https://getbootstrap.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)](https://www.postgresql.org/)

## Overview

This is the official full-stack web application for the **Central Library of Jawaharlal Nehru Engineering College (JNEC), Aurangabad**, part of **MGM University**. It provides students, research scholars, teaching & non-teaching staff easy access to library services, resources, and information with a modern React frontend and secure Node.js backend.

**Key Features:**
- ✨ Modern, responsive UI with Bootstrap and React Router.
- 🛡️ Secure authentication & authorization with JWT.
- 📚 Comprehensive library management (Books, Journals, Feedback).
- 🖼️ Photo gallery of library facilities.
- 🌐 Access to E-Resources (EBSCO, IEEE Xplore, SpringerLink, SCOPUS, etc.).
- 📝 Feedback form for library services (staff, ambiance, books).
- ❓ FAQ section for membership, loans, etc.
- 📖 Pages for Journals (new arrivals), Question Papers, ULFS, About, and more.
- 🔐 Database-backed book issuing/return system.

## Features

| Feature | Description | Route |
|---------|-------------|-------|
| Home | Slider, marquee, main content with sidebar | `/` |
| About | Library hours, advisory committee | `/about` |
| E-Resources | Databases (EBSCO, IEEE, Springer), E-Books, E-Journals, Open Access | `/e-resources` |
| FAQ | Membership, inter-library loans (DELNET/INFLIBNET) | `/faq` |
| Feedback | Detailed form (staff ratings, ambiance, books) | `/feedback` |
| Photo Gallery | Library images (reading hall, stacks, entrance) | `/gallery` |
| Journals | New arrivals listing | `/journals` |
| Question Papers | Access to papers | `/question-papers` |
| ULFS | Library services page | `/ulfs` |
| **Lib Rules** | Library rules and regulations | **`/lib-rules`** |
| **Contact** | Library address, contact details, map | **`/contact`** |

## Tech Stack

### Frontend
- **Framework**: React 19+, React Router 7+
- **Build Tool**: Vite 8.0
- **UI**: Bootstrap 5.3+, React Bootstrap, Bootstrap Icons, React Icons
- **Linting**: ESLint 9+
- **Styling**: Custom CSS

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.2+
- **Database**: PostgreSQL
- **Security**: JWT (JSON Web Tokens), bcrypt for password hashing
- **Middleware**: CORS, Morgan (logging)
- **Environment**: dotenv for configuration

## Quick Start

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v12+)
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/saiprasadzampalwad/LIBRARY-JNEC-REACT.git
cd LIBRARY-JNEC-REACT
npm install
```

2. **Setup PostgreSQL Database:**
   - Create a new PostgreSQL database:
     ```sql
     CREATE DATABASE college_library;
     ```
   - Run migrations (optional):
     ```bash
     node backend/migrations/runMigrations.js
     ```

3. **Configure Environment Variables:**
   - Create `.env` file in the root directory:
     ```env
     # Database Configuration
     DB_HOST=localhost
     DB_USER=postgres
     DB_PASSWORD=your_password_here
     DB_PORT=5432
     DB_NAME=college_library
     
     # Server Configuration
     PORT=5000
     NODE_ENV=development
     
     # JWT Secret
     JWT_SECRET=your_super_secret_jwt_key_change_in_production
     ```

### Running the Application

**Option 1: Run Frontend & Backend Separately (Recommended for Development)**

Terminal 1 - Backend:
```bash
node backend/server.js
```
Backend runs on `http://localhost:5000`

Terminal 2 - Frontend:
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

**Option 2: Quick Backend Test**
```bash
# Check backend health
curl http://localhost:5000/health
```

### Build for Production
```bash
npm run build
npm run preview
```

### Lint
```bash
npm run lint
```

## Project Structure

### Frontend (React + Vite)
```
src/
├── components/          # Reusable React components
│   ├── BookList.jsx
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── NavbarComp.jsx
│   ├── Sidebar.jsx
│   ├── Slider.jsx
│   ├── TopMarquee.jsx
│   ├── MainContent.jsx
│   ├── IssueBook.jsx
│   └── LoginRegister.jsx
├── pages/               # Page-level components
│   ├── AboutPage.jsx
│   ├── EResourcesPage.jsx
│   ├── FAQPage.jsx
│   ├── FeedbackPage.jsx
│   ├── JournalsPage.jsx
│   ├── PhotoGalleryPage.jsx
│   ├── QuestionPapersPage.jsx
│   └── ... (other pages)
├── api/                 # API client & hooks
│   ├── apiClient.js
│   └── hooks.js
├── styles/              # Global styles
│   ├── Auth.css
│   ├── BookList.css
│   └── IssueBook.css
├── App.jsx              # Main routing & layout
└── main.jsx             # Entry point
public/                  # Static assets (images, documents)
```

### Backend (Node.js + Express)
```
backend/
├── server.js            # Main entry point
├── config/
│   └── db.js            # PostgreSQL connection
├── controllers/         # Business logic
│   ├── userController.js
│   ├── bookController.js
│   ├── journalController.js
│   └── feedbackController.js
├── routes/              # API endpoints
│   ├── userRoutes.js
│   ├── bookRoutes.js
│   ├── journalRoutes.js
│   └── feedbackRoutes.js
├── middleware/
│   └── auth.js          # JWT authentication
├── migrations/
│   └── runMigrations.js # Database setup
├── journals/            # PDF storage
└── init.sql             # Database schema
```

## API Documentation

All API endpoints require authentication (JWT token) except for public endpoints.

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
```
POST   /users/register          # Register new user
POST   /users/login             # Login (returns JWT token)
GET    /users                   # Get all users (Admin only)
GET    /users/:id               # Get user by ID
PUT    /users/:id               # Update user (Protected)
DELETE /users/:id               # Delete user (Admin only)
```

### Book Management Endpoints
```
GET    /books                   # Get all books
GET    /books/:id               # Get book details
GET    /books/search?query=...  # Search books
POST   /books                   # Add new book (Admin only)
PUT    /books/:id               # Update book (Admin only)
DELETE /books/:id               # Delete book (Admin only)

POST   /books/issue             # Issue book to user (Protected)
POST   /books/return/:issue_id  # Return book (Protected)
GET    /books/my-books/:user_id # Get user's issued books (Protected)
GET    /books/admin/issued-books    # Get all issued books (Admin only)
GET    /books/admin/overdue-books   # Get overdue books (Admin only)
```

### Journal Endpoints
```
GET    /journals                # List all journals
GET    /journals/:id/download   # Download journal PDF
```

### Feedback Endpoints
```
POST   /feedback                # Submit feedback (Protected)
GET    /feedback                # Get all feedback (Admin only)
```

### Health Check
```
GET    /health                  # Check server & database status
```

For detailed API documentation, visit: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## Screenshots
*(Suggest adding screenshots of home, e-resources, gallery)*
- Home: ![Home](public/images/newslide.jpg)
- Gallery: Library photos available at `/gallery`

## Contributing
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Roadmap

- ✅ Frontend UI with React & Bootstrap
- ✅ Backend API with Express & PostgreSQL
- ✅ JWT-based authentication
- ✅ Book issuing/returning system
- ✅ Journal PDF download
- 🔄 Real-time notifications for overdue books
- 🔄 Advanced search & filtering
- 🔄 Mobile-responsive improvements
- 🔄 Email notifications for library updates
- 📋 Admin dashboard for book management
- 📋 Fine calculation system
- 📋 QR code generation for books
- 📋 Deploy to production (Vercel/Heroku)
- 📋 React Native mobile app

## Troubleshooting

### Backend won't start
- Ensure PostgreSQL is running
- Check `.env` file has correct database credentials
- Run: `node backend/server.js` from root directory

### Frontend connectivity
- Ensure backend is running on port 5000
- Check `apiClient.js` has correct backend URL
- Look for CORS errors in browser console

### Database errors
- Verify PostgreSQL is installed and running
- Check database `college_library` exists
- Run migrations: `node backend/migrations/runMigrations.js`

## Support

For issues, questions, or suggestions, please:
- Open an issue on [GitHub](https://github.com/saiprasadzampalwad/LIBRARY-JNEC-REACT/issues)
- Contact library: [details from Contact page]
- Email: library@jnec.ac.in

## License
[MIT License](LICENSE)

## Acknowledgments

- **JNEC Library Team** - Project stakeholders and requirements
- **React & Vite Community** - Modern frontend tooling
- **Express.js Community** - Backend framework support
- **Bootstrap Team** - UI components and styling

## Authors

**Aditya Karodiwal** - Full Stack Development

---

**Last Updated:** April 2026  
**Version:** 1.0.0

## Contact
**MGM's JNEC Central Library**  
Jawaharlal Nehru Engineering College, Aurangabad  
Phone: [Library Phone Number]  
Email: library@jnec.ac.in  
Website: [College Website]  

© Copyright 2026 MGM's JNEC. All rights reserved.

