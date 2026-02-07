# 🥜 Nut Butter Shop API

## Overview
**Nut Butter Shop** is a premium online platform where users can discover and purchase artisanal, homemade healthy nut butters. The backend is built with **Java Spring Boot**, following a professional multi-layered architecture to ensure the app is production-ready and scalable.

---

## 🏗️ Architecture Layers
* **Controller Layer**: Handles incoming HTTP requests and routes them to the correct logic.
* **Repository Layer**: Interacts directly with the database using Spring Data JPA.
* **Model Layer**: Defines the core business objects (Entities) like `Product.java`.

---

## 🚀 Key Features

### **Product Management**
* **REST Controllers**: Handles requests for fetching the product catalog (e.g., `ProductController.java`).
* **Repositories**: Defines CRUD methods for database interaction (e.g., `ProductRepository.java`).

### **Data Handling**
* **Entities**: Represents business objects with attributes like **price**, **description**, and **image URLs**.
* **Auto-Seeding**: Uses a `CommandLineRunner` to populate the database automatically on startup.

---
### **🏁 Getting Started**

### **Prerequisites**
* **JDK 21**
* **Maven** (integrated with IntelliJ)

### **Running the Application**

1. **Clone the repository**
   ```bash
   git clone [https://github.com/mkovacheska/nut-butter-eshop.git]
2. **Install dependencies and build the project**
   ```bash
   mvn clean install
3. **Run the Spring Boot application**
   ```bash
   mvn spring-boot:run
4. **Verify the API** Open your browser and navigate to:
   ```bas
   http://localhost:8080/api/products
🎉 **Now you're ready to start using it!**





   
