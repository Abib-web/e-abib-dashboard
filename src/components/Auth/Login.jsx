// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../../store/authSlice';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      const user = response.data.data.user;
      const token = response.data.token;
      if (user.role !== 'admin') {
        setError('Access denied: Admins only');
        return;
      }
      dispatch(login({ user, token }));
      localStorage.setItem('accessToken', token);
      navigate('/'); // Assurez-vous que le chemin de votre dashboard est correct
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
