import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sweet Shop
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/sweets">
            Sweets
          </Button>
          <Button color="inherit" component={RouterLink} to="/orders">
            Orders
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/orders/new" 
            variant="outlined"
            sx={{ ml: 2 }}
          >
            New Order
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}