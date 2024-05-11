import React, { useContext, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      const { token } = response.data;

      // Save token to local storage
      localStorage.setItem('token', token);

      // Update authentication state in context or redirect
      dispatch({ type: 'LOGIN_SUCCESS', payload: token });
      history.push('/home'); // Redirect to homepage after successful login
    } catch (error) {
      if (error.response) {
        // Request was made and server responded with a status code
        setError(error.response.data.error || 'Login failed');
      } else if (error.request) {
        // Request was made but no response was received
        setError('No response received from server');
      } else {
        // Something else happened in making the request
        setError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center'}}>
      <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={usernameRef} placeholder="Username" required />
        <input type="password" ref={passwordRef} placeholder="Password" required />
        <button type="submit">Log In</button>
      </form>
      {error && <p className="error">{error}</p>}
      <Link to="/register" style={{ textAlign: 'center', marginTop: '50px' }}>Create New Account</Link>
    </div>
  );
};

export default Login;
