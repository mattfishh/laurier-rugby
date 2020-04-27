import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './components/NavBar.css'


function NavBar() {
  var page = window.location.href

  var arr = page.split('/')
  var page = arr.pop();

  return (
    <div class='componentModel'>
      <div class='navHeader'>
        <h4 class='navHeaderText'>LAURIER RUGBY</h4>
        <img class='navBarImg' src="https://www.pngkey.com/png/full/67-674639_wlu-laurier-golden-hawks-logo-no-text-wilfrid.png"/>
      </div>
      
      <div class='navBarItems'>
          <Navbar variant="dark" id="nav" expand="lg">
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
      </div>
    </div>
  );
}

export default NavBar;