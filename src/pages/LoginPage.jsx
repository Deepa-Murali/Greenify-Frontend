import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import API from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Login Form Data:', formData);
    try {
      const res = await API.post('/auth/login', formData);
      const { user, token } = res.data;
      login(user, token);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
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
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
