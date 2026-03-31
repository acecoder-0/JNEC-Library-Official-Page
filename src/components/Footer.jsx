import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container fluid style={{backgroundColor: '#703c19', boxShadow: '2px 2px 12px #606060', padding: '20px', color: '#fff', textAlign: 'center'}}>
      <div>
        <h5><strong>Copyright © MGMs JNEC</strong></h5>
Jawaharlal Nehru Engineering College, Chhatrapati Sambhajinagar
      </div>
    </Container>
  );
};

export default Footer;
