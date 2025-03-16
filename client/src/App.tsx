import React from 'react';
import './index.css';
import LinkTable from './components/linkTable/LinkTable';
import { Container, Button } from 'react-bootstrap';

function App() {
  const handleCreateClick = () => {
    // Обработчик события для кнопки "Create"
    console.log('Create button clicked');
  };

  return (
    <div className='App'>
      <div className='main'>
        <div className="header">
          <h1 className="text-white">URL Shortener</h1>
          <Button className="create-button" variant="success" onClick={handleCreateClick}>
            Create
          </Button>
        </div>
        <Container className="mt-5">
          <LinkTable />
        </Container>
      </div>
    </div>
  );
}

export default App;