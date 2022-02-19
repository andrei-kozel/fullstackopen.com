import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Routes, Navigate } from 'react-router-dom'
import Footer from './components/Footer'
import FullBlogPage from './components/FullBlogPage'
import Main from './components/Main'
import Navigation from './components/Navigation'
import User from './components/User'
import Users from './components/Users'

const App = () => {
  return (
    <div>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<FullBlogPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  )
}

export default App
