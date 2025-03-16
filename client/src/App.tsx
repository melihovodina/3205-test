import React, { useState, useRef } from 'react';
import './index.css';
import LinkTable from './components/linkTable/LinkTable';
import { Container, Button, Form } from 'react-bootstrap';
import ModalWindow from './components/modalWindow/ModalWindow';
import { shortUrl } from './api/api';

// Define the type for the LinkTable ref
interface LinkTableRef {
  refreshUrls: () => void;
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [originalUrl, setOriginalUrl] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [alias, setAlias] = useState('');
  const linkTableRef = useRef<LinkTableRef>(null);

  const handleCreateClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    try {
      const expiresAtISO = new Date(expiresAt).toISOString();
      const response = await shortUrl({ originalUrl, expiresAt: expiresAtISO, alias });
      console.log('Short URL created:', response);
      handleCloseModal();
      if (linkTableRef.current) {
        linkTableRef.current.refreshUrls();
      }
    } catch (error) {
      console.error('Error creating short URL:', error);
    }
  };

  return (
    <div className='App'>
      <div className='main'>
        <div className="header">
          <h1 className="text-white">URL Shortener</h1>
          <Button variant="success" onClick={handleCreateClick}>
            Create
          </Button>
        </div>
        <Container className="mt-5">
          <LinkTable ref={linkTableRef} />
        </Container>
      </div>
      <ModalWindow
        show={showModal}
        onHide={handleCloseModal}
        bodyContent={
          <Form>
            <Form.Group controlId="formOriginalUrl">
              <Form.Label>Original URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter original URL"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formExpiresAt">
              <Form.Label>Expires At</Form.Label>
              <Form.Control
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formAlias">
              <Form.Label>Alias</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter alias"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" onClick={handleSubmit}>
              Create
            </Button>
          </Form>
        }
      />
    </div>
  );
}

export default App;