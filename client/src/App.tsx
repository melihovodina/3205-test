import React from 'react';
import './index.css';
import LinkTable from './components/linkTable/LinkTable';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className='App'>
      <div className='main'>
        <h1 className="text-white">URL Shortener</h1>
        <Container className = "mt-5">
          <LinkTable/>
        </Container>
      </div>
    </div>
  )
}

export default App;