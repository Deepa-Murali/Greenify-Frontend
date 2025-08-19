import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import NatureIcon from "@mui/icons-material/Nature";

function TrackerCard() {
  const handleTrack = () => {
    alert("Tracking feature coming soon! 🌱");
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "20px auto",
        padding: 2,
        borderRadius: "20px",
        boxShadow: 5,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          <NatureIcon sx={{ verticalAlign: "middle", mr: 1 }} />
          Tree Tracker
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Monitor the trees you've planted and ensure their survival with our tracker tool.
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 2, borderRadius: "12px" }}
          onClick={handleTrack}
        >
          Track My Trees
        </Button>
      </CardContent>
    </Card>
  );
}

export default TrackerCard;
