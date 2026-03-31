import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import Header from '../components/Header';
import NavbarComp from '../components/NavbarComp';
import Footer from '../components/Footer';

const faqs = [
  {
    question: '1. Who can become members of the Library?',
    answer: 'All the students, research scholars, teaching & non-teaching staff of MGM Jawaharlal Nehru Engineering College are eligible for membership of the library.'
  },
  {
    question: '2. What are the timings of the library?',
    answer: 'Monday to Saturday: 9.00 AM to 5.00 PM. Reading Hall: 24x7 during PL/Exam.'
  },
  {
    question: '3. How many books can a student borrow?',
    answer: 'UG Students: 2 books, PG Students: 4 books, Faculty: 6 books. Period: 15 days.'
  },
  {
    question: '4. What are the membership fees?',
    answer: 'UG Students: Rs. 100/-, PG Students: Rs. 200/-, Faculty: Free (Refundable Security Deposit Rs. 500).'
  },
  {
    question: '5. How to access E-Resources?',
    answer: 'Use institutional login through library proxy or contact staff for credentials. Remote access via VPN.'
  },
  {
    question: '6. How to use OPAC?',
    answer: 'Visit https://erp.mgmu.ac.in, login with institutional credentials to search catalogue, reserve books.'
  },
  {
    question: '7. What is the fine for overdue books?',
    answer: 'Rs. 2/- per day per book after due date.'
  },
  {
    question: '8. Can I take personal belongings inside?',
    answer: 'No bags/laptops/mobile phones allowed. Only books/notes. Lockers available.'
  },
  {
    question: '9. Is photocopying allowed?',
    answer: 'Yes, photocopy service available at nominal rates. Self-service not permitted.'
  },
  {
    question: '10. How to suggest book purchase?',
    answer: 'Fill Requisition Form at circulation counter or email to library staff.'
  },
  {
    question: '11. Are journals back volumes available?',
    answer: 'Yes, bound volumes available in Reference Section. Photocopy service for articles.'
  },
  {
    question: '12. Is inter-library loan available?',
    answer: 'Yes, through MGM University libraries and DELNET/INFLIBNET.'
  },
  {
    question: '13. Contact for help?',
    answer: 'Email: jneclibrary@gmail.com | Phone: [Contact Number]'
  },
];

const FAQPage = () => {
  const sectionStyle = {
    marginBottom: '2rem',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f8f9fa',
  };

  const titleStyle = {
    color: '#703c19',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  };

  return (
    <>
      <Header />
      <NavbarComp />
      <Container fluid style={{ boxShadow: '2px 2px 12px #606060', padding: '2rem 0' }}>
        <Row>
          <Col lg={12}>
            <h1 className="text-center mb-5" style={{ 
              ...titleStyle, 
              fontSize: '3rem' 
            }}>
              FREQUENTLY ASKED QUESTIONS (FAQ)
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div style={sectionStyle}>
              <Accordion defaultActiveKey="0">
                {faqs.map((faq, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header style={{ fontWeight: 'bold', color: '#703c19' }}>
                      {faq.question}
                    </Accordion.Header>
                    <Accordion.Body style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                      {faq.answer}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
            <div className="text-center mt-4">
              <p style={{ fontSize: '1.1rem', color: '#666' }}>
                For more questions, contact library staff at circulation desk or email jneclibrary@gmail.com
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default FAQPage;

