import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <Provider store={store}>
    <Container>
      <App />
    </Container>
  </Provider>,
  document.getElementById('root')
)
