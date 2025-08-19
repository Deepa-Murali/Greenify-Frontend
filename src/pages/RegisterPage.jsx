import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import API from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/register', formData);
      alert('Registered successfully. Please login.');
      navigate('/login');
    } catch (err) {
      console.error("Registration Error:", err.response?.data);
      setError(
  err.response?.data?.msg || 
  err.response?.data?.message || 
  'Registration failed'
);

    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
