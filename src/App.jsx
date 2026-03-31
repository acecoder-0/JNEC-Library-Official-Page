import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavbarComp from './components/NavbarComp';
import Slider from './components/Slider';
import TopMarquee from './components/TopMarquee';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UlfsPage from './pages/UlfsPage';
import PhotoGalleryPage from './pages/PhotoGalleryPage';
import JournalsPage from './pages/JournalsPage';
import AboutPage from './pages/AboutPage';
import FeedbackPage from './pages/FeedbackPage';
import EResourcesPage from './pages/EResourcesPage';
import FAQPage from './pages/FAQPage';
import QuestionPapersPage from './pages/QuestionPapersPage';
import LibRulesPage from './pages/LibRulesPage';
import ContactPage from './pages/ContactPage';
import AskLibrarianPage from './pages/AskLibrarianPage';
import ServicesPage from './pages/ServicesPage';
import PrintResourcesPage from './pages/PrintResourcesPage';
import ENewsPapersPage from './pages/ENewsPapersPage';
import NewArrivalBooksPage from './pages/NewArrivalBooksPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Header />
          <NavbarComp />
          <Slider />
          <TopMarquee />
          <Container fluid>
            <Row>
              <Col sm={3}>
                <Sidebar />
              </Col>
              <Col sm={9}>
                <MainContent />
              </Col>
            </Row>
          </Container>
          <Footer />
        </>
      } />
      <Route path="/ulfs" element={<UlfsPage />} />
      <Route path="/gallery" element={<PhotoGalleryPage />} />
      <Route path="/journals" element={<JournalsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/e-resources" element={<EResourcesPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/question-papers" element={<QuestionPapersPage />} />
      <Route path="/lib-rules" element={<LibRulesPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/ask-librarian" element={<AskLibrarianPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/print" element={<PrintResourcesPage />} />
      <Route path="/e-news-papers" element={<ENewsPapersPage />} />
      <Route path="/new-arrival-books" element={<NewArrivalBooksPage />} />
    </Routes>
  );
}

export default App;
