import React from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import NavbarComp from '../components/NavbarComp';
import Footer from '../components/Footer';

const EResourcesPage = () => {
  const resources = [
    // Major Databases
    { category: 'Major Databases', items: [
      { title: 'EBSCO - Academic Search Complete', url: 'https://search.ebscohost.com', desc: 'Full-text database covering multiple disciplines.' },
      { title: 'IEEE Xplore Digital Library', url: 'https://ieeexplore.ieee.org', desc: 'Technical literature in electrical engineering, computer science.' },
      { title: 'SpringerLink', url: 'https://link.springer.com', desc: 'Books and journals in science, technology, medicine.' },
      { title: 'ScienceDirect', url: 'https://www.sciencedirect.com', desc: 'Full-text scientific, technical, medical journals.' },
      { title: 'SCOPUS', url: 'https://www.scopus.com', desc: 'Largest abstract and citation database of peer-reviewed literature.' },
      { title: 'TURNITIN', url: 'https://www.turnitin.com', desc: 'Plagiarism detection and prevention tool.' },
    ] },
    // E-Books
    { category: 'E-Books', items: [
      { title: 'Springer E-Books', url: 'https://link.springer.com', desc: 'Thousands of e-books in engineering and technology.' },
      { title: 'Wiley Online Library', url: 'https://onlinelibrary.wiley.com', desc: 'E-books and journals in various subjects.' },
    ] },
    // E-Journals
    { category: 'E-Journals', items: [
      { title: 'ASCE Journals', url: 'https://ascelibrary.org', desc: 'Civil engineering journals.' },
      { title: 'IEEE Journals', url: 'https://ieeexplore.ieee.org', desc: 'Electronics and engineering journals.' },
    ] },
    // Open Access
    { category: 'Open Access Resources', items: [
      { title: 'DOAJ - Directory of Open Access Journals', url: 'https://doaj.org', desc: 'Free, full-text quality controlled journals.' },
      { title: 'arXiv', url: 'https://arxiv.org', desc: 'Preprints in physics, math, computer science.' },
      { title: 'PubMed Central', url: 'https://www.ncbi.nlm.nih.gov/pmc', desc: 'Free full-text biomedical literature.' },
    ] },
  ];

  const accessInfo = [
    'Use institutional login / Proxy access through library.',
    'Contact library staff for username/password for subscribed resources.',
    'Remote access available via VPN or library proxy.',
  ];

  const sectionStyle = {
    marginBottom: '3rem',
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

  const cardStyle = {
    border: 'none',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  };

  const cardTitleStyle = {
    color: '#703c19',
    fontWeight: 'bold',
  };

  return (
    <>
      <Header />
      <NavbarComp />
      <Container fluid style={{ boxShadow: '2px 2px 12px #606060', padding: '2rem 0', minHeight: '80vh' }}>
        <Row>
          <Col lg={12}>
            <h1 className="text-center mb-5" style={{ 
              ...titleStyle, 
              fontSize: '3rem', 
            }}>
              E - RESOURCES
            </h1>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={11}>
            {/* Access Information */}
            <div style={sectionStyle}>
              <h4 style={titleStyle}>Access Information</h4>
              <Alert variant="info">
                <ul>
                  {accessInfo.map((info, idx) => (
                    <li key={idx}>{info}</li>
                  ))}
                </ul>
              </Alert>
            </div>

            {/* Resources Sections */}
            {resources.map((section, secIdx) => (
              <div key={secIdx} style={sectionStyle}>
                <h3 style={{ ...titleStyle, borderBottom: '3px solid #703c19', paddingBottom: '1rem' }}>
                  {section.category}
                </h3>
                <Row>
                  {section.items.map((item, idx) => (
                    <Col md={6} lg={4} key={idx} className="mb-4">
                      <Card style={cardStyle} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} 
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <Card.Body>
                          <Card.Title style={cardTitleStyle}>{item.title}</Card.Title>
                          <Card.Text>{item.desc}</Card.Text>
                          <Button 
                            variant="outline-primary" 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ borderColor: '#703c19', color: '#703c19' }}
                          >
                            Access
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}

            <div className="text-center mt-5">
              <p style={{ fontSize: '1.1rem', color: '#666' }}>
                For more resources or assistance, contact library staff or visit the circulation desk.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default EResourcesPage;

