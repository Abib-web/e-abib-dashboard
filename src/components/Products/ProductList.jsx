import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectAllProducts, createProduct, updateProduct, deleteProduct } from '../../store/productSlice';
import { Button, Modal, Form, Table, Carousel } from 'react-bootstrap';
import './ProductList.css';
import { fetchCategories, selectAllCategories } from '../../store/categorySlice';
import { fetchSubCategories, selectAllSubCategories } from '../../store/subCategorySlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategories);
  const subCategories = useSelector(selectAllSubCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantityAvailable: '',
    category: '',
    images: []
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
  };

  const handleAddProduct = () => {
    const formDataObj = new FormData();
    for (const key in formData) {
      if (key === 'images') {
        formData[key].forEach((file) => {
          formDataObj.append('images', file);
        });
      } else {
        formDataObj.append(key, formData[key]);
      }
    }
  
    dispatch(createProduct(formDataObj));
    setShowAddModal(false);
    setFormData({
      name: '',
      description: '',
      price: '',
      quantityAvailable: '',
      category: '',
      images: []
    });
  };
  
  const handleEditProduct = () => {
    const formDataObj = new FormData();
    for (const key in formData) {
      if (key === 'images') {
        formData[key].forEach((file) => {
          formDataObj.append('images', file);
        });
      } else {
        formDataObj.append(key, formData[key]);
      }
    }
    dispatch(updateProduct({ id: selectedProduct._id, productData: formDataObj }));
    setShowEditModal(false);
    setSelectedProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      quantityAvailable: '',
      category: '',
      images: []
    });
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleShowEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      quantityAvailable: product.quantityAvailable,
      category: product.category,
      images: []
    });
    setShowEditModal(true);
  };

  const handleShowImagesModal = (product) => {
    setSelectedProduct(product);
    setShowImagesModal(true);
  };

  return (
    <div className="product-list">
      <h2>Gestion des Produits</h2>
      <Button onClick={() => setShowAddModal(true)}>Ajouter un Produit</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Quantité Disponible</th>
            <th>Catégorie</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price} €</td>
              <td>{product.quantityAvailable}</td>
              <td>{product.category}</td>
              <td>
                {product.images && product.images.length > 0 && (
                  <img crossorigin="anonymous" src={`http://localhost:3000${product.images[0]}`} alt={product.name} width="50" />
                )}
              </td>
              <td>
                <Button variant="info" onClick={() => handleShowImagesModal(product)}>Afficher Images</Button>
                <Button variant="warning" onClick={() => handleShowEditModal(product)}>Modifier</Button>
                <Button variant="danger" onClick={() => handleDeleteProduct(product._id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modals */}
      {/* Modal Ajouter */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Ajouter un Produit</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Nom du produit"
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
      <Form.Group controlId="formPrice">
        <Form.Label>Prix</Form.Label>
        <Form.Control
          type="number"
          name="price"
          placeholder="Prix"
          value={formData.price}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formQuantityAvailable">
        <Form.Label>Quantité Disponible</Form.Label>
        <Form.Control
          type="number"
          name="quantityAvailable"
          placeholder="Quantité Disponible"
          value={formData.quantityAvailable}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Catégorie</Form.Label>
        <Form.Control
          as="select"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formSubCategory">
        <Form.Label>Sous-catégorie</Form.Label>
        <Form.Control
          as="select"
          name="subCategory"
          value={formData.subCategory}
          onChange={handleInputChange}
        >
          <option value="">Sélectionnez une sous-catégorie</option>
          {subCategories
            .filter((sub) => sub.categoryId === formData.category)
            .map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formImages">
        <Form.Label>Images (4 à 6)</Form.Label>
        <Form.Control
          type="file"
          name="images"
          multiple
          onChange={handleFileChange}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
      Annuler
    </Button>
    <Button variant="primary" onClick={handleAddProduct}>
      Ajouter
    </Button>
  </Modal.Footer>
</Modal>


      {/* Modal Modifier */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier le Produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom du produit"
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
            <Form.Group controlId="formPrice">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Prix"
                value={formData.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formQuantityAvailable">
              <Form.Label>Quantité Disponible</Form.Label>
              <Form.Control
                type="number"
                name="quantityAvailable"
                placeholder="Quantité Disponible"
                value={formData.quantityAvailable}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCategory">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="Catégorie"
                value={formData.category}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formImages">
              <Form.Label>Images (4 à 6)</Form.Label>
              <Form.Control
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleEditProduct}>
            Sauvegarder
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Afficher Images */}
      <Modal show={showImagesModal} onHide={() => setShowImagesModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Images du Produit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && selectedProduct.images && (
            <Carousel>
              {selectedProduct.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    crossorigin="anonymous"
                    className="d-block w-100"
                    src={`http://localhost:3000${image}`}
                    alt={`Product Image ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImagesModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
