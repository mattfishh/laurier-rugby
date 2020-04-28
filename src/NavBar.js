import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './components/NavBar.css'


function NavBar() {
  var page = window.location.href
  var arr = page.split('/')
  page = arr.pop();

  return (
    <div className='componentModel'>
      <div className='navHeader'>
        <h4 className='navHeaderText'>LAURIER RUGBY</h4>
        <img className='navBarImg' src="https://www.pngkey.com/png/full/67-674639_wlu-laurier-golden-hawks-logo-no-text-wilfrid.png" alt='Laurier Golden Hawks Logo'/>
      </div>
      
      <div className='navBarItems'>
          <Navbar variant="dark" id="nav" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav " />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/schedule">Schedule</Nav.Link>
              <Nav.Link href="/alumni">Alumni</Nav.Link>
              <Nav.Link href="/recruits">Recruits</Nav.Link>
              <Nav.Link href="/roster">Roster</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default NavBar;