import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const history = useHistory();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      // Redirect to home page after successful registration
      history.push('/home'); 
    } catch (error) {
      setError(error.response?.data.error || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={usernameRef} placeholder="Username" required />
        <input type="email" ref={emailRef} placeholder="Email" required />
        <input type="password" ref={passwordRef} placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      <Link to="/login">Already have an account? Log In</Link>
    </div>
  );
};

export default Register;
