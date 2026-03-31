import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import NavbarComp from "../components/NavbarComp";
import Footer from "../components/Footer";

const quickLinks = [
   { name: 'Open Education Resource', url: '/e-resources' },
{ name: 'Ask A LibrarianService', url: '/ask-librarian' },
    { name: 'New Arrivals- Books', url: 'new_arrival_books.php' },
    { name: 'Library Feedback Form', url: '/feedback' },
    { name: 'New Arrivals- Journals', url: '/journals' },
{ name: "Preparation-Question Paper's", url: '/question-papers' },
{ name: 'List of Book CDs', url: '/public/books cds record.pdf' },
    { name: "FAQ's about Library", url: '/faq' },
{ name: 'Image Gallery', url: '/gallery' }
 
];

export default function JournalsPage() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);

  // Fetch journals from API
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        setLoading(true);
        console.log("📚 Fetching journals from API...");
        const response = await fetch("http://localhost:5000/api/journals");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch journals: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Journals API Response:", data);
        
        if (data.journals && data.journals.length > 0) {
          setJournals(data.journals);
          setError(null);
        } else {
          setError("No journals found in the journals folder");
          setJournals([]);
        }
      } catch (err) {
        console.error("❌ Error fetching journals:", err);
        setError(err.message || "Error loading journals");
        setJournals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  return (
    <>
      <Header />
      <NavbarComp />

      {/* Page Body */}
      <div
        style={{
          display: "flex",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "22px 16px",
          gap: 22,
          alignItems: "flex-start",
        }}
      >
        {/* Main Area */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              color: "#222",
              marginBottom: 16,
              letterSpacing: 1,
              fontFamily: "Georgia, serif",
            }}
          >
            📚 JOURNALS COLLECTION
          </h1>
          <p style={{ fontSize: 12, marginBottom: 16, color: "#666", textAlign: "center" }}>
            Click on any journal below to download the PDF
          </p>

          {loading && (
            <div style={{ textAlign: "center", padding: "20px", color: "#666" }}>
              <p>⏳ Loading journals from database...</p>
            </div>
          )}

          {error && (
            <div style={{ 
              background: "#ffe6e6", 
              padding: "12px", 
              borderRadius: "4px", 
              color: "#d9534f", 
              fontSize: 12,
              marginBottom: 16
            }}>
              <strong>❌ {error}</strong>
              <p style={{ marginTop: "8px", fontSize: "11px" }}>
                Make sure your PDF files are in: <code>backend/journals/</code>
              </p>
            </div>
          )}

          {!loading && journals.length > 0 ? (
            <div>
              <p style={{ fontSize: 12, marginBottom: 12, color: "#666" }}>
                📂 Found {journals.length} journal(s)
              </p>
              {journals.map((journal, index) => (
                <div key={journal.id} style={{ marginBottom: 8 }}>
                  <div
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                    style={{
                      background: "#d9d9d9",
                      padding: "12px 14px",
                      cursor: "pointer",
                      fontSize: 13,
                      color: "#333",
                      borderRadius: 3,
                      userSelect: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "background 0.2s",
                      border: "1px solid #bbb"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = "#c9c9c9"}
                    onMouseOut={(e) => e.currentTarget.style.background = "#d9d9d9"}
                  >
                    <span>
                      📄 {journal.name}
                      <span style={{ fontSize: "10px", color: "#777", marginLeft: "8px" }}>
                        ({(journal.size / 1024).toFixed(0)} KB)
                      </span>
                    </span>
                    <span style={{ fontSize: 12, color: "#666" }}>
                      {openIndex === index ? "▲" : "▼"}
                    </span>
                  </div>
                  {openIndex === index && (
                    <div
                      style={{
                        padding: "12px 14px",
                        background: "#f9f9f9",
                        borderLeft: "3px solid #8B4513",
                        borderRight: "1px solid #ddd",
                        borderBottom: "1px solid #ddd",
                        display: "flex",
                        gap: "10px"
                      }}
                    >
                      <a 
                        href={`http://localhost:5000${journal.url}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        style={{ 
                          color: "#8B4513", 
                          fontSize: 12,
                          textDecoration: "none",
                          fontWeight: "bold",
                          padding: "6px 10px",
                          background: "#fff8f0",
                          border: "1px solid #d9a574",
                          borderRadius: "3px",
                          display: "inline-block"
                        }}
                      >
                        👁️ View PDF
                      </a>
                      <a 
                        href={`http://localhost:5000${journal.url}?download=true`} 
                        download={journal.filename}
                        style={{ 
                          color: "#0066cc", 
                          fontSize: 12,
                          textDecoration: "none",
                          fontWeight: "bold",
                          padding: "6px 10px",
                          background: "#e6f2ff",
                          border: "1px solid #99ccff",
                          borderRadius: "3px",
                          display: "inline-block"
                        }}
                      >
                        📥 Download
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <div style={{ 
                textAlign: "center", 
                padding: "20px", 
                background: "#f0f0f0",
                borderRadius: "4px"
              }}>
                <p style={{ color: "#999", fontSize: 13 }}>
                  📚 No journals available yet
                </p>
                <p style={{ color: "#bbb", fontSize: 11, marginTop: "8px" }}>
                  Add PDF files to the <code>backend/journals/</code> directory
                </p>
              </div>
            )
          )}
        </div>

        {/* Right Sidebar */}
        <div style={{ width: 195, flexShrink: 0 }}>
          {/* Quick Links */}
          <div
            style={{
              background: "#ede8db",
              border: "1px solid #b8a888",
              padding: "10px 14px 14px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#8B3A00",
                fontSize: 14,
                marginBottom: 10,
                textDecoration: "underline",
              }}
            >
              QUICK LINKS
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {quickLinks.map((link, i) => (
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
                    onMouseEnter={(e) => (e.target.style.color = "#8B3A00")}
                    onMouseLeave={(e) => (e.target.style.color = "#222")}
                  >
                    {link.name}
                  </Link>

                </li>
              ))}
            </ul>
          </div>

          {/* Go Green */}
          <div
            style={{
              background: "linear-gradient(170deg, #eaf7e8 0%, #c5e8b8 100%)",
              border: "2px solid #5aaa3a",
              borderRadius: 3,
              padding: "14px 10px 12px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: "bold",
                color: "#276010",
                fontStyle: "italic",
                marginBottom: 8,
                lineHeight: 1.3,
              }}
            >
              This is your planet
            </div>
            <div style={{ fontSize: 52, lineHeight: 1, marginBottom: 6 }}>🌍</div>
            <div
              style={{
                fontSize: 18,
                fontWeight: "900",
                color: "#276010",
                letterSpacing: 1,
                fontStyle: "italic",
              }}
            >
              go green!
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
