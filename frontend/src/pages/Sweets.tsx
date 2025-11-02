import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Sweet, getAllSweets, createSweet, updateSweet, deleteSweet } from '../api';

export default function Sweets() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [open, setOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    imageUrl: '',
  });

  useEffect(() => {
    loadSweets();
  }, []);

  const loadSweets = () => {
    getAllSweets().then(setSweets);
  };

  const handleOpen = (sweet?: Sweet) => {
    if (sweet) {
      setEditingSweet(sweet);
      setFormData({
        name: sweet.name,
        description: sweet.description,
        price: sweet.price.toString(),
        quantity: sweet.quantity.toString(),
        category: sweet.category,
        imageUrl: sweet.imageUrl || '',
      });
    } else {
      setEditingSweet(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        imageUrl: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSweet(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sweetData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      category: formData.category,
      imageUrl: formData.imageUrl,
    };

    if (editingSweet) {
      await updateSweet(editingSweet.id, sweetData);
    } else {
      await createSweet(sweetData);
    }

    handleClose();
    loadSweets();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      await deleteSweet(id);
      loadSweets();
    }
  };

  const categories = ['Milk Sweets', 'Bengali Sweets', 'Dry Fruits', 'Traditional'];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Typography variant="h4">Sweets Management</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add New Sweet
        </Button>
      </div>

      <Grid container spacing={3}>
        {sweets.map((sweet) => (
          <Grid item xs={12} sm={6} md={4} key={sweet.id}>
            <Card>
              {sweet.imageUrl && (
                <img
                  src={sweet.imageUrl}
                  alt={sweet.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography variant="h6">{sweet.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {sweet.description}
                </Typography>
                <Typography variant="subtitle1">₹{sweet.price}</Typography>
                <Typography variant="body2">Stock: {sweet.quantity}</Typography>
                <Typography variant="body2">Category: {sweet.category}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleOpen(sweet)}>
                  Edit
                </Button>
                <Button size="small" color="error" onClick={() => handleDelete(sweet.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingSweet ? 'Edit Sweet' : 'Add New Sweet'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
              required
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              margin="normal"
              required
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Image URL"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {editingSweet ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}