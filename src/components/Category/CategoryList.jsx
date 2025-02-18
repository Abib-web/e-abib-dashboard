import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectAllCategories, createCategory, updateCategory, deleteCategory } from '../../store/categorySlice';
import { fetchSubCategories, selectAllSubCategories, createSubCategory, updateSubCategory, deleteSubCategory } from '../../store/subCategorySlice';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CategoryList.css';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const subCategories = useSelector(selectAllSubCategories);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [showAddSubCategoryModal, setShowAddSubCategoryModal] = useState(false);
  const [showEditSubCategoryModal, setShowEditSubCategoryModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    icon: ''
  });

  const [subCategoryFormData, setSubCategoryFormData] = useState({
    name: '',
    description: '',
    category: '',
    icon: ''
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryFormData({ ...subCategoryFormData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [e.target.name]: file });
  };

  const handleAddCategory = () => {
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    dispatch(createCategory(formDataObj));
    setShowAddCategoryModal(false);
    setFormData({
      name: '',
      description: '',
      image: null,
      icon: ''
    });
  };

  const handleAddSubCategory = () => {
    dispatch(createSubCategory(subCategoryFormData));
    setShowAddSubCategoryModal(false);
    setSubCategoryFormData({
      name: '',
      description: '',
      category: '',
      icon: ''
    });
  };

  const handleEditCategory = () => {
    const formDataObj = new FormData();
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    dispatch(updateCategory({ id: selectedCategory._id, updatedCategory: formDataObj }));
    setShowEditCategoryModal(false);
    setSelectedCategory(null);
    setFormData({
      name: '',
      description: '',
      image: null,
      icon: ''
    });
  };

  const handleEditSubCategory = () => {
    dispatch(updateSubCategory({ id: selectedSubCategory._id, updatedSubCategory: subCategoryFormData }));
    setShowEditSubCategoryModal(false);
    setSelectedSubCategory(null);
    setSubCategoryFormData({
      name: '',
      description: '',
      category: '',
      icon: ''
    });
  };

  const handleDeleteCategory = (id) => {
    dispatch(deleteCategory(id));
  };

  const handleDeleteSubCategory = (id) => {
    dispatch(deleteSubCategory(id));
  };

  const handleShowEditCategoryModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: null,
      icon: category.icon
    });
    setShowEditCategoryModal(true);
  };

  const handleShowEditSubCategoryModal = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setSubCategoryFormData({
      name: subCategory.name,
      description: subCategory.description,
      category: subCategory.category._id,
      icon: subCategory.icon
    });
    setShowEditSubCategoryModal(true);
  };

  return (
    <div className="category-list">
      <h2>Gestion des Catégories et Sous-Catégories</h2>
      <Button onClick={() => setShowAddCategoryModal(true)}>Ajouter une Catégorie</Button>
      <Button onClick={() => setShowAddSubCategoryModal(true)}>Ajouter une Sous-Catégorie</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Image</th>
            <th>Icône</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                {category.image && category.image !== "null" && (
                  <img src={`http://localhost:3000${category.image}`} alt="Catégorie" style={{ width: '50px', height: '50px' }} />
                )}
              </td>
              <td>
                {category.icon && (
                  <FontAwesomeIcon icon={category.icon} />
                )}
              </td>
              <td>
                <Button variant="warning" onClick={() => handleShowEditCategoryModal(category)}>Modifier</Button>
                <Button variant="danger" onClick={() => handleDeleteCategory(category._id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Catégorie</th>
            <th>Icône</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subCategories.map(subCategory => (
            <tr key={subCategory._id}>
              <td>{subCategory.name}</td>
              <td>{subCategory.description}</td>
              <td>{subCategory.category?.name}</td>
              <td>
                {subCategory.icon && (
                  <FontAwesomeIcon icon={subCategory.icon} />
                )}
              </td>
              <td>
                <Button variant="warning" onClick={() => handleShowEditSubCategoryModal(subCategory)}>Modifier</Button>
                <Button variant="danger" onClick={() => handleDeleteSubCategory(subCategory._id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Ajouter Catégorie */}
      <Modal show={showAddCategoryModal} onHide={() => setShowAddCategoryModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom de la catégorie"
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
            <Form.Group controlId="formIcon">
              <Form.Label>Icône</Form.Label>
              <Form.Control
                type="text"
                name="icon"
                placeholder="Icône de la catégorie"
                value={formData.icon}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddCategoryModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Modifier Catégorie */}
      <Modal show={showEditCategoryModal} onHide={() => setShowEditCategoryModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la Catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom de la catégorie"
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
            <Form.Group controlId="formIcon">
              <Form.Label>Icône</Form.Label>
              <Form.Control
                type="text"
                name="icon"
                placeholder="Icône de la catégorie"
                value={formData.icon}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditCategoryModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleEditCategory}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Ajouter Sous-Catégorie */}
      <Modal show={showAddSubCategoryModal} onHide={() => setShowAddSubCategoryModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Sous-Catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSubCategoryName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom de la sous-catégorie"
                value={subCategoryFormData.name}
                onChange={handleSubCategoryInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formSubCategoryDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                value={subCategoryFormData.description}
                onChange={handleSubCategoryInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formSubCategoryCategory">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={subCategoryFormData.category}
                onChange={handleSubCategoryInputChange}
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSubCategoryIcon">
              <Form.Label>Icône</Form.Label>
              <Form.Control
                type="text"
                name="icon"
                placeholder="Icône de la sous-catégorie"
                value={subCategoryFormData.icon}
                onChange={handleSubCategoryInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddSubCategoryModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleAddSubCategory}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Modifier Sous-Catégorie */}
      <Modal show={showEditSubCategoryModal} onHide={() => setShowEditSubCategoryModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la Sous-Catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSubCategoryName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom de la sous-catégorie"
                value={subCategoryFormData.name}
                onChange={handleSubCategoryInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formSubCategoryDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                value={subCategoryFormData.description}
                onChange={handleSubCategoryInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formSubCategoryCategory">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={subCategoryFormData.category}
                onChange={handleSubCategoryInputChange}
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formSubCategoryIcon">
              <Form.Label>Icône</Form.Label>
              <Form.Control
                type="text"
                name="icon"
                placeholder="Icône de la sous-catégorie"
                value={subCategoryFormData.icon}
                onChange={handleSubCategoryInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditSubCategoryModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleEditSubCategory}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryList;
