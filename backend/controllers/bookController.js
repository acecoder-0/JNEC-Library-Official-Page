import pool from "../config/db.js";

// ============= BOOK CRUD OPERATIONS =============

// Get all books
export const getAllBooks = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        b.id,
        b.title,
        b.author,
        b.isbn,
        b.category,
        b.available,
        b.total_copies,
        b.available_copies,
        b.added_date
      FROM books b
      ORDER BY b.added_date DESC`
    );
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    });
  } catch (err) {
    console.error("Error fetching books:", err.message);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// Get book by ID
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

// Add new book (Admin only)
export const addBook = async (req, res) => {
  try {
    const { title, author, isbn, category, total_copies } = req.body;

    // Validate input
    if (!title || !author || !isbn || !category || !total_copies) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await pool.query(
      `INSERT INTO books (title, author, isbn, category, total_copies, available_copies, available)
       VALUES ($1, $2, $3, $4, $5, $6, TRUE)
       RETURNING *`,
      [title, author, isbn, category, total_copies, total_copies]
    );

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error adding book:", err.message);
    res.status(500).json({ error: "Failed to add book" });
  }
};

// Update book (Admin only)
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, category, total_copies } = req.body;

    const result = await pool.query(
      `UPDATE books 
       SET title = COALESCE($1, title),
           author = COALESCE($2, author),
           category = COALESCE($3, category),
           total_copies = COALESCE($4, total_copies)
       WHERE id = $5
       RETURNING *`,
      [title, author, category, total_copies, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({
      success: true,
      message: "Book updated successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating book:", err.message);
    res.status(500).json({ error: "Failed to update book" });
  }
};

// Delete book (Admin only)
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if book is issued
    const issueCheck = await pool.query(
      `SELECT COUNT(*) as count FROM issued_books 
       WHERE book_id = $1 AND return_date IS NULL`,
      [id]
    );

    if (issueCheck.rows[0].count > 0) {
      return res.status(400).json({ error: "Cannot delete book with active issues" });
    }

    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({
      success: true,
      message: "Book deleted successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error deleting book:", err.message);
    res.status(500).json({ error: "Failed to delete book" });
  }
};

// ============= ISSUE & RETURN OPERATIONS =============

// Issue a book
export const issueBook = async (req, res) => {
  try {
    const { user_id, book_id, due_date } = req.body;

    // Validate input
    if (!user_id || !book_id || !due_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if book exists and available
    const bookCheck = await pool.query(
      "SELECT * FROM books WHERE id = $1 AND available_copies > 0",
      [book_id]
    );

    if (bookCheck.rows.length === 0) {
      return res.status(400).json({ error: "Book not available" });
    }

    // Check if user already has this book
    const userBookCheck = await pool.query(
      `SELECT COUNT(*) as count FROM issued_books 
       WHERE user_id = $1 AND book_id = $2 AND return_date IS NULL`,
      [user_id, book_id]
    );

    if (userBookCheck.rows[0].count > 0) {
      return res.status(400).json({ error: "User already has this book" });
    }

    // Issue the book
    const result = await pool.query(
      `INSERT INTO issued_books (user_id, book_id, issue_date, due_date)
       VALUES ($1, $2, NOW(), $3)
       RETURNING *`,
      [user_id, book_id, due_date]
    );

    // Decrease available copies
    await pool.query(
      "UPDATE books SET available_copies = available_copies - 1 WHERE id = $1",
      [book_id]
    );

    res.status(201).json({
      success: true,
      message: "Book issued successfully",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Error issuing book:", err.message);
    res.status(500).json({ error: "Failed to issue book" });
  }
};

// Return a book and calculate fine
export const returnBook = async (req, res) => {
  try {
    const { issue_id } = req.params;
    const FINE_PER_DAY = 5; // ₹5 per day

    // Get the issued book record
    const issueRecord = await pool.query(
      "SELECT * FROM issued_books WHERE id = $1 AND return_date IS NULL",
      [issue_id]
    );

    if (issueRecord.rows.length === 0) {
      return res.status(404).json({ error: "Issued book record not found" });
    }

    const issue = issueRecord.rows[0];

    // Calculate fine
    const returnDate = new Date();
    const dueDate = new Date(issue.due_date);
    const daysLate = Math.max(0, Math.floor((returnDate - dueDate) / (1000 * 60 * 60 * 24)));
    const fine = daysLate * FINE_PER_DAY;

    // Update issued_books with return date and fine
    const result = await pool.query(
      `UPDATE issued_books 
       SET return_date = NOW(), fine = $1
       WHERE id = $2
       RETURNING *`,
      [fine, issue_id]
    );

    // Increase available copies
    await pool.query(
      "UPDATE books SET available_copies = available_copies + 1 WHERE id = $1",
      [issue.book_id]
    );

    res.json({
      success: true,
      message: fine > 0 ? `Book returned. Fine: ₹${fine}` : "Book returned successfully",
      data: {
        ...result.rows[0],
        daysLate,
        fine,
        finePerDay: FINE_PER_DAY,
      },
    });
  } catch (err) {
    console.error("Error returning book:", err.message);
    res.status(500).json({ error: "Failed to return book" });
  }
};

// Get issued books for a user
export const getUserIssuedBooks = async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await pool.query(
      `SELECT 
        ib.id,
        ib.user_id,
        ib.book_id,
        b.title,
        b.author,
        ib.issue_date,
        ib.due_date,
        ib.return_date,
        ib.fine,
        CASE 
          WHEN ib.return_date IS NULL AND NOW() > ib.due_date THEN true 
          ELSE false 
        END as is_overdue
      FROM issued_books ib
      JOIN books b ON ib.book_id = b.id
      WHERE ib.user_id = $1
      ORDER BY ib.issue_date DESC`,
      [user_id]
    );

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    });
  } catch (err) {
    console.error("Error fetching user issued books:", err.message);
    res.status(500).json({ error: "Failed to fetch issued books" });
  }
};

// Get all issued books (Admin only)
export const getAllIssuedBooks = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        ib.id,
        ib.user_id,
        u.name as user_name,
        u.email,
        ib.book_id,
        b.title,
        b.author,
        ib.issue_date,
        ib.due_date,
        ib.return_date,
        ib.fine,
        CASE 
          WHEN ib.return_date IS NULL AND NOW() > ib.due_date THEN true 
          ELSE false 
        END as is_overdue
      FROM issued_books ib
      JOIN users u ON ib.user_id = u.id
      JOIN books b ON ib.book_id = b.id
      ORDER BY ib.issue_date DESC`
    );

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    });
  } catch (err) {
    console.error("Error fetching issued books:", err.message);
    res.status(500).json({ error: "Failed to fetch issued books" });
  }
};

// Get overdue books (Admin only)
export const getOverdueBooks = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        ib.id,
        ib.user_id,
        u.name as user_name,
        u.email,
        ib.book_id,
        b.title,
        b.author,
        ib.due_date,
        NOW() as current_date,
        FLOOR(EXTRACT(DAY FROM (NOW() - ib.due_date))) as days_overdue,
        FLOOR(EXTRACT(DAY FROM (NOW() - ib.due_date))) * 5 as calculated_fine
      FROM issued_books ib
      JOIN users u ON ib.user_id = u.id
      JOIN books b ON ib.book_id = b.id
      WHERE ib.return_date IS NULL AND NOW() > ib.due_date
      ORDER BY ib.due_date ASC`
    );

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    });
  } catch (err) {
    console.error("Error fetching overdue books:", err.message);
    res.status(500).json({ error: "Failed to fetch overdue books" });
  }
};

// Search books
export const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Search query required" });
    }

    const result = await pool.query(
      `SELECT * FROM books 
       WHERE title ILIKE $1 OR author ILIKE $1 OR category ILIKE $1 OR isbn ILIKE $1`,
      [`%${query}%`]
    );

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
    });
  } catch (err) {
    console.error("Error searching books:", err.message);
    res.status(500).json({ error: "Failed to search books" });
  }
};
