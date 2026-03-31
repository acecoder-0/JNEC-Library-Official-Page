import { useState, useEffect } from 'react';
import { useBooks } from '../api/hooks';
import '../styles/IssueBook.css';

export default function IssueBook() {
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [days, setDays] = useState(14);
  const [message, setMessage] = useState('');
  const { loading, error, getBooks, issueBook, returnBook, getIssuedBooks } = useBooks();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData.data || []);

      const issuedData = await getIssuedBooks();
      setIssuedBooks(issuedData.data || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  const handleIssueBook = async (e) => {
    e.preventDefault();
    if (!selectedBookId) {
      setMessage('Please select a book');
      return;
    }

    try {
      await issueBook({
        book_id: parseInt(selectedBookId),
        days: parseInt(days),
      });

      setMessage('✅ Book issued successfully!');
      setSelectedBookId('');
      setDays(14);

      // Refresh data
      setTimeout(() => {
        fetchData();
        setMessage('');
      }, 2000);
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.error || 'Failed to issue book'}`);
    }
  };

  const handleReturnBook = async (issueId) => {
    try {
      await returnBook(issueId);
      setMessage('✅ Book returned successfully!');

      // Refresh data
      setTimeout(() => {
        fetchData();
        setMessage('');
      }, 2000);
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.error || 'Failed to return book'}`);
    }
  };

  return (
    <div className="issue-book-container">
      <h2>📖 Issue & Return Books</h2>

      {message && <div className="alert">{message}</div>}

      <div className="issue-section">
        <h3>Issue a Book</h3>
        <form onSubmit={handleIssueBook}>
          <div className="form-group">
            <label>Select Book</label>
            <select
              value={selectedBookId}
              onChange={(e) => setSelectedBookId(e.target.value)}
              required
            >
              <option value="">-- Choose a book --</option>
              {books
                .filter((book) => book.available_copies > 0)
                .map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} by {book.author} ({book.available_copies} available)
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>Issue Days</label>
            <input
              type="number"
              min="1"
              max="30"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="Number of days"
            />
          </div>

          <button type="submit" disabled={loading} className="issue-btn">
            {loading ? 'Issuing...' : '📤 Issue Book'}
          </button>
        </form>
      </div>

      <div className="return-section">
        <h3>Your Issued Books</h3>
        {issuedBooks.length > 0 ? (
          <div className="issued-books-list">
            {issuedBooks
              .filter((item) => item.status === 'issued')
              .map((item) => {
                const book = books.find((b) => b.id === item.book_id);
                const dueDate = new Date(item.due_date);
                const isOverdue = new Date() > dueDate;

                return (
                  <div key={item.id} className={`issued-item ${isOverdue ? 'overdue' : ''}`}>
                    <div className="item-info">
                      <h4>{book?.title}</h4>
                      <p>
                        <strong>Author:</strong> {book?.author}
                      </p>
                      <p>
                        <strong>Issue Date:</strong> {new Date(item.issue_date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Due Date:</strong> {dueDate.toLocaleDateString()}
                        {isOverdue && <span className="overdue-label">⚠️ OVERDUE</span>}
                      </p>
                    </div>
                    <button
                      className="return-btn"
                      onClick={() => handleReturnBook(item.id)}
                      disabled={loading}
                    >
                      📥 Return Book
                    </button>
                  </div>
                );
              })}
          </div>
        ) : (
          <p className="no-items">No books currently issued</p>
        )}
      </div>
    </div>
  );
}
