import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import Blog from './components/Blog'
import Main from './components/Main'
import Navigation from './components/Navigation'
import Users from './components/Users'

const App = () => {
  return (
    <div>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
