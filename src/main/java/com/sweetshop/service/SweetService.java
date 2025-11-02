package com.sweetshop.service;

import com.sweetshop.model.Sweet;
import com.sweetshop.repository.SweetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SweetService {
    
    @Autowired
    private SweetRepository sweetRepository;

    public List<Sweet> getAllSweets() {
        return sweetRepository.findAll();
    }

    public Optional<Sweet> getSweetById(Long id) {
        return sweetRepository.findById(id);
    }

    public List<Sweet> getSweetsByCategory(String category) {
        return sweetRepository.findByCategory(category);
    }

    public List<Sweet> searchSweets(String name) {
        return sweetRepository.findByNameContainingIgnoreCase(name);
    }

    public Sweet createSweet(Sweet sweet) {
        return sweetRepository.save(sweet);
    }

    public Sweet updateSweet(Long id, Sweet sweetDetails) {
        Sweet sweet = sweetRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));
        
        sweet.setName(sweetDetails.getName());
        sweet.setDescription(sweetDetails.getDescription());
        sweet.setPrice(sweetDetails.getPrice());
        sweet.setQuantity(sweetDetails.getQuantity());
        sweet.setCategory(sweetDetails.getCategory());
        sweet.setImageUrl(sweetDetails.getImageUrl());
        
        return sweetRepository.save(sweet);
    }

    public void deleteSweet(Long id) {
        Sweet sweet = sweetRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));
        sweetRepository.delete(sweet);
    }
}