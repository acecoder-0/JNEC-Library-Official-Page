import express from "express";
import {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  issueBook,
  returnBook,
  getUserIssuedBooks,
  getAllIssuedBooks,
  getOverdueBooks,
  searchBooks,
} from "../controllers/bookController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();

// ============= PUBLIC ROUTES =============

// Get all books
router.get("/", getAllBooks);

// Get book by ID
router.get("/:id", getBookById);

// Search books
router.get("/search", searchBooks);

// ============= PROTECTED ROUTES (Authenticated Users) =============

// Get issued books for current user
router.get("/my-books/:user_id", authenticate, getUserIssuedBooks);

// Issue a book
router.post("/issue", authenticate, issueBook);

// Return a book
router.post("/return/:issue_id", authenticate, returnBook);

// ============= ADMIN ONLY ROUTES =============

// Add new book (Admin)
router.post("/", authenticate, authorize(["admin"]), addBook);

// Update book (Admin)
router.put("/:id", authenticate, authorize(["admin"]), updateBook);

// Delete book (Admin)
router.delete("/:id", authenticate, authorize(["admin"]), deleteBook);

// Get all issued books (Admin)
router.get("/admin/issued-books", authenticate, authorize(["admin"]), getAllIssuedBooks);

// Get overdue books (Admin)
router.get("/admin/overdue-books", authenticate, authorize(["admin"]), getOverdueBooks);

export default router;
