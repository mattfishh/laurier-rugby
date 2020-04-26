import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


function NavBar() {
  return (
   
  <Navbar variant="dark" id="nav" expand="lg">
  <Navbar.Brand href="/">
      Laurier Rugby
    </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav " />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/schedule">Schedule</Nav.Link>
      <Nav.Link href="/alumni">Alumni</Nav.Link>
      <Nav.Link href="/recruits">Recruits</Nav.Link>
      <Nav.Link href="/roster">Roster</Nav.Link>
      <Nav.Link href="/media">Media</Nav.Link>
      <Nav.Link href="/sponsors">Corporate Sponsors</Nav.Link>
      <NavDropdown title="Other" id="basic-nav-dropdown">
        <NavDropdown.Item href="/contact">Contact Us</NavDropdown.Item>
        <NavDropdown.Item href="/coaches">Coaching Staff</NavDropdown.Item>
        <NavDropdown.Item href="/forgotsomething">Forgot Something Probably</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  );
}

export default NavBar;