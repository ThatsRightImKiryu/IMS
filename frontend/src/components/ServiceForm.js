import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';

const ServiceForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const newService = { name, description };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newService),
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении сервиса');
      }

      const data = await response.json();
      // Очистка полей после успешной отправки
      setName('');
      setDescription('');
      console.log('Новый сервис добавлен:', data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h5" mb={2}>
        Добавить новый сервис
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Название сервиса"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Описание сервиса"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Добавить сервис'}
        </Button>
      </form>
    </Paper>
  );
};

export default ServiceForm;