import React, { useState } from 'react';
import CountUp from 'react-countup';
import {
  Box,
  Button,
  Typography,
  Paper,
  Container,
  Collapse,
  Grid,
  Card,
  Fade,
  Zoom,
  CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RoomIcon from '@mui/icons-material/Room';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

const featureIcons = [
  <RoomIcon sx={{ fontSize: 40, color: 'green' }} />,
  <TrendingUpIcon sx={{ fontSize: 40, color: 'green' }} />,
  <GroupIcon sx={{ fontSize: 40, color: 'green' }} />,
  <PhotoLibraryIcon sx={{ fontSize: 40, color: 'green' }} />
];


const HomePage = () => {
  const navigate = useNavigate();

  const [expandedFeatureIndex, setExpandedFeatureIndex] = useState(null);
  const [expandedStepIndex, setExpandedStepIndex] = useState(null);

  const stats = [
    { label: 'Trees Planted', end: 850 },
    { label: 'Contributors', end: 320 },
    { label: 'Locations Covered', end: 47 },
  ];

  const features = [
    {
      title: "Auto Location Tracking",
      short: "Mark trees using GPS.",
      long: "The app automatically fetches your GPS coordinates so you can tag your planted trees accurately on the map. This helps in maintaining real-time data and improves traceability.",
    },
    {
      title: "Growth Updates",
      short: "Log height and health updates.",
      long: "Track your tree's progress over time by updating its height, health status, and photos. This builds transparency and encourages proper care.",
    },
    {
      title: "Multi-user Access",
      short: "Allow collaboration & sharing.",
      long: "Enable multiple users to contribute to the same tree data—great for families, schools, and organizations working together to green their spaces.",
    },
    {
      title: "Tree Image Gallery",
      short: "Upload and view tree images.",
      long: "Each tree entry supports uploading photos to visually document its growth over time. This gallery helps users stay motivated, track physical changes, and showcase their green impact.",
    }
  ];

  const steps = [
    { title: "Locate Tree", description: "Locate trees using map and GPS." },
    { title: "Add Details", description: "Fill in tree type, name, and image." },
    { title: "Track Growth", description: "Update height, health, and photos." },
    { title: "Inspire Others", description: "Share your journey & encourage more!" },
  ];

  const handleFeatureClick = (index) => {
    setExpandedFeatureIndex((prev) => (prev === index ? null : index));
  };

  const handleStepClick = (index) => {
    setExpandedStepIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Box>
      {/* Hero Image */}
      <Box sx={{ maxWidth: 1350, mx: 'auto', mb: 2 }}>
        <img src="/treeGrow.jpg" alt="Tree Growing" style={{ width: '100%' }} />
      </Box>

      {/* Hero Section */}
      <Box sx={{
        backgroundImage: 'url(/tree-bg.jpg)',
        backgroundSize: 'cover',
        color: 'white',
        p: 2,
        textAlign: 'center'
      }}>
        <Typography variant="h4" color=" #405d27" gutterBottom> Welcome to Greenify 🌿</Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>Plant trees, track growth, and inspire change.</Typography>
        <Button variant="contained" color="success" size="large" onClick={() => navigate('/map')}>
          Explore Tree Map
        </Button>
      </Box>

      {/* Impact Stats */}
<Container sx={{ py: 6 }}>
  <Typography variant="h4" textAlign="center" gutterBottom>
    Our Impact So Far
  </Typography>

  <Grid container spacing={4} justifyContent="center">
    {stats.map((item, index) => (
      <Grid item xs={12} sm={4} key={index}>
        <Zoom in={true} style={{ transitionDelay: `${index * 300}ms` }}>
          <Card
            sx={{
              textAlign: 'center',
              py: 4,
              boxShadow: 4,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 8,
              },
            }}
          >
            <Typography variant="h3" color="green">
              <CountUp end={item.end} duration={2.5} />
            </Typography>
            <Typography variant="h6">{item.label}</Typography>
          </Card>
        </Zoom>
      </Grid>
    ))}
  </Grid>
</Container>


     {/* Features Section */}
<Container sx={{ py: 6 }}>
  <Typography variant="h4" textAlign="center" gutterBottom>
    Why Greenify?
  </Typography>
  <Grid container spacing={2}>
    {features.map((feature, i) => (
      <Grid item xs={12} sm={6} md={3} key={i}>
        <Card
          onClick={() => handleFeatureClick(i)}
          sx={{
            cursor: 'pointer',
            textAlign: 'center',
            p: 3,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 6,
            },
            backgroundColor: expandedFeatureIndex === i ? '#f0fdf4' : 'white',
          }}
          elevation={expandedFeatureIndex === i ? 6 : 3}
        >
          <CardContent>
            <Box mb={1}>
              {featureIcons[i]}
            </Box>
            <Typography variant="h6" gutterBottom>
              {feature.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {feature.short}
            </Typography>

            <Collapse in={expandedFeatureIndex === i} timeout="auto" unmountOnExit>
              <Typography variant="body2" mt={2}>
                {feature.long}
              </Typography>
            </Collapse>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</Container>


      {/* How it Works Section */}
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>How it works?</Typography>
        <Grid container spacing={4}>
          {steps.map((step, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "0.3s",
                  '&:hover': { boxShadow: 6 }
                }}
                onClick={() => handleStepClick(i)}
              >
                <Typography variant="h6">{step.title}</Typography>
                <Collapse in={expandedStepIndex === i}>
                  <Typography mt={1} variant="body2" color="text.primary">
                    {step.description}
                  </Typography>
                </Collapse>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Box sx={{ bgcolor: 'green', color: 'white', textAlign: 'center', p: 5 }}>
        <Typography variant="h4">Ready to make a difference?</Typography>
        <Button variant="contained" sx={{ mt: 2 }} size="large" onClick={() => navigate('/map')}>
          Start Planting
        </Button>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#333', color: 'white', textAlign: 'center', p: 2 }}>
        <Typography>&copy; 2025 Greenify | Designed By Deepa Murali</Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
