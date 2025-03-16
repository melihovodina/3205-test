import React, { ReactNode } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface UrlInfoModalProps {
  show: boolean;
  onHide: () => void;
  bodyContent: ReactNode;
}

const ModalWindow: React.FC<UrlInfoModalProps> = ({ show, onHide, bodyContent }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>URL Analytics</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bodyContent}
      </Modal.Body>
    </Modal>
  );
};

export default ModalWindow;