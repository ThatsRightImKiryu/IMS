import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Box, Chip, CircularProgress } from '@mui/material';

const Incident = () => {
  const { id } = useParams(); // получить id инцидента из URL
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/incidents/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch incident data');
        }
        const data = await response.json();
        setIncident(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIncident();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!incident) {
    return <Typography color="textSecondary">No incident data available</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Incident
      </Typography>
      <Paper elevation={4} sx={{ p: 3 }}>
        <Box>
          <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
            {incident.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            {incident.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            Time Created: <strong>{new Date(incident.createdAt).toLocaleString()}</strong>
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            Service: <strong>{incident.service ? incident.service.name : 'N/A'}</strong>
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="textSecondary">
              Assigned Users:
            </Typography>
            {incident.service.team && incident.service.team.length > 0 ? (
              incident.service.team.map((user) => (
                <Chip
                  key={user.id}
                  label={user.name}
                  sx={{ mr: 1, mt: 1 }}
                />
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Users Assigned
              </Typography>
            )}
          </Box>

          {/* Отображение текстов отчетов */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Reports:
            </Typography>
            {incident.reports && incident.reports.length > 0 ? (
              incident.reports.map((report) => (
                <Box key={report.id} sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5' }}>
                  <Typography variant="body2" color="textSecondary">
                    Version: {report.version}
                  </Typography>
                  <Typography variant="body1">
                    {report.report_text}
                  </Typography>


</Box>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Reports Available
              </Typography>
            )}
          </Box>
          
        </Box>
      </Paper>
    </Container>
  );
};

export default Incident;
