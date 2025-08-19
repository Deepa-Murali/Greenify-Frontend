import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogActions
} from '@mui/material';
import API from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [trees, setTrees] = useState([]);
  const [tab, setTab] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => {});
  const [confirmMessage, setConfirmMessage] = useState('');

  useEffect(() => {
    if (user?.role !== 'admin') return;

    const fetchData = async () => {
      try {
        const usersRes = await API.get('/users');
        const treesRes = await API.get('/trees');
        setUsers(usersRes.data.filter((u) => u.role !== 'admin'));
        setTrees(treesRes.data);
      } catch (err) {
        console.error('Error fetching admin data:', err);
      }
    };

    fetchData();
  }, [user]);

  const handleDeleteUser = (id) => {
    setConfirmMessage('Are you sure you want to delete this user?');
    setConfirmAction(() => async () => {
      try {
        await API.delete(`/users/${id}`);
        setUsers((prev) => prev.filter((u) => u._id !== id));
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    });
    setConfirmOpen(true);
  };

  const handleDeleteTree = (id) => {
    setConfirmMessage('Are you sure you want to delete this tree?');
    setConfirmAction(() => async () => {
      try {
        await API.delete(`/trees/${id}`);
        setTrees((prev) => prev.filter((t) => t._id !== id));
      } catch (err) {
        console.error('Error deleting tree:', err);
      }
    });
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    await confirmAction();
    setConfirmOpen(false);
  };

  if (user?.role !== 'admin') {
    return (
      <Box p={4}>
        <Typography variant="h6">Access denied. Admins only.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} sx={{ mb: 3 }}>
        <Tab label="Users" />
        <Tab label="Trees" />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={2}>
          {users.map((u) => (
            <Grid item xs={12} md={6} key={u._id}>
              <Paper sx={{ p: 2 }}>
                <Typography><strong>Name:</strong> {u.name}</Typography>
                <Typography><strong>Email:</strong> {u.email}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteUser(u._id)}
                  sx={{ mt: 1 }}
                >
                  Delete User
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {tab === 1 && (
        <Grid container spacing={2}>
          {trees.map((tree) => (
            <Grid item xs={12} md={6} key={tree._id}>
              <Paper sx={{ p: 2 }}>
                <Typography><strong>Name:</strong> {tree.name}</Typography>
                <Typography><strong>Type:</strong> {tree.type}</Typography>
                <Typography><strong>Planted By:</strong> {tree.plantedBy?.name || 'N/A'}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteTree(tree._id)}
                  sx={{ mt: 1 }}
                >
                  Delete Tree
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>{confirmMessage}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleConfirm} color="error">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
