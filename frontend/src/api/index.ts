import axios from 'axios';

const BASE_URL = '/api';

export interface Sweet {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl?: string;
}

export interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  totalAmount: number;
  orderDate: string;
  status: OrderStatus;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  sweet: Sweet;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

// Sweet API calls
export const getAllSweets = () => 
  axios.get<Sweet[]>(`${BASE_URL}/sweets`).then(res => res.data);

export const getSweetById = (id: number) => 
  axios.get<Sweet>(`${BASE_URL}/sweets/${id}`).then(res => res.data);

export const createSweet = (sweet: Omit<Sweet, 'id'>) => 
  axios.post<Sweet>(`${BASE_URL}/sweets`, sweet).then(res => res.data);

export const updateSweet = (id: number, sweet: Omit<Sweet, 'id'>) => 
  axios.put<Sweet>(`${BASE_URL}/sweets/${id}`, sweet).then(res => res.data);

export const deleteSweet = (id: number) => 
  axios.delete(`${BASE_URL}/sweets/${id}`);

// Order API calls
export const getAllOrders = () => 
  axios.get<Order[]>(`${BASE_URL}/orders`).then(res => res.data);

export const getOrderById = (id: number) => 
  axios.get<Order>(`${BASE_URL}/orders/${id}`).then(res => res.data);

export const createOrder = (order: {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  totalAmount: number;
  status: OrderStatus;
  orderItems: {
    sweet: Pick<Sweet, 'id'>;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
}) => axios.post<Order>(`${BASE_URL}/orders`, order).then(res => res.data);

export const updateOrderStatus = (id: number, status: OrderStatus) => 
  axios.put<Order>(`${BASE_URL}/orders/${id}/status?status=${status}`).then(res => res.data);

export const cancelOrder = (id: number) => 
  axios.post(`${BASE_URL}/orders/${id}/cancel`).then(res => res.data);