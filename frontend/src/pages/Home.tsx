import { Container, Typography, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { Sweet, getAllSweets } from '../api';
import SweetCard from '../components/SweetCard';

export default function Home() {
  const [featuredSweets, setFeaturedSweets] = useState<Sweet[]>([]);

  useEffect(() => {
    getAllSweets().then(sweets => {
      // Get top 4 sweets as featured items
      setFeaturedSweets(sweets.slice(0, 4));
    });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to Sweet Shop
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Featured Sweets
        </Typography>
        <Grid container spacing={3}>
          {featuredSweets.map(sweet => (
            <Grid item xs={12} sm={6} md={3} key={sweet.id}>
              <SweetCard sweet={sweet} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              About Us
            </Typography>
            <Typography paragraph>
              We are passionate about creating the finest traditional and modern sweets
              using authentic recipes and high-quality ingredients. Our commitment to
              quality and taste has made us a trusted name in the sweet industry.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Special Orders
            </Typography>
            <Typography paragraph>
              Planning a special event? We take custom orders for weddings,
              parties, and corporate events. Contact us to discuss your requirements
              and let us make your occasion sweeter!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}