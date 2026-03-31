import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Accordion, Badge } from 'react-bootstrap';
import Header from '../components/Header';
import NavbarComp from '../components/NavbarComp';
import Footer from '../components/Footer';

const quickLinks = [
  { name: 'Open Education Resource', url: '/e-resources' },
{ name: 'Ask A Librarian Service', url: 'http://www.123contactform.com/form-1637444/Contact-Lead-Form' },
  { name: 'New Arrivals- Books', url: '#' },
  { name: 'Library Feedback Form', url: '/feedback' },
  { name: 'New Arrivals- Journals', url: '/journals' },
  { name: "Preparation-Question Paper's", url: '/question-papers' },
  { name: 'List of Book CDs', url: '#' },
  { name: "FAQ's about Library", url: '/faq' },
  { name: 'Image Gallery', url: '/gallery' }
];

const libraryRules = [
  {
    title: 'LIBRARY RULES & REGULATIONS FOR STUDENTS',
    rules: [
      'Book Transaction timings will be 9.30 am to 5.00 pm for Circulation Section.',
      'The Library will be open for 365 days (Excluding Sunday and Govt. Holidays).',
      'The Reading Room will be open for 24 hrs during preparation leave in both semesters.',
      'Identity Card and dress code must be followed while entering in the Library.',
      'Bio-metric attendance is compulsory for all students & staff while entering in the Library.',
      'Mobile is strictly prohibited in the Library premises. Rs. 100 fine and mobile confiscation is the action taken against the student who is using mobile in the Library.',
      'Newly joined staff/visiting staff submits membership form to Librarian.',
      'Two books per week will be issued to every student from Circulation section against I Card.',
      'In each term three books to FE students and two books for SE, TE, and BE students are issued from Boo-bank section.',
      'From Reading room section, the books will be issued on Library card for same time.',
      'Maximum 10 books will be issued to the staff members.',
      'Only 2 books are issued to the visiting staff.',
      'The staff members & visiting staff can keep the library books only for one term.',
      'Open access will be given to all students and staff in the Library.',
      'If a book is lost by any student, the students has to pay 1.5 times price of the book lost plus fine for the delay till date or Replacement with new book with latest edition plus fine for the delay till replacement.',
      'If a book is lost by any staff, the staff has to pay 1.5 times price of the book lost or Replacement with new book with latest edition.',
      'In case of delay in returning book from Circulation & Book-bank section, fine will be Rs. 10/- per day per book for one week, after one week fine will be Rs. 05/- per day per book for the students. From Reading Room section if students have not returned book on the same day, the fine will be collected equal to the cost of books, by adding Rs. 10/- per day per book.',
      'The Suggestion Box is available for students and faculty in the Library.',
      'Keep the silence in Reading Room.'
    ]
  }
];

export default function LibRulesPage() {
  const titleStyle = {
    textAlign: "center",
    padding: "16px 0 10px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#703c19",
    background: "#f8f4e8",
    letterSpacing: 1,
    fontFamily: "'Georgia', serif",
    borderBottom: "3px solid #703c19"
  };

  return (
    <>
      <Header />
      <NavbarComp />
      
      <div style={titleStyle}>
        LIBRARY - RULES
      </div>

      <div style={{
        display: "flex",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "20px 20px 40px",
        gap: "30px",
        alignItems: "flex-start"
      }}>
        {/* Sidebar */}
        <div style={{ width: "220px", flexShrink: 0 }}>
          <div style={{
            backgroundColor: "#d7cdc3",
            border: "1px solid #b8a888",
            padding: "15px 20px 20px",
            marginBottom: "20px"
          }}>
            <h5 style={{
              color: "#703c19",
              textAlign: "center",
              textDecoration: "underline",
              marginBottom: "15px",
              fontSize: "16px"
            }}>
              <strong>QUICK LINKS</strong>
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {quickLinks.map((link, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  <Link 
                    to={link.url} 
                    style={{ 
                      color: "#222", 
                      textDecoration: "none", 
                      fontSize: "13px",
                      display: "block"
                    }}
                    target={link.url.startsWith('http') ? '_blank' : '_self'}
                  >
                    • {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Go Green Image */}
          <div style={{
            background: "linear-gradient(170deg, #eaf7e8 0%, #c5e8b8 100%)",
            border: "2px solid #5aaa3a",
            borderRadius: "8px",
            padding: "20px 15px",
            textAlign: "center"
          }}>
            <img 
              src="/images/GO-Green-planet.jpg" 
              alt="Go Green" 
              style={{ 
                width: "100%", 
                height: "auto", 
                borderRadius: "5px",
                boxShadow: "2px 2px 12px #606060"
              }} 
            />
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          flex: 1,
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "25px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <Accordion defaultActiveKey="0">
            {libraryRules.map((section, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header style={{ backgroundColor: "#f8f4e8", borderColor: "#703c19" }}>
                  <strong style={{ color: "#703c19" }}>{section.title}</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <ul style={{ paddingLeft: "20px" }}>
                    {section.rules.map((rule, rIndex) => (
                      <li key={rIndex} style={{ marginBottom: "8px", fontSize: "15px" }}>
                        {rule}
                      </li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
          <div style={{ marginTop: "25px", padding: "15px", backgroundColor: "#fff3cd", border: "1px solid #ffeaa7", borderRadius: "5px" }}>
            <strong>Note:</strong> Complete rules available in Library Handbook. Contact library staff for details.
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

