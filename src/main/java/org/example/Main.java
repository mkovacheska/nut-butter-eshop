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
        Product p1 = new Product("Classic Almond Butter", "Creamy & salty almond butter", 12.00, "/images/almond-butter.jpeg");
        p1.getSizeModifiers().put("200g", 0.0);   
        p1.getSizeModifiers().put("350g", 4.0);  
        p1.getSizeModifiers().put("700g", 10.0);
        repository.save(p1);

        Product p2 = new Product("Crunchy Peanut Butter", "Roasted peanuts with a crunch", 8.00, "/images/peanut-butter.jpeg");
        p2.getSizeModifiers().put("200g", 0.0);
        p2.getSizeModifiers().put("350g", 3.0);
        p2.getSizeModifiers().put("700g", 7.0);
        repository.save(p2);

        Product p3 = new Product("Cashew Cream", "Velvety smooth cashews butter", 15.00, "/images/hazelnut-butter.jpeg");
        p3.getSizeModifiers().put("200g", 0.0);
        p3.getSizeModifiers().put("350g", 5.0);
        p3.getSizeModifiers().put("700g", 12.0);
        repository.save(p3);
    };
}
}