package org.example.controller;

import org.example.model.Product;
import org.example.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
// This allows your React app (running on port 5173) to talk to your Java app
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductRepository productRepository;

    // Constructor injection: This connects the controller to the database repository
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // This GET method returns all products in the database
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // This POST method allows you to add a new product
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
}