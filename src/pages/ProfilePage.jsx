import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, CircularProgress, Avatar, Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import API from '../utils/axiosInstance';

const ProfilePage = () => {
  const { user, logout, loading } = useAuth();
  const [treeCount, setTreeCount] = useState(0);

  useEffect(() => {
    const fetchUserTreeCount = async () => {
      try {
        const res = await API.get('/trees/user-count');
        setTreeCount(res.data.count || 0);
      } catch (err) {
        console.error('Could not fetch tree count');
      }
    };

    if (user) fetchUserTreeCount();
  }, [user]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box mt={6} textAlign="center">
        <Typography variant="h6">You are not logged in.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 6, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar sx={{ width: 80, height: 80 }}>
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </Avatar>

          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="body1" color="textSecondary">{user.email}</Typography>
          <Typography variant="body2" color="textSecondary">Role: {user.role}</Typography>
          <Typography variant="body2" color="success.main">🌱 Trees Planted: {treeCount}</Typography>

          <Button variant="outlined" color="error" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
