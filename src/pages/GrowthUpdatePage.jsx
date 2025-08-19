import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Divider,
  CircularProgress
} from '@mui/material';
import API from '../utils/axiosInstance';

const GrowthUpdatePage = () => {
  const [params] = useSearchParams();
  const treeId = params.get('treeId');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: '',
    imageUrl: '',
  });

  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch tree info
  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await API.get(`/trees`);
        const found = res.data.find((t) => t._id === treeId);
        if (found) setTree(found);
        else setError('Tree not found');
      } catch (err) {
        setError('Failed to load tree details');
      } finally {
        setLoading(false);
      }
    };

    if (treeId) fetchTree();
    else {
      setError('Invalid tree ID');
      setLoading(false);
    }
  }, [treeId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');

    try {
      await API.put(`/trees/${treeId}/growth`, {
        ...formData,
        date: new Date(),
      });

      alert('🌿 Growth update submitted!');
      navigate('/map');
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong.');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
        <Typography mt={2}>Loading tree details...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
        <Paper elevation={4} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
          {tree && (
            <>
              <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
                🌳 {tree.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" align="center">
                Type: {tree.type}
              </Typography>
              {tree.imageUrl && (
                <Box mt={2} textAlign="center">
                  <img
                    src={tree.imageUrl}
                    alt="Tree"
                    style={{ maxWidth: '100%', borderRadius: 8, maxHeight: 300 }}
                  />
                </Box>
              )}
              <Divider sx={{ my: 3 }} />
            </>
          )}

          <Typography variant="h6" gutterBottom>
            Add Growth Update
          </Typography>

          {error && (
            <Typography color="error" mb={2}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              minRows={3}
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              label="Image URL"
              name="imageUrl"
              fullWidth
              value={formData.imageUrl}
              onChange={handleChange}
              margin="normal"
            />

            {/* Image preview if imageUrl is provided */}
            {formData.imageUrl && (
              <Box mt={2} textAlign="center">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  style={{ maxWidth: '100%', borderRadius: 8, maxHeight: 300 }}
                />
              </Box>
            )}

            <Box mt={4} display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/map')}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitLoading}
              >
                {submitLoading ? 'Submitting...' : 'Submit'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default GrowthUpdatePage;
