import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress,
  Input,
  FormControl,
  FormLabel,
  Snackbar,
  Alert,
  Grid
} from '@mui/material';
import axios from '../services/api';

const TreeForm = ({ tree, position, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    treeName: tree?.treeName || '',
    treeType: tree?.treeType || '',
    height: tree?.growthUpdates?.[0]?.height || '',
    status: tree?.growthUpdates?.[0]?.status || 'Healthy',
    notes: tree?.growthUpdates?.[0]?.notes || '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(tree?.imageUrl || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validation
    if (!tree && !position) {
      setError('Please select a location on the map');
      setLoading(false);
      return;
    }
    
    if (!formData.treeName || !formData.treeType) {
      setError('Tree name and type are required');
      setLoading(false);
      return;
    }
    
    if (!formData.height || !formData.status) {
      setError('Height and status are required');
      setLoading(false);
      return;
    }

    try {
      const formPayload = new FormData();
      
      if (!tree) {
        // New tree
        formPayload.append('treeName', formData.treeName);
        formPayload.append('treeType', formData.treeType);
        formPayload.append('lat', position.lat);
        formPayload.append('lng', position.lng);
      }
      
      // Growth update data
      formPayload.append('height', formData.height);
      formPayload.append('status', formData.status);
      formPayload.append('notes', formData.notes);
      
      if (formData.image) {
        formPayload.append('image', formData.image);
      }

      let res;
      if (tree) {
        // Update existing tree
        res = await axios.put(`/api/trees/${tree._id}/growth`, formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Create new tree
        res = await axios.post('/api/trees', formPayload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      onSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        {tree ? 'Update Tree Growth' : 'Add New Tree'}
      </Typography>
      
      {position && !tree && (
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Location: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
        </Typography>
      )}
      
      {!tree && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tree Name"
              name="treeName"
              value={formData.treeName}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tree Type"
              name="treeType"
              value={formData.treeType}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Grid>
        </Grid>
      )}
      
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Height (cm)"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Status"
            name="status"
            select
            SelectProps={{ native: true }}
            value={formData.status}
            onChange={handleChange}
            margin="normal"
            required
          >
            <option value="Healthy">Healthy</option>
            <option value="Growing">Growing</option>
            <option value="Struggling">Struggling</option>
            <option value="Diseased">Diseased</option>
            <option value="Needs Attention">Needs Attention</option>
          </TextField>
        </Grid>
      </Grid>
      
      <TextField
        fullWidth
        label="Notes"
        name="notes"
        multiline
        rows={3}
        value={formData.notes}
        onChange={handleChange}
        margin="normal"
      />
      
      <FormControl fullWidth margin="normal">
        <FormLabel>Tree Image</FormLabel>
        <Input
          type="file"
          inputProps={{ accept: 'image/*' }}
          onChange={handleImageChange}
          sx={{ mt: 1 }}
        />
        {imagePreview && (
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <img 
              src={imagePreview} 
              alt="Preview" 
              style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }} 
            />
          </Box>
        )}
      </FormControl>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          color="success"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : tree ? 'Update' : 'Add Tree'}
        </Button>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default TreeForm;