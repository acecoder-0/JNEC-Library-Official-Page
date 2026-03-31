import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Header = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={2} className="text-center p-0">
          <img src="/images/mgm-u-logo.png" alt="MGM Logo" style={{width: '150px', height: '90px'}} className="img-fluid" />
        </Col>
        <Col sm={8} className="text-center py-2">
<h6 className="head_title2"><strong>MGM University</strong></h6>
<h1 className="head_title"><strong>JAWAHARLAL NEHRU ENGINEERING COLLEGE <br /> CENTRAL LIBRARY</strong></h1>
<h6 className="head_title2"><strong>Chhatrapati Sambhajinagar.</strong></h6>
        </Col>
        <Col sm={2} className="text-center p-0">
          <img src="/images/naac-A-grade.jpg" alt="NAAC A Grade" style={{width: '150px', height: '100px'}} className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
