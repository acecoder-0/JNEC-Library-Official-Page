import { useState, useEffect } from 'react';
import { useBooks } from '../api/hooks';
import '../styles/BookList.css';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { loading, error, getBooks } = useBooks();

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books when search or category changes
  useEffect(() => {
    filterBooks();
  }, [books, searchTerm, selectedCategory]);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data.data || []);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    }
  };

  const filterBooks = () => {
    let filtered = books;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  };

  const categories = ['All', ...new Set(books.map((b) => b.category))];

  if (loading) return <div className="loading">Loading books...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="book-list-container">
      <h2>📚 Library Books</h2>

      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Book Count */}
      <div className="book-count">Found {filteredBooks.length} books</div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-header">
                <h3>{book.title}</h3>
                <span
                  className={`availability ${book.available_copies > 0 ? 'available' : 'unavailable'}`}
                >
                  {book.available_copies > 0 ? '✅ Available' : '❌ Unavailable'}
                </span>
              </div>

              <div className="book-details">
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Category:</strong> {book.category}
                </p>
                <p>
                  <strong>ISBN:</strong> {book.isbn}
                </p>
                <p>
                  <strong>Available Copies:</strong> {book.available_copies} / {book.total_copies}
                </p>
              </div>

              <button
                className="issue-btn"
                disabled={book.available_copies === 0}
                onClick={() => alert(`Issue book: ${book.id}`)}
              >
                {book.available_copies > 0 ? '📖 Issue Book' : 'Not Available'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-books">No books found matching your criteria.</div>
      )}
    </div>
  );
}
