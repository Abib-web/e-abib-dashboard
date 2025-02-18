import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBox, faClipboardList, faTruck, faCog, faSignOutAlt, faBars, faAngleDoubleLeft, faTags, faTrademark, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, logout } from '../../store/authSlice';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isOpen ? faAngleDoubleLeft : faBars} />
      </div>
      {isAuthenticated && (
        <ul>
          <li>
            <Link to="/users">
              <FontAwesomeIcon icon={faUser} />
              {isOpen && <span>Utilisateurs</span>}
            </Link>
          </li>
          <li>
            <Link to="/products">
              <FontAwesomeIcon icon={faBox} />
              {isOpen && <span>Produits</span>}
            </Link>
          </li>
          <li>
            <Link to="/categories">
              <FontAwesomeIcon icon={faTags} />
              {isOpen && <span>Catégories</span>}
            </Link>
          </li>
          <li>
            <Link to="/brands">
              <FontAwesomeIcon icon={faTrademark} />
              {isOpen && <span>Marques</span>}
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <FontAwesomeIcon icon={faClipboardList} />
              {isOpen && <span>Commandes</span>}
            </Link>
          </li>
          <li>
            <Link to="/deliveries">
              <FontAwesomeIcon icon={faTruck} />
              {isOpen && <span>Livraisons</span>}
            </Link>
          </li>
          <li>
            <Link to="/slides">
              <FontAwesomeIcon icon={faSlidersH} />
              {isOpen && <span>Slides</span>}
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FontAwesomeIcon icon={faCog} />
              {isOpen && <span>Paramètres</span>}
            </Link>
          </li>
          <li onClick={handleLogout}>
            <Link to="/login">
              <FontAwesomeIcon icon={faSignOutAlt} />
              {isOpen && <span>Déconnexion</span>}
            </Link>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
