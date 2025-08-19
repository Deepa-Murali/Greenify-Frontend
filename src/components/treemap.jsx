import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import API from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';

// Fix Leaflet icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Auto-locate to user's position
const AutoLocate = ({ setSelectedLocation }) => {
  const map = useMap();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const location = { lat: latitude, lng: longitude };
        map.setView(location, 12);
        setSelectedLocation(location);
      },
      (err) => console.error('Geolocation error:', err)
    );
  }, []);
  return null;
};

const TreeMap = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [trees, setTrees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    imageUrl: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchTrees = async () => {
    try {
      const endpoint = isLoggedIn && !isAdmin ? '/trees/user' : '/trees';
      const res = await API.get(endpoint);
      setTrees(res.data);
    } catch (err) {
      console.error('Error fetching trees:', err);
    }
  };

  useEffect(() => {
    fetchTrees();
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLocation) {
      setSnackbar({ open: true, message: 'Please allow location access.', severity: 'error' });
      return;
    }

    try {
      const res = await API.post('/trees', {
        ...formData,
        location: selectedLocation,
      });

      setTrees([...trees, res.data]);
      setFormData({ name: '', type: '', imageUrl: '' });
      setSnackbar({ open: true, message: 'Tree submitted successfully!', severity: 'success' });
    } catch (err) {
      console.error('Error adding tree:', err);
      setSnackbar({ open: true, message: 'Error submitting tree.', severity: 'error' });
    }
  };

  return (
    <Box sx={{ pb: 6 }}>
      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={13}
        style={{ height: isLoggedIn ? '60vh' : '100vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AutoLocate setSelectedLocation={setSelectedLocation} />

        {selectedLocation && isLoggedIn && (
          <Marker
            position={[selectedLocation.lat, selectedLocation.lng]}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const newLatLng = e.target.getLatLng();
                setSelectedLocation({ lat: newLatLng.lat, lng: newLatLng.lng });
              },
            }}
          >
            <Popup>Drag to set tree location</Popup>
          </Marker>
        )}

        {Array.isArray(trees) &&
          trees.map((tree, index) => {
            if (!tree.location || tree.location.lat === undefined || tree.location.lng === undefined)
              return null;

            return (
              <Marker key={index} position={[tree.location.lat, tree.location.lng]}>
                <Popup>
                  <Typography variant="subtitle2"><strong>{tree.name}</strong></Typography>
                  <Typography variant="body2">Type: {tree.type}</Typography>
                  {tree.plantedBy?.name && (
                    <Typography variant="caption">By: {tree.plantedBy.name}</Typography>
                  )}
                  {tree.imageUrl && (
                    <img
                      src={tree.imageUrl}
                      alt="Tree"
                      style={{ width: '100%', borderRadius: 4, marginTop: 5 }}
                    />
                  )}
                  {isLoggedIn && (
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() =>
                        window.location.href = `/track?treeId=${tree._id}`
                      }
                    >
                      Growth Update
                    </Button>
                  )}
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>

      {isLoggedIn && (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Add a New Tree
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Tree Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                margin="normal"
                required
              />

              {/* Replaced this field with dropdown */}
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="tree-type-label">Tree Type</InputLabel>
                <Select
                  labelId="tree-type-label"
                  id="tree-type-select"
                  value={formData.type}
                  label="Tree Type"
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <MenuItem value="Medicinal">Medicinal</MenuItem>
                  <MenuItem value="Fruit-bearing">Fruit-bearing</MenuItem>
                  <MenuItem value="Flowering">Flowering</MenuItem>
                  <MenuItem value="Shade">Shade</MenuItem>
                  <MenuItem value="Timber">Timber</MenuItem>
                  <MenuItem value="Ornamental">Ornamental</MenuItem>
                  <MenuItem value="Indoor">Indoor</MenuItem>
                  <MenuItem value="Evergreen">Evergreen</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Image URL"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit Tree
              </Button>
            </form>
          </Paper>
        </Container>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TreeMap;
