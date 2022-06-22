import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { getAuth } from 'firebase/auth';

export default () => {
  const logoutHandler = () => {
    const auth = getAuth();

    auth.signOut((data) => {
      console.log(data);
    });
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">TOHDOH</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/todos">Tohdohs</Nav.Link>
            <Nav.Link href="/reminders">Reminders</Nav.Link>
            <Nav.Link href="/notes">Notes</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
