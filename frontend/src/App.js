import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import IncidentList from './components/IncidentList';
import ServiceForm from './components/ServiceForm';
import ServiceList from './components/ServiceList';  // Импортируем новый компонент
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3949ab',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  },
});

const App = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);

  const openMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="sticky" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Incident Management
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={openMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}


onClose={closeMenu}
            >
              <MenuItem onClick={closeMenu} component={RouterLink} to="/">
                Incident List
              </MenuItem>
              <MenuItem onClick={closeMenu} component={RouterLink} to="/addService">
                Add Service
              </MenuItem>
              <MenuItem onClick={closeMenu} component={RouterLink} to="/services">
                Service List
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Container sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<IncidentList />} />
            <Route path="/addService" element={<ServiceForm />} />
            <Route path="/services" element={<ServiceList />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
