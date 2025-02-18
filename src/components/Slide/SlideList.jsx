import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import './SlideList.css';

const SlideList = () => {
  const [slides, setSlides] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    link: ''
  });

  useEffect(() => {
    const fetchSlides = async () => {
      const response = await axios.get('http://localhost:3000/api/slides');
      setSlides(response.data.data.slides);
    };
    fetchSlides();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleAddSlide = async () => {
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }
    await axios.post('http://localhost:3000/api/slides', formDataObj, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    setShowAddModal(false);
    fetchSlides();
  };

  const handleEditSlide = async () => {
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }
    await axios.patch(`http://localhost:3000/api/slides/${selectedSlide._id}`, formDataObj, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    setShowEditModal(false);
    fetchSlides();
  };

  const handleDeleteSlide = async (id) => {
    await axios.delete(`http://localhost:3000/api/slides/${id}`);
    fetchSlides();
  };

  const handleShowImageModal = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  return (
    <div className="slide-list">
      <h2>Gestion des Slides</h2>
      <Button onClick={() => setShowAddModal(true)}>Ajouter un Slide</Button>
      <div className="slide-table">
        {slides.map((slide) => (
          <div key={slide._id} className="slide-item">
            <img src={`http://localhost:3000${slide.image}`} alt={slide.title} className="slide-image" onClick={() => handleShowImageModal(`http://localhost:3000${slide.image}`)} />
            <div className="slide-info">
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
              <p>{slide.link}</p>
              <Button variant="warning" onClick={() => { setSelectedSlide(slide); setFormData(slide); setShowEditModal(true); }}>Modifier</Button>
              <Button variant="danger" onClick={() => handleDeleteSlide(slide._id)}>Supprimer</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Ajouter */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Slide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Titre du slide"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Form.Group controlId="formLink">
              <Form.Label>Lien</Form.Label>
              <Form.Control
                type="text"
                name="link"
                placeholder="Lien"
                value={formData.link}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddSlide}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Modifier */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le Slide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Titre</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Titre du slide"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </Form.Group>
            <Form.Group controlId="formLink">
              <Form.Label>Lien</Form.Label>
              <Form.Control
                type="text"
                name="link"
                placeholder="Lien"
                value={formData.link}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleEditSlide}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Afficher Image */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Image du Slide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedImage} alt="Slide" className="modal-img" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SlideList;
