import React from "react";
import { Typography, List, ListItem, Divider } from "@mui/material";

const TreeGrowthLog = ({ tree, logs }) => {
  if (!logs || logs.length === 0) {
    return <Typography>No growth data available for this tree.</Typography>;
  }

  return (
    <List dense>
      {logs.map((log, index) => (
        <div key={index}>
          <ListItem>
            <Typography variant="body2">
              <strong>Date:</strong> {new Date(log.date).toLocaleDateString()} <br />
              <strong>Height:</strong> {log.height} cm <br />
              <strong>Status:</strong> {log.status} <br />
              {log.notes && (
                <>
                  <strong>Notes:</strong> {log.notes} <br />
                </>
              )}
              {log.imageUrl && (
                <img src={log.imageUrl} alt="growth" width="100%" style={{ borderRadius: "4px", marginTop: 4 }} />
              )}
            </Typography>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
};

export default TreeGrowthLog;
