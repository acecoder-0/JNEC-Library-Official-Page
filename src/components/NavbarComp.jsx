import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavbarComp = () => {
  return (
    <Navbar className="navbar navbar-inverse navbar-default" style={{backgroundColor: '#703c19'}} expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav me-auto" style={{paddingLeft: '60px'}}>
            <NavLink to="/" className="nav-link" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}><strong>HOME</strong></NavLink>
            <NavLink to="/about" className="nav-link"><strong>ABOUT US</strong></NavLink>
            <NavLink to="/services" className="nav-link"><strong>SERVICES & FACILITIES</strong></NavLink>
            <NavLink to="/print" className="nav-link"><strong>PRINT RESOURCES</strong></NavLink>
            <NavLink to="/e-resources" className="nav-link"><strong>E- RESOURCES</strong></NavLink>
            <Nav.Link href="https://erp.mgmu.ac.in" target="_blank" rel="noopener noreferrer"><strong>OPAC</strong></Nav.Link>
<NavLink to="/faq" className="nav-link"><strong>FAQ</strong></NavLink>
            <NavLink to="/lib-rules" className="nav-link"><strong>LIB. RULES</strong></NavLink>
            <NavLink to="/contact" className="nav-link"><strong>CONTACT US</strong></NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
