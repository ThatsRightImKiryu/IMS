import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, List, ListItem, Divider, Box } from '@mui/material';

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Здесь должен быть запрос к API для получения данных о сервисах
    fetch('http://localhost:3000/api/services')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services', error));
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Service List
      </Typography>
      <Paper elevation={4} sx={{ py: 3, px: 2 }}>
        <List>
          {services.length > 0 ? (
            services.map((service, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <ListItem>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" color="primary">
                      {service.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {service.description}
                    </Typography>
                  </Box>
                </ListItem>
                <Divider />
              </Box>
            ))
          ) : (
            <Typography variant="body1" align="center" color="textSecondary" fontStyle="italic">
              No services available
            </Typography>
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default ServiceList;