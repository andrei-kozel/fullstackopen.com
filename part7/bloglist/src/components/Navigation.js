import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadUser, logoutUser } from '../store/actions/userActions'
import LogInModal from './LogInModal'

const Navigation = () => {
  const [showModal, setShowModal] = useState(false)
  const user = useSelector((state) => state.userReducer.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [])

  const handleLogOut = () => {
    dispatch(logoutUser())
  }

  const handleLogin = async () => {
    setShowModal(true)
  }

  return (
    <>
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
            <div>
              {user ? (
                <div>
                  {user.name} logged{' '}
                  <Button
                    variant="outline-danger"
                    type="submit"
                    onClick={handleLogOut}>
                    Log Out
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline-success"
                  type="submit"
                  onClick={handleLogin}>
                  Log In
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showModal && (
        <LogInModal setVisability={setShowModal} handleLogin={handleLogin} />
      )}
    </>
  )
}

export default Navigation
