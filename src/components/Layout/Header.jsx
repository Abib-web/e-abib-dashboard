import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, logout } from '../../store/authSlice';
import './Header.css';

const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          AbibSite
        </Link>
      </div>
      <div className="header-right">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="header-link">Profil</Link>
            <button onClick={handleLogout} className="header-button">Déconnexion</button>
          </>
        ) : (
          <Link to="/login" className="header-link">Connexion</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
