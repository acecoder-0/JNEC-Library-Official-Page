import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import NavbarComp from '../components/NavbarComp';
import Footer from '../components/Footer';

const ServicesPage = () => {
  const services = [
    'Home Lending Service (2 book for one week) (10 books for Faculty for 6 months)',
    'Book Bank Facility to all students',
    'Reading Room Facility (For 600 Students)',
    'Reference services (Reference books & sources will be provide)',
    'Reprographics Service',
    'Inter Library Loan service (by DELNET)',
    'Digital Library, Internet facility and MOOCs Center are available',
    'NPTEL Video lectures are available for 930 online courses',
    'Institutional registration on NDLI',
    'Library automation by JUNO ERP Systems',
    'OPAC/Book Search facility available in Students & Faculty ERP login',
    'Separate Library Website for user awareness (library.jnec.org)',
    'Online Repository of back question papers (on library website)',
    'Anti Plagiarism Software (Ouriginal-URKUND) available',
    '24 Hours Library reading facility during PL & Exam duration',
    'Tea/Coffee & Snacks facility during PL & Exam duration',
    '1) Membership of DELNET for Inter Library Loan service and connect to Library Network (860 E-journals+10,685 E-books)',
    '2) 10,141 E-books are available in Springer E-book database',
    '3) Elsevier\'s Science Direct subscribed for 275 E-Journals',
    '4)  1076 E-Journals of Taylor and Francis ESS Package'
  ];

  const titleStyle = {
    textAlign: "center",
    padding: "20px 0",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#703c19",
    backgroundColor: "#f8f4e8",
    marginBottom: "20px",
    borderBottom: "4px solid #703c19",
    letterSpacing: "1px"
  };

  const quickLinks = [
    { name: 'Open Education Resource', url: '/e-resources' },
    { name: 'Ask A Librarian Service', url: '/ask-librarian' },
    { name: 'New Arrivals- Books', url: '#' },
    { name: 'Library Feedback Form', url: '/feedback' },
    { name: 'New Arrivals- Journals', url: '/journals' },
    { name: "Preparation-Question Paper's", url: '/question-papers' },
    { name: 'List of Book CDs', url: '#' },
    { name: "FAQ's about Library", url: '/faq' },
    { name: 'Image Gallery', url: '/gallery' }
  ];

  return (
    <>
      <Header />
      <NavbarComp />

      <div style={titleStyle}>
        LIBRARY SERVICES
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
              {quickLinks.map((link, i) => (
                <li key={i} style={{ marginBottom: 7 }}>
                  <a href={link.url} style={{ color: "#222", fontSize: 12, textDecoration: "none" }}>
                    • {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: "linear-gradient(170deg, #eaf7e8 0%, #c5e8b8 100%)",
            border: "2px solid #5aaa3a",
            borderRadius: 3,
            padding: "14px 10px 12px",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: 13,
              fontWeight: "bold",
              color: "#276010",
              fontStyle: "italic",
              marginBottom: 8,
              lineHeight: 1.3,
            }}>
              This is your planet
            </div>
            <div style={{ fontSize: 52, lineHeight: 1, marginBottom: 6 }}>🌍</div>
            <div style={{
              fontSize: 18,
              fontWeight: "900",
              color: "#276010",
              letterSpacing: 1,
              fontStyle: "italic",
            }}>
              go green!
            </div>
          </div>
        </div>

        {/* Main Content - Services Table */}
        <div style={{
          flex: 1,
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
        }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "15px"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f4e8" }}>
                <th style={{ border: "1px solid #ddd", padding: "12px 8px", textAlign: "center", fontWeight: "bold", color: "#703c19" }}>
                  Sr. No
                </th>
                <th style={{ border: "1px solid #ddd", padding: "12px 15px", textAlign: "left", fontWeight: "bold", color: "#703c19" }}>
                  KRC (Library) Services & Facilities
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={index} style={{ backgroundColor: "#fff" }}>
                  <td style={{ border: "1px solid #ddd", padding: "12px 10px", textAlign: "center", fontWeight: "500" }}>
                    {index + 1}.
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "12px 15px", lineHeight: 1.5 }}>
                    {service}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ServicesPage;
