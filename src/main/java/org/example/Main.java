package org.example;

import org.example.model.Product;
import org.example.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {

        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner start(ProductRepository repository) {
        return args -> {
            repository.save(new Product("Classic Almond Butter", "Pure stone-ground almonds", 12.00, "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e"));
            repository.save(new Product("Crunchy Peanut Butter", "Roasted peanuts with a crunch", 8.00, "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"));
            repository.save(new Product("Cashew Cream", "Velvety smooth organic cashews", 15.00, "https://images.unsplash.com/photo-1536510233921-8e5043fce771"));

            System.out.println("Backend is ready and data is loaded!");
        };
    }
}