import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDeleteModal = ({ show, handleClose, handleConfirm, user }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmer la suppression</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Êtes-vous sûr de vouloir supprimer {user && user.username} ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
