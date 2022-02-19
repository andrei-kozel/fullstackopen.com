import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
  const { message, type } = notification
  return (
    <div style={{ position: 'fixed', right: '10px', bottom: '10px' }}>
      <Alert variant={type}>{message}</Alert>
    </div>
  )
}

export default Notification
