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
            repository.save(new Product("Classic Almond Butter", "Creamy & salty almond butter", 12.00, "/images/almond-butter.jpeg"));
            repository.save(new Product("Crunchy Peanut Butter", "Roasted peanuts with a crunch", 8.00, "/images/peanut-butter.jpeg"));
            repository.save(new Product("Cashew Cream", "Velvety smooth cashews butter", 15.00, "/images/hazelnut-butter.jpeg"));

            System.out.println("Backend is ready and data is loaded!");
        };
    }
}