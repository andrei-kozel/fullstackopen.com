import React from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>BlogApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="">
              <Button variant="light me-2 ">Home</Button>
            </Link>
            <Link to="/users">
              <Button variant="light me-2">Users</Button>
            </Link>
          </Nav>
          <Button variant="outline-success">Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
