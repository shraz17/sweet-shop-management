package com.sweetshop.service;

import com.sweetshop.model.Order;
import com.sweetshop.model.OrderItem;
import com.sweetshop.model.OrderStatus;
import com.sweetshop.model.Sweet;
import com.sweetshop.repository.OrderRepository;
import com.sweetshop.repository.SweetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private SweetRepository sweetRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public List<Order> getOrdersByCustomerName(String customerName) {
        return orderRepository.findByCustomerNameContainingIgnoreCase(customerName);
    }

    public List<Order> getOrdersByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return orderRepository.findByOrderDateBetween(startDate, endDate);
    }

    @Transactional
    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        
        // Validate and update sweet quantities
        for (OrderItem item : order.getOrderItems()) {
            Sweet sweet = sweetRepository.findById(item.getSweet().getId())
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + item.getSweet().getId()));
            
            if (sweet.getQuantity() < item.getQuantity()) {
                throw new RuntimeException("Insufficient quantity for sweet: " + sweet.getName());
            }
            
            sweet.setQuantity(sweet.getQuantity() - item.getQuantity());
            sweetRepository.save(sweet);
            item.setOrder(order);
        }
        
        return orderRepository.save(order);
    }

    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        order.setStatus(OrderStatus.valueOf(status));
        return orderRepository.save(order);
    }

    @Transactional
    public void cancelOrder(Long id) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        
        // Restore sweet quantities
        for (OrderItem item : order.getOrderItems()) {
            Sweet sweet = item.getSweet();
            sweet.setQuantity(sweet.getQuantity() + item.getQuantity());
            sweetRepository.save(sweet);
        }
        
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }
}