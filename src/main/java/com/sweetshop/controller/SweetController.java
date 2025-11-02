package com.sweetshop.controller;

import com.sweetshop.model.Sweet;
import com.sweetshop.service.SweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/sweets")
@CrossOrigin(origins = "http://localhost:3000")
public class SweetController {
    
    @Autowired
    private SweetService sweetService;

    @GetMapping
    public List<Sweet> getAllSweets() {
        return sweetService.getAllSweets();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sweet> getSweetById(@PathVariable Long id) {
        return sweetService.getSweetById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public List<Sweet> getSweetsByCategory(@PathVariable String category) {
        return sweetService.getSweetsByCategory(category);
    }

    @GetMapping("/search")
    public List<Sweet> searchSweets(@RequestParam String name) {
        return sweetService.searchSweets(name);
    }

    @PostMapping
    public Sweet createSweet(@Valid @RequestBody Sweet sweet) {
        return sweetService.createSweet(sweet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sweet> updateSweet(@PathVariable Long id, @Valid @RequestBody Sweet sweetDetails) {
        try {
            Sweet updatedSweet = sweetService.updateSweet(id, sweetDetails);
            return ResponseEntity.ok(updatedSweet);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSweet(@PathVariable Long id) {
        try {
            sweetService.deleteSweet(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}