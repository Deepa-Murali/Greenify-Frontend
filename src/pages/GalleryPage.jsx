import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Modal,
  IconButton
} from '@mui/material';
import API from '../utils/axiosInstance';
import { useAuth } from '../context/AuthContext';
import CloseIcon from '@mui/icons-material/Close';

const GalleryPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [trees, setTrees] = useState([]);
  const [selectedTree, setSelectedTree] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await API.get('/trees');
        setTrees(res.data);
      } catch (err) {
        console.error('Error fetching gallery updates:', err);
      }
    };
    fetchUpdates();
  }, []);

  const handleOpenModal = (tree) => {
    setSelectedTree(tree);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTree(null);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Tree Gallery</Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {trees.map((tree) => (
          <Card key={tree._id} sx={{ width: 250, cursor: 'pointer' }} onClick={() => handleOpenModal(tree)}>
            <CardMedia
              component="img"
              height="200"
              image={tree.imageUrl}
              alt={tree.name}
            />
            <CardContent>
              <Typography variant="h6">{tree.name}</Typography>
              <Typography variant="body2">Type: {tree.type}</Typography>
              <Typography variant="body2">Planted By: {tree.plantedBy?.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Modal for showing updates */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            maxWidth: 600,
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 3,
            overflowY: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{selectedTree?.name}</Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          <CardMedia
            component="img"
            height="250"
            image={selectedTree?.imageUrl}
            alt={selectedTree?.name}
            sx={{ borderRadius: 2, mt: 2 }}
          />
          <Typography variant="body1" mt={2}>
            Type: {selectedTree?.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Planted By: {selectedTree?.plantedBy?.name}
          </Typography>

          <Typography variant="h6" mt={3}>Growth Updates:</Typography>
          {selectedTree?.updates?.length ? (
            selectedTree.updates.map((update, i) => (
              <Box key={i} mt={2} p={2} bgcolor="#f9f9f9" borderRadius={2}>
                {update.imageUrl && (
                  <CardMedia
                    component="img"
                    height="150"
                    image={update.imageUrl}
                    alt={`Update ${i}`}
                    sx={{ borderRadius: 1 }}
                  />
                )}
                <Typography mt={1}>{update.description}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(update.date).toLocaleDateString()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography mt={2}>No updates yet.</Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default GalleryPage;
