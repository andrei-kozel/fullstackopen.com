import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/actions/userActions'

const LogInModal = ({ setVisability }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const logIn = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
    setVisability(false)
  }

  const closeForm = () => {
    setVisability(false)
    setUsername('')
    setPassword('')
  }

  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={logIn}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </Form.Group>
            <Button variant="primary me-2" type="submit">
              Submit
            </Button>
            <Button variant="secondary" onClick={closeForm}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  )
}

export default LogInModal
