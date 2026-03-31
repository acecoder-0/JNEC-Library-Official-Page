-- Users table (Authentication)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Books table (Library Inventory)
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author VARCHAR(100) NOT NULL,
  isbn VARCHAR(20) UNIQUE,
  publication_year INT,
  category VARCHAR(100),
  available BOOLEAN DEFAULT TRUE,
  total_copies INT DEFAULT 1 CHECK (total_copies >= 0),
  available_copies INT DEFAULT 1 CHECK (available_copies >= 0),
  added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Issued Books table (Library Issue/Return System)
CREATE TABLE IF NOT EXISTS issued_books (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  book_id INT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date TIMESTAMP NOT NULL,
  return_date TIMESTAMP,
  fine DECIMAL(10, 2) DEFAULT 0 CHECK (fine >= 0),
  status VARCHAR(20) DEFAULT 'issued' CHECK (status IN ('issued', 'returned', 'overdue'))
);

-- Feedback table (Library Feedback Form)
CREATE TABLE IF NOT EXISTS feedback (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  reg_no VARCHAR(50),
  section VARCHAR(50),
  purpose VARCHAR(200),
  frequency VARCHAR(50),
  staff_behavior VARCHAR(50),
  staff_knowledge VARCHAR(50),
  staff_efficiency VARCHAR(50),
  staff_effectiveness VARCHAR(50),
  env_cleanliness VARCHAR(50),
  env_lighting VARCHAR(50),
  env_equipment VARCHAR(50),
  opac VARCHAR(50),
  internet VARCHAR(50),
  circulation VARCHAR(50),
  reference VARCHAR(50),
  magazine VARCHAR(50),
  reading_hall VARCHAR(50),
  sufficiency VARCHAR(50),
  condition VARCHAR(50),
  suggestions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_books_category ON books(category);
CREATE INDEX IF NOT EXISTS idx_issued_books_user_id ON issued_books(user_id);
CREATE INDEX IF NOT EXISTS idx_issued_books_book_id ON issued_books(book_id);
CREATE INDEX IF NOT EXISTS idx_issued_books_status ON issued_books(status);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);

-- Sample data (optional - uncomment to run)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@library.com', '$2b$10$YIjxFhQlQ9G8c0x8nZy.N.wqz5z0xJ0z0z0z0z0z0z0z0z0z0z0z0', 'admin'),
('John Doe', 'john@example.com', '$2b$10$YIjxFhQlQ9G8c0x8nZy.N.wqz5z0xJ0z0z0z0z0z0z0z0z0z0z0z0', 'user'),
('Jane Smith', 'jane@example.com', '$2b$10$YIjxFhQlQ9G8c0x8nZy.N.wqz5z0xJ0z0z0z0z0z0z0z0z0z0z0z0', 'user'),
('Bob Johnson', 'bob@example.com', '$2b$10$YIjxFhQlQ9G8c0x8nZy.N.wqz5z0xJ0z0z0z0z0z0z0z0z0z0z0z0', 'user'),
('Alice Williams', 'alice@example.com', '$2b$10$YIjxFhQlQ9G8c0x8nZy.N.wqz5z0xJ0z0z0z0z0z0z0z0z0z0z0z0', 'user')
ON CONFLICT (email) DO NOTHING;

INSERT INTO books (title, author, isbn, category, publication_year, total_copies, available_copies) VALUES 
('Introduction to Algorithms', 'Thomas H. Cormen', '9780262033848', 'Computer Science', 2009, 5, 5),
('Design Patterns', 'Gang of Four', '9780201633610', 'Software Engineering', 1994, 3, 3),
('Clean Code', 'Robert C. Martin', '9780132350884', 'Programming', 2008, 4, 4),
('The Pragmatic Programmer', 'Andrew Hunt', '9780135957059', 'Programming', 2019, 2, 2),
('Database System Concepts', 'Abraham Silberschatz', '9780078022159', 'Database', 2010, 3, 3),
('Web Development with Node.js', 'Ethan Brown', '9781491902288', 'Web Development', 2014, 2, 2),
('React in Action', 'Mark Thomas', '9781617292699', 'Web Development', 2018, 4, 4),
('You Don''t Know JS', 'Kyle Simpson', '9781491904244', 'JavaScript', 2014, 3, 3),
('The Effective Engineer', 'Edmond Lau', '9780996128049', 'Career', 2015, 2, 2),
('SQL Performance Explained', 'Markus Winand', '9783950307825', 'Database', 2012, 2, 2)
ON CONFLICT (isbn) DO NOTHING;
