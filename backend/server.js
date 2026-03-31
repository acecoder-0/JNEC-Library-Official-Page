import dotenv from "dotenv";
dotenv.config(); // ✅ MUST load env vars FIRST

import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ============= MIDDLEWARE =============
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined")); // HTTP request logging

// ✅ Serve journals PDFs statically
app.use("/journals", express.static(path.join(__dirname, "journals")));

// ============= ROUTES =============

// API Documentation
app.get("/", (req, res) => {
  res.json({
    message: "Library Management API 🚀",
    version: "1.0.0",
    documentation: "Complete REST API for College Library Management",
    endpoints: {
      authentication: {
        register: "POST /api/users/register",
        login: "POST /api/users/login",
      },
      users: {
        getAll: "GET /api/users",
        getById: "GET /api/users/:id",
        update: "PUT /api/users/:id (Protected)",
        delete: "DELETE /api/users/:id (Protected)",
      },
      books: {
        getAll: "GET /api/books",
        getById: "GET /api/books/:id",
        search: "GET /api/books/search?query=title",
        addBook: "POST /api/books (Admin Only)",
        updateBook: "PUT /api/books/:id (Admin Only)",
        deleteBook: "DELETE /api/books/:id (Admin Only)",
      },
      issueReturn: {
        issueBook: "POST /api/books/issue (Protected)",
        returnBook: "POST /api/books/return/:issue_id (Protected)",
        userBooks: "GET /api/books/my-books/:user_id (Protected)",
        allIssued: "GET /api/books/admin/issued-books (Admin Only)",
        overdueBooks: "GET /api/books/admin/overdue-books (Admin Only)",
      },
      health: {
        status: "GET /health",
      },
    },
  });
});

// User routes (Auth + CRUD)
app.use("/api/users", userRoutes);

// Book routes (CRUD + Issue/Return)
app.use("/api/books", bookRoutes);

// Journal routes (List and Download PDFs)
console.log("🔹 Registering journal routes at /api/journals");
app.use("/api/journals", journalRoutes);
console.log("✅ Journal routes registered");

// Feedback routes (Submit and View Feedback)
app.use("/api/feedback", feedbackRoutes);
console.log("✅ Feedback routes registered");

// Test journal route directly
app.get("/api/journals-test", (req, res) => {
  res.json({ success: true, message: "Direct test route" });
});

// Database health check
app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");
    res.json({
      status: "✅ Server & Database Connected",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  } catch (err) {
    console.error("Health check failed:", err.message);
    res.status(500).json({
      status: "❌ Database Connection Failed",
      error: err.message,
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

// ============= ERROR HANDLING =============

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

// ============= SERVER START =============

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API docs: http://localhost:${PORT}\n`);
});
