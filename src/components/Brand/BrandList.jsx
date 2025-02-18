import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, selectAllBrands, createBrand, updateBrand, deleteBrand } from '../../store/brandSlice';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BrandList.css';

const BrandList = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectAllBrands);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    icon: null,
  });

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleFileChangeIcon = (e) => {
    const file = e.target.files[0];
    if (file.size > 100000) { // 100 KB limit
      toast.error("L'icône est trop grande, la taille doit être inférieure à 100 KB.");
      return;
    }
    setFormData({ ...formData, icon: file });
  };

  const handleAddBrand = () => {
    
    if (!formData.icon) {
      toast.error("Veuillez télécharger une icône.");
      return;
    }

    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }
    console.log(formDataObj)
    dispatch(createBrand(formDataObj));
    setShowAddModal(false);
    setFormData({
      name: '',
      description: '',
      image: null,
      icon: null,
    });
  };

  const handleEditBrand = () => {
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    dispatch(updateBrand({ id: selectedBrand._id, updatedBrand: formDataObj }));
    setShowEditModal(false);
    setSelectedBrand(null);
    setFormData({
      name: '',
      description: '',
      image: null,
      icon: null,
    });
  };

  const handleDeleteBrand = (id) => {
    dispatch(deleteBrand(id));
  };

  const handleShowEditModal = (brand) => {
    setSelectedBrand(brand);
    setFormData({
      name: brand.name,
      description: brand.description,
      image: null,
      icon: null,
    });
    setShowEditModal(true);
  };

  const handleShowImageModal = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  return (
    <div className="brand-list">
      <h2>Gestion des Marques</h2>
      <Button onClick={() => setShowAddModal(true)}>Ajouter une Marque</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map(brand => (
            <tr key={brand._id}>
              <td>{brand.name}</td>
              <td>{brand.description}</td>
              <td>
                {brand.image && (
                  <>
                    <Button variant="info" onClick={() => handleShowImageModal(brand.image)}>Afficher Image</Button>
                  </>
                )}
              </td>
              <td>
                <Button variant="warning" onClick={() => handleShowEditModal(brand)}>Modifier</Button>
                <Button variant="danger" onClick={() => handleDeleteBrand(brand._id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Ajouter */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Marque</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom de la marque"
                value={formData.name}
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
            <Form.Group controlId='formIcon'>
              <Form.Label>Icône</Form.Label>
              <Form.Control
                type='file'
                name='icon'
                onChange={handleFileChangeIcon}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddBrand}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Modifier */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la Marque</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom de la marque"
                value={formData.name}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleEditBrand}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Afficher Image */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Image de la Marque</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && (
            <img src={`http://localhost:3000${selectedImage}`} alt="Marque" style={{ width: '100%' }} />
          )}
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

export default BrandList;
