import React from 'react';
import { Box, Container, Typography, Divider, Grid, Paper } from '@mui/material';

const AboutPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" gutterBottom>About Greenify 🌿</Typography>
        <Typography variant="h6" color="text.secondary">
          Making Earth greener, one tree at a time.
        </Typography>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="body1" paragraph>
        <strong>Greenify</strong> is a community-powered tree planting and growth tracking platform. Our mission is to inspire people to take environmental action by planting trees and nurturing them with care. By using technology like GPS mapping, photo galleries, and real-time growth updates, we’re making tree planting fun, transparent, and impactful.
      </Typography>

      <Typography variant="body1" paragraph>
        Started in 2025, Greenify was built by a passionate team of developers, nature lovers, and environmental advocates who wanted to create a tool that empowers individuals, schools, organizations, and governments to visualize their contribution to a greener planet.
      </Typography>

      <Typography variant="h5" gutterBottom mt={4}>🌱 What Makes Us Different?</Typography>
      <ul>
        <li>
          <Typography variant="body1">
            <strong>Real-time Tree Mapping:</strong> Every planted tree is marked on the map with accurate GPS coordinates.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Growth Journey:</strong> Users can add photo updates to track how their tree grows over time.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Community Driven:</strong> Anyone can join, plant, update, and inspire others with their efforts.
          </Typography>
        </li>
        <li>
          <Typography variant="body1">
            <strong>Verified Users & Roles:</strong> We offer secure login for users and admin-level controls for moderation.
          </Typography>
        </li>
      </ul>

      <Typography variant="h5" gutterBottom mt={4}>Our Vision</Typography>
      <Typography variant="body1" paragraph>
        To build a global community that collectively plants and protects millions of trees, fights climate change, and restores biodiversity.
      </Typography>

      <Typography variant="h5" gutterBottom mt={4}>Join Us</Typography>
      <Typography variant="body1" paragraph>
        Whether you’re a student, NGO, corporate team, or an individual enthusiast — Greenify welcomes you. Every tree you plant, every update you make, and every story you share inspires a greener tomorrow.
      </Typography>

      <Box mt={6} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          &copy; 2025 Greenify | Built with 💚 for the planet
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
