import React from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import Header from "../components/Header";
import NavbarComp from "../components/NavbarComp";
import Footer from "../components/Footer";

const ENewsPapersPage = () => {
  const newspapers = [
    {
      category: "English Newspapers",
      items: [
        { title: "The Times of India", url: "https://timesofindia.indiatimes.com/", desc: "Leading English daily newspaper." },
        { title: "The Indian Express", url: "https://indianexpress.com/", desc: "National English daily with in-depth analysis." },
        { title: "The Hindu", url: "https://www.thehindu.com/", desc: "South India's leading English daily." },
        { title: "Hindustan Times", url: "https://www.hindustantimes.com/", desc: "Delhi-based English newspaper." },
      ],
    },
    {
      category: "Marathi Newspapers",
      items: [
        { title: "Lokmat", url: "https://www.lokmat.com/", desc: "Popular Marathi daily." },
        { title: "Sakal", url: "https://www.esakal.com/", desc: "Leading Marathi newspaper from Pune." },
      ],
    },
    {
      category: "Regional & Others",
      items: [
        { title: "BBC News", url: "https://www.bbc.com/news", desc: "International news." },
        { title: "Economic Times", url: "https://economictimes.indiatimes.com/", desc: "Business and economy news." },
      ],
    },
  ];

  const accessInfo = [
    "Free access to e-newspapers through library links.",
    "Some newspapers require institutional login.",
    "Contact library for access issues or print editions.",
  ];

  const sectionStyle = {
    marginBottom: "3rem",
    padding: "2rem",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f8f9fa",
  };

  const titleStyle = {
    color: "#703c19",
    fontWeight: "bold",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
  };

  const containerStyle = {
    boxShadow: "2px 2px 12px #606060",
    padding: "2rem 0",
    minHeight: "80vh",
  };

  const h1Style = {
    ...titleStyle,
    fontSize: "3rem",
  };

  const h3Style = {
    ...titleStyle,
    borderBottom: "3px solid #703c19",
    paddingBottom: "1rem",
  };

  const cardStyle = {
    border: "none",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease-in-out",
  };

  const cardTitleStyle = {
    color: "#703c19",
    fontWeight: "bold",
  };

  const buttonStyle = {
    borderColor: "#703c19",
    color: "#703c19",
  };

  return (
    <>
      <Header />
      <NavbarComp />
      <Container fluid style={containerStyle}>
        <Row>
          <Col lg={12}>
            <h1 className="text-center mb-5" style={h1Style}>
              E-NEWS PAPERS
            </h1>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={11}>
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

            {newspapers.map((section, secIdx) => (
              <div key={secIdx} style={sectionStyle}>
                <h3 style={h3Style}>
                  {section.category}
                </h3>
                <Row>
                  {section.items.map((item, idx) => (
                    <Col md={6} lg={4} key={idx} className="mb-4">
                      <Card style={cardStyle} className="hover-card">
                        <Card.Body>
                          <Card.Title style={cardTitleStyle}>{item.title}</Card.Title>
                          <Card.Text>{item.desc}</Card.Text>
                          <Button 
                            variant="outline-primary" 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={buttonStyle}
                          >
                            Read Now
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}

            <div className="text-center mt-5">
              <p style={{ fontSize: "1.1rem", color: "#666" }}>
                Stay updated with current affairs through library's e-newspapers collection.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ENewsPapersPage;

