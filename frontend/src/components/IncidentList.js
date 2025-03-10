import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, Divider, Box, Chip } from '@mui/material';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/incidents')
      .then(response => response.json())
      .then(data => setIncidents(data))
      .catch(error => console.error('Error fetching incidents', error));
  }, []);

  useEffect(() => {
    console.log(incidents);
  }, [incidents]);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Incident List
      </Typography>
      <Paper elevation={4} sx={{ py: 3, px: 2 }}>
        <List>
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <Box key={incident.id} sx={{ mb: 2 }}>
                <ListItem>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                      {incident.title}
                    </Typography>
                    <ListItemText
                      secondary={
                        <>
                          <Typography variant="body2" color="textSecondary">
                            {incident.description}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" mt={1}>
                            Service: <strong>{incident.service ? incident.service.name : 'N/A'}</strong>
                          </Typography>
                          <Box mt={1}>
                            Users: 
                            {incident.service.responsibles && incident.service.responsibles.length > 0 ? (
                              incident.service.responsibles.map(user => (
                                <Chip key={user.id} label={user.name} sx={{ ml: 1 }} />
                              ))
                            ) : (
                              <Typography variant="body2" color="textSecondary" component="span" ml={1}>
                                No Users Assigned
                              </Typography>
                            )}
                          </Box>
                        </>
                      }
                    />
                  </Box>
                </ListItem>
                <Divider />
              </Box>
            ))
          ) : (
            <Typography variant="body1" align="center" color="textSecondary" fontStyle="italic">
              No incidents available
            </Typography>
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default IncidentList;