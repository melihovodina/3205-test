import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface UrlInfoModalProps {
  show: boolean;
  onHide: () => void;
  analytics: { clickCount: number; recentIps: string[] } | null;
}

const ModalWindow: React.FC<UrlInfoModalProps> = ({ show, onHide, analytics }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>URL Analytics</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {analytics ? (
          <div>
            <p><strong>Click Count:</strong> {analytics.clickCount}</p>
            <p><strong>Recent IPs:</strong></p>
            <ul>
              {analytics.recentIps.map((ip, index) => (
                <li key={index}>{ip}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalWindow;