import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Sweet, OrderStatus, getAllSweets, createOrder } from '../api';

interface CartItem extends Sweet {
  cartQuantity: number;
}

export default function NewOrder() {
  const navigate = useNavigate();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    getAllSweets().then(setSweets);
  }, []);

  const addToCart = (sweet: Sweet) => {
    const existingItem = cart.find((item) => item.id === sweet.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === sweet.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...sweet, cartQuantity: 1 }]);
    }
  };

  const removeFromCart = (sweetId: number) => {
    setCart(cart.filter((item) => item.id !== sweetId));
  };

  const updateQuantity = (sweetId: number, quantity: number) => {
    if (quantity < 1) return;
    const sweet = sweets.find((s) => s.id === sweetId);
    if (!sweet || quantity > sweet.quantity) return;

    setCart(
      cart.map((item) =>
        item.id === sweetId ? { ...item, cartQuantity: quantity } : item
      )
    );
  };

  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Please add items to cart');
      return;
    }

    const orderData = {
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      customerEmail: customerInfo.email,
      totalAmount: calculateTotal(),
      status: OrderStatus.PENDING,
      orderItems: cart.map((item) => ({
        sweet: { id: item.id } as Sweet,
        quantity: item.cartQuantity,
        unitPrice: item.price,
        subtotal: item.price * item.cartQuantity,
      })),
    };

    try {
      await createOrder(orderData);
      navigate('/orders');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        New Order
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Available Sweets
            </Typography>
            <Grid container spacing={2}>
              {sweets.map((sweet) => (
                <Grid item xs={12} sm={6} md={4} key={sweet.id}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1">{sweet.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{sweet.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Stock: {sweet.quantity}
                    </Typography>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => addToCart(sweet)}
                      disabled={sweet.quantity === 0}
                      sx={{ mt: 1 }}
                    >
                      Add to Cart
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Cart
            </Typography>
            {cart.length === 0 ? (
              <Typography variant="body2">Cart is empty</Typography>
            ) : (
              <>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Sweet</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>
                            <TextField
                              type="number"
                              size="small"
                              value={item.cartQuantity}
                              onChange={(e) =>
                                updateQuantity(item.id, parseInt(e.target.value))
                              }
                              inputProps={{ min: 1, max: item.quantity }}
                              sx={{ width: 60 }}
                            />
                          </TableCell>
                          <TableCell>₹{item.price * item.cartQuantity}</TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography variant="h6" align="right" sx={{ mt: 2 }}>
                  Total: ₹{calculateTotal()}
                </Typography>
              </>
            )}

            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <TextField
                fullWidth
                label="Customer Name"
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone"
                value={customerInfo.phone}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, phone: e.target.value })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={customerInfo.email}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, email: e.target.value })
                }
                margin="normal"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={cart.length === 0}
                sx={{ mt: 2 }}
              >
                Place Order
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}