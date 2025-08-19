import React from 'react';
import TreeMap from '../components/TreeMap';
import { Box, Container, Typography } from '@mui/material';

const TreeMapPage = () => {
  return (
    <Box>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" mt={4} mb={2}>
          🌍 View and Plant Trees
        </Typography>
        <TreeMap />
      </Container>
    </Box>
  );
};

export default TreeMapPage;
