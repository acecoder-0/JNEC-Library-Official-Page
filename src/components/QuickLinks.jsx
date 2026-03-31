import React from 'react';
import { Link } from 'react-router-dom';

const quickLinksData = [
  { name: 'Open Education Resource', url: '/e-resources' },
  { name: 'Ask A Librarian Service', url: '/ask-librarian' },
  { name: 'New Arrivals- Books', url: '#' },
  { name: 'Library Feedback Form', url: '/feedback' },
  { name: 'New Arrivals- Journals', url: '/journals' },
  { name: "Preparation-Question Paper's", url: '/question-papers' },
  { name: 'List of Book CDs', url: '/public/books cds record.pdf' },
  { name: "FAQ's about Library", url: '/faq' },
  { name: 'Image Gallery', url: '/gallery' }
];

const QuickLinks = () => {
  return (
    <div style={{
      background: "#ede8db",
      border: "1px solid #b8a888",
      padding: "10px 14px 14px",
      marginBottom: 16,
    }}>
      <div style={{
        textAlign: "center",
        fontWeight: "bold",
        color: "#8B3A00",
        fontSize: 14,
        marginBottom: 10,
        textDecoration: "underline",
      }}>
        QUICK LINKS
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {quickLinksData.map((link, i) => (
          <li
            key={i}
            style={{
              marginBottom: 7,
              display: "flex",
              alignItems: "flex-start",
              gap: 5,
            }}
          >
            <span style={{ color: "#555", fontSize: 13, lineHeight: "17px", flexShrink: 0 }}>•</span>
            <Link
              to={link.url}
              style={{ color: "#222", fontSize: 12, textDecoration: "none", lineHeight: 1.35 }}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;

