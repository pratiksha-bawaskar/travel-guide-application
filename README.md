````markdown

\# Travel Guide Application



A multilingual Travel Guide Application built using React, Spring Boot, REST APIs, and MySQL. The application helps users explore tourist destinations, search and filter places, view detailed information, add reviews, manage favourites, and use the application in English, Hindi, and Marathi.



\## Features



\- Browse tourist places

\- Search places by name or location

\- Filter places by category

\- View detailed information about tourist destinations

\- Add and view reviews

\- Automatically refresh reviews after submission

\- Add and manage favourite places using localStorage

\- User registration and login

\- English, Hindi, and Marathi language support

\- Responsive user interface

\- RESTful backend APIs

\- MySQL database integration

\- Backend validation and exception handling

\- Unit and controller testing



\## Tech Stack



\### Frontend

\- React.js

\- Vite

\- JavaScript

\- React Router

\- Axios

\- React Hooks

\- i18next

\- HTML

\- CSS

\- localStorage



\### Backend

\- Java 17

\- Spring Boot

\- Spring Web

\- Spring Data JPA

\- Hibernate

\- Maven

\- MySQL

\- JUnit

\- Mockito

\- MockMvc



\## System Architecture



The application follows a frontend-backend architecture:



React Frontend → REST APIs → Spring Boot Backend → MySQL Database



The frontend communicates with the backend using Axios and REST APIs. The Spring Boot backend handles business logic, database operations, validation, and API requests.



\## Application Flow



1\. User opens the Travel Guide application.

2\. Tourist places are loaded from the Spring Boot REST API.

3\. Users can search, filter, and explore destinations.

4\. Users can open a place to view its details.

5\. Registered users can log in and submit reviews.

6\. Users can save favourite places using localStorage.

7\. The application supports English, Hindi, and Marathi.



\## Frontend



The frontend is developed using React and Vite.



Main frontend functionality includes:



\- Tourist place listing

\- Search and category filtering

\- Place details

\- Reviews

\- Authentication pages

\- Favourites

\- Multilingual interface

\- API integration using Axios

\- Responsive UI



\## Backend



The backend is developed using Spring Boot and follows a layered architecture.



Main backend components include:



\- Controllers

\- Services

\- Repositories

\- DTOs

\- Entities/Models

\- Mappers

\- Exception handling

\- Validation

\- Database integration



\## REST API Endpoints



\### Places



```text

GET    /api/places

GET    /api/places/{id}

POST   /api/places

````



\### Users



```text

POST   /api/users/register

POST   /api/users/login

GET    /api/users/{id}

```



\### Reviews



```text

GET    /api/reviews/place/{placeId}

POST   /api/reviews

```



\## Database



The application uses MySQL with Spring Data JPA and Hibernate.



The database stores information related to:



\* Users

\* Tourist Places

\* Reviews

\* Client Logs



\## Authentication



The current application provides user registration and login using email and password.



User session information is maintained on the frontend using localStorage.



JWT-based authentication and stronger authorization can be added as a future enhancement.



\## Folder Structure



```text

travel-guide-application/

│

├── frontend/

│   ├── public/

│   ├── src/

│   ├── package.json

│   └── vite.config.js

│

├── backend/

│   ├── src/

│   ├── pom.xml

│   └── mvnw

│

└── README.md

```



\## Setup and Installation



\### Clone the Repository



```bash

git clone https://github.com/pratiksha-bawaskar/travel-guide-application.git

cd travel-guide-application

```



\### Frontend Setup



```bash

cd frontend

npm install

npm run dev

```



The frontend will start using the Vite development server.



\### Backend Setup



Open another terminal:



```bash

cd backend

./mvnw spring-boot:run

```



On Windows:



```bash

mvnw.cmd spring-boot:run

```



Make sure MySQL is running and the database configuration in:



```text

backend/src/main/resources/application.properties

```



matches your local environment.



\## Frontend and Backend Integration



The React frontend communicates with the Spring Boot backend through REST APIs.



Axios is configured in the frontend to send requests to the backend API.



Before running the complete application, make sure the backend is running and the frontend API configuration points to the correct backend URL.



\## Testing



The backend includes unit and controller-level tests using:



\* JUnit

\* Mockito

\* MockMvc



Tests cover important service and controller functionality.



\## Screenshots



Screenshots of the application can be added here to demonstrate:



\* Home page

\* Tourist places

\* Place details

\* Login and registration

\* Reviews

\* Favourites

\* Multilingual interface



\## Deployment



The frontend and backend can be deployed separately because they are maintained as independent application layers inside the same repository.



The frontend can be deployed using platforms such as Vercel, Netlify, or Render.



The Spring Boot backend can be deployed using platforms such as Render, Railway, AWS, or other Java-compatible hosting services.



\## Future Enhancements



\* JWT-based authentication

\* Role-based authorization

\* Improved application security

\* Advanced search and recommendation features

\* Additional Indian and international languages

\* Swagger/OpenAPI documentation

\* Enhanced production deployment and monitoring



\## Author



\*\*Pratiksha Bawaskar\*\*



GitHub: \[https://github.com/pratiksha-bawaskar](https://github.com/pratiksha-bawaskar)



````





