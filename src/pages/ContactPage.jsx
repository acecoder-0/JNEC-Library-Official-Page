import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import QuickLinks from '../components/QuickLinks';

import Header from '../components/Header';
import NavbarComp from '../components/NavbarComp';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <>
      <Header />
      <NavbarComp />
      
      <div style={{
        textAlign: "center",
        padding: "20px 0",
        fontSize: "28px",
        fontWeight: "bold",
        color: "#703c19",
        backgroundColor: "#f8f4e8",
        marginBottom: "20px",
        borderBottom: "4px solid #703c19",
        letterSpacing: "1px"
      }}>
        CONTACT US
      </div>

      <div style={{
        display: "flex",
        maxWidth: 1180,
        margin: "0 auto",
        padding: "16px 16px 28px",
        gap: 22,
        alignItems: "flex-start",
      }}>
        {/* Left Sidebar */}
        <div style={{ width: 195, flexShrink: 0 }}>
          <QuickLinks />
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


        {/* Main Content */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            border: "1px solid #ccc",
            padding: "20px 24px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            textAlign: "center"
          }}
        >
          <h3 style={{
            fontSize: "22px",
            lineHeight: "1.5",
            color: "#333",
            marginBottom: "25px",
            fontWeight: "600"
          }}>
            Jawaharlal Nehru Engineering College,<br />
            Central Library,<br />
            MGM Campus,<br />
            CIDCO N-6,<br />
            Chhatrapati Sambhajinagar - 431003<br />
            <strong style={{ color: "#703c19" }}>Maharashtra (INDIA)</strong>
          </h3>

          <div style={{
            fontSize: "18px",
            lineHeight: "1.8",
            color: "#444",
            marginBottom: "30px"
          }}>
            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#703c19" }}>Website:</strong>{' '}
              <a href="http://library.jnec.org" target="_blank" rel="noopener noreferrer" style={{ color: "#703c19", fontWeight: "bold", textDecoration: "none" }}>
                library.jnec.org
              </a>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <strong style={{ color: "#703c19" }}>E-Mail:</strong>{' '}
              <a href="mailto:jneclibrary@gmail.com" style={{ color: "#703c19", fontWeight: "bold", textDecoration: "none" }}>
                jneclibrary@gmail.com
              </a>
            </div>
            <div>
              <strong style={{ color: "#703c19" }}>Phone:</strong> 0240 - 2481433, 2482236
            </div>
          </div>

          <div style={{
            boxShadow: "2px 2px 12px #606060",
            borderRadius: "8px",
            overflow: "hidden",
            marginTop: "25px",
            width: "100%"
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15008.506148601064!2d75.34972810177527!3d19.876878077742127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba296c8864b0b%3A0x87ce8c9abbbce8e31!2sJNEC+Library!5e0!3m2!1sen!2sin!4v1517394689529"
              width="100%"
              height="450"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="JNEC Central Library Location"
            />
          </div>

          <p style={{ marginTop: "25px", fontSize: "15px", color: "#666", fontStyle: "italic" }}>
            For inquiries and support, use the contact details above or visit during library hours.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
