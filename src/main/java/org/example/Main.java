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
            
            // 1. Classic Almond Butter
            Product p1 = new Product(
                "Classic Almond Butter", 
                "Smooth, smooth, roasted almond butter.\n\nCreamy and naturally rich, our premium almonds are ground to a perfect consistency that highlights their deep, toasted flavor.\n\n Ingredients: 100% Roasted Almonds, pinch of Sea Salt.", 
                10.00, 
                "/images/almond butter.jpg"
            );
            p1.getSizeModifiers().put("200g", 0.0);   
            p1.getSizeModifiers().put("350g", 1.7);  
            p1.getSizeModifiers().put("700g", 13.4);
            repository.save(p1);

            // 2. Crunchy Peanut Butter
            Product p2 = new Product(
                "Crunchy Peanut Butter", 
                "Crunchy, velvety peanut butter with sea salt.\n\nA thick, luxurious paste made from slow-roasted peanuts, packed with plenty of crunch and a pinch of sea salt for the perfect bite.\n\n Ingredients: 100% Roasted Peanuts, pinch of Sea Salt and Cruncy Peanut Pieces.", 
                5.00, 
                "/images/cruncy peanut butter.jpg"
            );
            p2.getSizeModifiers().put("200g", 0.0);
            p2.getSizeModifiers().put("350g", 2.5);
            p2.getSizeModifiers().put("700g", 5.0);
            repository.save(p2);

            // 3. Creamy Hazelnut Butter
            Product p3 = new Product(
                "Creamy Hazelnut Butter", 
                "A very smooth and creamy hazelnut butter.\n\nDue to the high volume of natural oil in the hazelnuts, it creates a beautifully runny paste that is exceptionally rich in nutrients and intensely flavorful. \n\n Ingredients: 100% Roasted Hazelnuts.",
                10.00, 
                "/images/scoop.jpg"
            );
            p3.getSizeModifiers().put("200g", 0.0);
            p3.getSizeModifiers().put("350g", 3.4);
            p3.getSizeModifiers().put("700g", 18.4);
            repository.save(p3);

            // 4. Creamy Cashew Butter
            Product p4 = new Product(
                "Creamy Cashew Butter", 
                "An ultra-creamy, smooth paste made from 100% select cashews.\n\nNaturally sweet and cream-like, it brings a velvety, luxurious texture that melts effortlessly onto your favorite pantry snacks.\n\n Ingredients: 100% Roasted Cashews, pinch of Sea Salt.", 
                9.17, 
                "/images/cashew.jpg"
            );
            p4.getSizeModifiers().put("200g", 0.0);
            p4.getSizeModifiers().put("350g", 2.5);
            p4.getSizeModifiers().put("700g", 12.5);
            repository.save(p4);

            // 5. Crunchy Buckwheat Granola
            Product p5 = new Product(
                "Crunchy Buckwheat Granola", 
                "Gluten-free crunchy granola with nuts, coconut flakes, and wholesome buckwheat.\n\nBaked to a delicious crisp and tossed beautifully with our signature homemade Girl Around The Food peanut butter. It makes the perfect breakfast option when paired together with your other favorite Girl Around The Food products!\n\n Ingredients: Buckwheat, Coconut Chips, Almonds, Walnuts, Sunflower Seeds, Pumpkin Seeds, Agave Syrup, GirlAroundTheFood Peanut Butter Coconut Oil, Cinnamon, Sea Salt, Vanilla Extract.", 
                5.83, 
                "/images/granola.jpg"
            );
            p5.getSizeModifiers().put("250g", 0.0);
            repository.save(p5);
        };
    }
}