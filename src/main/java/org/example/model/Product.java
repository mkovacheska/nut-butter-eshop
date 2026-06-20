package org.example.model;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(length = 1000)
    private String description;
    private Double price;
    private String imageUrl;
    private List<String> images;
    private Map<String, Double> sizeModifiers = new HashMap<>();

    public Product() {
    }

    public Product(String name, String description, double price, String imageUrl, List<String> images) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.images = images;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public List<String> getImages() {
       return images;
    }

    public void setImages(List<String> images) {
       this.images = images;
    }

    public Map<String, Double> getSizeModifiers() {
    return sizeModifiers;
}

    public void setSizeModifiers(Map<String, Double> sizeModifiers) {
        this.sizeModifiers = sizeModifiers;
    }
}