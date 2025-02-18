import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditUserModal = ({ show, handleClose, handleSave, user }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phone: user.phone
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifier l'utilisateur</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Adresse</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Téléphone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Sauvegarder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
