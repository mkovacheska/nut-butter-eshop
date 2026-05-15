package org.example;

import org.example.model.Product;
import org.example.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Main {
    private static final Logger logger = LoggerFactory.getLogger(Main.class);

    public static void main(String[] args) {

        SpringApplication.run(Main.class, args);
    }

    @Bean
    CommandLineRunner start(ProductRepository repository) {
    return args -> {
        Product p1 = new Product("Classic Almond Butter", "Creamy & salty almond butter", 10.00, "/images/almond-butter.jpeg");
        p1.getSizeModifiers().put("200g", 0.0);   
        p1.getSizeModifiers().put("350g", 1.7);  
        p1.getSizeModifiers().put("700g", 13.4);
        repository.save(p1);

        Product p2 = new Product("Crunchy Peanut Butter", "Roasted peanuts with a crunch", 5.00, "/images/peanut-butter.jpeg");
        p2.getSizeModifiers().put("200g", 0.0);
        p2.getSizeModifiers().put("350g", 2.5);
        p2.getSizeModifiers().put("700g", 5.0);
        repository.save(p2);

        Product p3 = new Product("Creamy Hazelnut Butter", "Velvety smooth hazelnut butter", 10.00, "/images/hazelnut-butter.jpeg");
        p3.getSizeModifiers().put("200g", 0.0);
        p3.getSizeModifiers().put("350g", 3.4);
        p3.getSizeModifiers().put("700g", 18.4);
        repository.save(p3);
    };
}
}