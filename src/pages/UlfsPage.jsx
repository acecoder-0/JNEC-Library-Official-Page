import React from 'react';
import { Container, Row, Col, Accordion, Card, Button, ListGroup } from 'react-bootstrap';
import Header from '../components/Header';
import NavbarComp from '../components/NavbarComp';
import Footer from '../components/Footer';

const UlfsPage = () => {
  const dictionaryLinks = [
    { name: 'Acronym Finder', url: 'http://www.acronymfinder.com/' },
    { name: 'Cambridge Free English Dictionary and Thesaurus', url: 'http://dictionary.cambridge.org/' },
    { name: 'Collins Dictionaries', url: 'http://www.collinsdictionary.com/' },
    { name: 'Crossword Dictionary', url: 'http://www.oneacross.com/' },
    { name: 'Definations.net', url: 'http://www.definitions.net/' },
    { name: 'Dictionary.com', url: 'http://dictionary.com/' },
    { name: 'FOLDOC – Computing Dictionary', url: 'http://foldoc.org/' },
    { name: 'Free online Dictionaries', url: 'http://www.thefreedictionary.com/' },
    { name: 'Macmillan Dictionary and Thesaurus', url: 'http://www.macmillandictionary.com/' },
    { name: 'Medical dictionary', url: 'http://dictionary.webmd.com/' },
    { name: 'Merriam-Webster Online: Dictionary and Thesaurus', url: 'http://www.merriam-webster.com/' },
    { name: 'Oxford Dictionary', url: 'http://www.oxforddictionaries.com/' },
{ name: "Oxford Learner\\'s Dictionary", url: 'http://www.oxfordlearnersdictionaries.com/' },
    { name: 'Reference.com', url: 'http://www.reference.com/' },
    { name: 'The free dictionary', url: 'http://www.thefreedictionary.com/' },
    { name: 'Urban Dictionary', url: 'http://www.urbandictionary.com/' },
    { name: 'Visual Thesaurus', url: 'http://www.visualthesaurus.com/' },
    { name: 'Vocabulary.com', url: 'http://www.vocabulary.com/dictionary' },
  ];

  const encyclopediaLinks = [
    { name: 'Answers.com', url: 'http://library.jnec.org/Answers.com' },
    { name: 'Bartleby', url: 'http://bartleby.com/' },
    { name: 'Dkonline.encyclopedia', url: 'http://www.dke-encyc.com/' },
    { name: 'Encyclopedia Britannica', url: 'http://www.britannica.com/' },
    { name: 'Encyclopedia Mythica', url: 'http://www.pantheon.org/' },
    { name: 'Encyclopedia of Life', url: 'http://eol.org/' },
    { name: 'Encyclopedia of Philosophy', url: 'http://www.iep.utm.edu/' },
    { name: 'Encyclopedia.com', url: 'http://www.encyclopedia.com/' },
    { name: 'Free online Encyclopedia', url: 'http://www.encyclopedia.com/' },
    { name: 'Freebase', url: 'http://www.freebase.com/' },
    { name: 'How Stuff Works', url: 'http://www.howstuffworks.com/' },
    { name: 'Infoplease', url: 'http://www.infoplease.com/' },
    { name: 'Marathi Vishwakosh', url: 'http://www.marathivishwakosh.in/' },
    { name: 'Stanford Encyclopedia of Philosophy', url: 'http://plato.stanford.edu/contents.html' },
    { name: 'Who2', url: 'http://www.who2.com/' },
    { name: 'Wikipedia', url: 'http://library.jnec.org/en.wikipedia.org/' },
    { name: 'World digital library', url: 'http://www.wdl.org/en/' },
  ];

  const bibliographyLinks = [
    { name: 'Biographies of great men and women from India (Bharat)', url: 'http://www.freeindia.org/biographies/' },
    { name: 'Biographies of Famous Indians', url: 'http://www.iloveindia.com/indian-heroes/index.html' },
  ];

  const careerLinks = [
    { name: 'CSIR (Council of Scientific & Industrial Research)', url: 'http://www.csirhrdg.res.in/' },
    { name: 'MPSC (Maharashtra Public Service Commission)', url: 'http://www.mpsc.gov.in/indexe.jsp' },
    { name: 'UPSC (Union Public Service Commission)', url: 'http://www.upsc.gov.in/' },
    { name: 'UGC (University Grants Commission)', url: 'http://www.ugc.ac.in/' },
    { name: 'NET (National Eligibility Test)', url: 'http://www.ugcnetonline.in/' },
    { name: 'SET (State Eligibility Test)', url: 'http://setexam.unipune.ac.in/' },
    { name: 'NMK', url: 'http://nmk.co.in/' },
    { name: 'Guru Job Alert', url: 'http://gurujobalert.com/' },
    { name: 'Sarkari Naukari', url: 'http://www.sarkarinaukri2014.in/downloads/' },
    { name: 'Google Scholar', url: 'http://scholar.google.co.in/' },
  ];

  const competitiveLinks = [
    { name: 'INDIABIX', url: 'http://www.indiabix.com/' },
    { name: 'Tamil Cube', url: 'http://www.tamilcube.com/' },
    { name: 'A 2 Z Interviews (Upcoming entrance exams)', url: 'http://www.a2zinterviews.com/' },
    { name: 'General Knowledge Today', url: 'http://www.gktoday.in/' },
    { name: 'Quiz Mantra', url: 'http://www.quizmantra.com/' },
    { name: 'Educational Era', url: 'http://www.educationalera.com/' },
    { name: 'Exam Join', url: 'http://www.examjoin.com/' },
    { name: 'Jjagran Josh', url: 'http://www.jagranjosh.com/' },
    { name: 'Placement Yogi', url: 'http://www.placementyogi.com/' },
    { name: 'Question Papers', url: 'http://www.questionpapers.net.in/' },
    { name: 'General Knowledge Multiple Choice Questions and Answers', url: 'http://www.gkmcq.com/' },
    { name: 'Quiz Global', url: 'http://www.quizglobal.com/' },
    { name: 'Union Public Service Commission', url: 'http://www.upsc.gov.in/' },
    { name: 'WizIQ', url: 'http://www.wiziq.com/' },
    { name: 'Online General Knowledge Guide', url: 'http://www.onlinegkguide.com/' },
    { name: 'General Knowledge Today', url: 'http://www.generalknowledgetoday.com/' },
    { name: 'Current General Knowledge', url: 'http://www.currentgk.co.in/' },
  ];

  const technicalLinks = [
    { name: 'Twin India', url: 'http://twin-india.org/' },
    { name: 'STC India', url: 'http://www.stc-india.org/' },
  ];

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

  const renderLinks = (links) => (
    <ListGroup variant="flush">
      {links.map((link, index) => (
        <ListGroup.Item key={index} className="p-2">
          <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#703c19' }}>
            {link.name}
          </a>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );

  return (
    <>
      <Header />
      <NavbarComp />
      <Container fluid style={{ boxShadow: '2px 2px 12px #606060' }}>
        <Row>
          <Col>
            <h1 className="text-center my-4">USEFUL LINKS FOR STUDENTS</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={9}>
            <h4 className="text-center mb-4" style={{ color: '#703c19' }}>Important Link for Students</h4>
            <p className="text-center">Click on the Link to open the Website</p>
            
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Online Dictionary Websites</Accordion.Header>
                <Accordion.Body>{renderLinks(dictionaryLinks)}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Online Encylopedia Websites</Accordion.Header>
                <Accordion.Body>{renderLinks(encyclopediaLinks)}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Online Bibliographies and Autobiographies Websites</Accordion.Header>
                <Accordion.Body>{renderLinks(bibliographyLinks)}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Online Career Development Websites</Accordion.Header>
                <Accordion.Body>{renderLinks(careerLinks)}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Online Competitive Exams Websites</Accordion.Header>
                <Accordion.Body>{renderLinks(competitiveLinks)}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>Online Technical Writing Websites</Accordion.Header>
                <Accordion.Body>{renderLinks(technicalLinks)}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col sm={3} style={{ backgroundColor: '#d7cdc3' }}>
            <h4 className="text-center mt-3" style={{ color: '#703c19', textDecoration: 'underline' }}>
              <strong>QUICK LINKS</strong>
            </h4>
            <hr />
            {renderLinks(quickLinks)}
            <hr />
            <div className="text-center">
              <img 
src="/images/GO-Green-planet.jpg"
                alt="GO Green" 
                style={{ boxShadow: '2px 2px 12px #606060', maxWidth: '100%' }} 
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default UlfsPage;
