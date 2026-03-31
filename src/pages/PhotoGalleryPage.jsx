import { useState } from "react";
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

const galleryImages = [
  { label: "Reading Hall", src: "/1.jfif" },
  { label: "Main Library Floor", src: "/2.jfif" },
  { label: "Staff Group Photo", src: "/3.jpg" },
  { label: "Study Area", src: "/4.jfif" },
  { label: "Lounge Seating", src: "/5.jfif" },
  { label: "Book Stacks", src: "/6.jfif" },
  { label: "Library Aisle", src: "/7.jfif" },
  { label: "Reading Section", src: "/8.jfif" },
  { label: "Colorful Shelves", src: "/9.jfif" },
  { label: "Library Entrance", src: "/10.jfif" },
  { label: "Building Exterior", src: "/11.jfif" },
];

function GalleryThumb({ img }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: 150,
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: hovered
          ? "4px 4px 14px rgba(0,0,0,0.32)"
          : "2px 2px 6px rgba(0,0,0,0.18)",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        position: "relative",
      }}
    >
      <img
        src={img.src}
        alt={img.label}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 11,
          color: "#111",
          fontWeight: "bold",
          background: "rgba(255,255,255,0.72)",
          padding: "4px 0",
        }}
      >
        {img.label}
      </div>
    </div>
  );
}

export default function PhotoGalleryPage() {
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
        {/* Gallery */}
        <div style={{ flex: 1 }}>
          <h1
            style={{
              textAlign: "center",
              fontSize: 26,
              fontWeight: "bold",
              letterSpacing: 4,
              color: "#1a1a1a",
              marginBottom: 18,
              fontFamily: "Georgia, serif",
            }}
          >
            PHOTO - GALLERY
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            {galleryImages.map((img, i) => (
              <GalleryThumb key={i} img={img} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
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
                  <span
                    style={{
                      color: "#555",
                      fontSize: 13,
                      lineHeight: "17px",
                      flexShrink: 0,
                    }}
                  >
                    •
                  </span>
                  <Link
                    to={link.url}
                    style={{
                      color: "#222",
                      fontSize: 12,
                      textDecoration: "none",
                      lineHeight: 1.35,
                    }}
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
