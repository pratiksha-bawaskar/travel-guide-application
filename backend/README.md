# 🌍 **Multilingual Travel Guide – Backend**

This is the backend service for the **Multilingual Travel Guide Application**, built using **Spring Boot**, **Hibernate (JPA)**, and **MySQL**.
It provides REST APIs for managing **Places**, **Users**, and **Reviews**.

The backend is fully compatible with the **React frontend** and supports **search**, **filter**, **user authentication**, and **review posting**.

---

## 🚀 **Tech Stack**

* **Java 17**
* **Spring Boot**
* **Spring Web**
* **Spring Data JPA**
* **Hibernate**
* **MySQL Database**
* **Maven**
* **Lombok** (optional)
* **JUnit + Mockito** (for testing)

---

## 📁 **Folder Structure**

```
src/
 ├── main/
 │   ├── java/com/travelguide
 │   │   ├── controller/
 │   │   ├── service/
 │   │   ├── repository/
 │   │   ├── model/
 │   │   ├── dto/
 │   │   └── util/
 │   └── resources/
 │       ├── application.properties
 │       └── schema.sql (optional)
 │
 └── test/
     └── java/com/travelguide/ (Unit & Controller tests)
```

---

# ⚙️ **Setup Instructions**

## 1️⃣ **Clone the Repository**

```
git clone https://github.com/yourusername/travel-guide-backend.git
cd travel-guide-backend
```

## 2️⃣ **Configure MySQL**

Create a database:

```sql
CREATE DATABASE travel_db;
```

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/travel_db
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## 3️⃣ **Build & Run the Application**

### 👉 Using Maven

```
mvn clean install
mvn spring-boot:run
```

### 👉 Or run from Eclipse/IntelliJ

Run `TravelGuideBackendApplication.java` as **Spring Boot App**.

---

# 🔗 **API Endpoints**

## 📍 **Places API**

| Method   | Endpoint           | Description                                |
| -------- | ------------------ | ------------------------------------------ |
| **GET**  | `/api/places`      | Get all places (search + filter supported) |
| **GET**  | `/api/places/{id}` | Get details of a single place              |
| **POST** | `/api/places`      | Add a new place                            |

---

## 👤 **Users API**

| Method   | Endpoint              | Description         |
| -------- | --------------------- | ------------------- |
| **POST** | `/api/users/register` | Register a new user |
| **POST** | `/api/users/login`    | Login user          |
| **GET**  | `/api/users/{id}`     | Get user by ID      |

---

## ⭐ **Reviews API**

| Method   | Endpoint                       | Description            |
| -------- | ------------------------------ | ---------------------- |
| **GET**  | `/api/reviews/place/{placeId}` | Get reviews of a place |
| **POST** | `/api/reviews`                 | Add a review           |

---

# 🧪 **Testing (JUnit + Mockito)**

The project includes unit tests for:

✔ PlaceService
✔ UserService
✔ ReviewService
✔ Controller Tests with MockMvc

Run:

```
mvn test
```

---

# 🌐 **CORS Configuration**

Backend already supports requests from your React app:

```
@CrossOrigin(origins = "*")
```

You can restrict it to Netlify later:

```
@CrossOrigin(origins = "https://your-netlify-domain.netlify.app")
```

---

# 🔐 **Authentication**

* Simple email + password login
* Can be upgraded to **JWT Authentication** easily

---

# 🗂 **DTO Usage**

The backend uses DTOs for:

* PlaceDTO
* UserDTO
* ReviewDTO

This helps maintain clean API request/response formatting.

---

# 🏁 **Conclusion**

This backend powers the **Multilingual Travel Guide App**, providing:

✨ Multi-language support
✨ Places search & filtering
✨ Review management
✨ User login & registration
✨ Fully tested backend
✨ MySQL integration

## 🔗 GitHub Repository

👉 Backend: https://github.com/pratiksha-bawaskar/travel-guide-backend

## 👩‍💻 Author

Pratiksha Bawaskar
📌 Full Stack Java Developer
📌 Passionate about building real-world projects & clean backend architecture

