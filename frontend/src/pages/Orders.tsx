import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from '@mui/material';
import { Order, getAllOrders, updateOrderStatus, cancelOrder, OrderStatus } from '../api';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    getAllOrders().then(setOrders);
  };

  const handleUpdateStatus = async (orderId: number, status: OrderStatus) => {
    await updateOrderStatus(orderId, status);
    loadOrders();
  };

  const handleCancelOrder = async (orderId: number) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      await cancelOrder(orderId);
      loadOrders();
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return 'default';
      case OrderStatus.CONFIRMED:
        return 'primary';
      case OrderStatus.PROCESSING:
        return 'info';
      case OrderStatus.READY:
        return 'warning';
      case OrderStatus.DELIVERED:
        return 'success';
      case OrderStatus.CANCELLED:
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Orders Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>₹{order.totalAmount}</TableCell>
                <TableCell>
                  {new Date(order.orderDate).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {order.status !== OrderStatus.CANCELLED && (
                    <>
                      {order.status !== OrderStatus.DELIVERED && (
                        <Button
                          size="small"
                          onClick={() =>
                            handleUpdateStatus(
                              order.id,
                              Object.values(OrderStatus)[
                                Object.values(OrderStatus).indexOf(order.status) + 1
                              ]
                            )
                          }
                        >
                          Next Status
                        </Button>
                      )}
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}