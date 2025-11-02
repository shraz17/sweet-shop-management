# Sweet Shop Management System

This is a full-stack application for managing a sweet shop, built with Spring Boot (Backend) and React (Frontend).

## Project Structure

```
sweet-shop-management/
├── backend/                 # Spring Boot backend
│   ├── src/                
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   └── pom.xml
│
└── frontend/               # React frontend
    ├── src/
    ├── public/
    └── package.json
```

## Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- npm (Node Package Manager)
- SQLite

## Setup & Installation

### Backend (Spring Boot)

1. Open the project in your IDE
2. Install Maven dependencies
3. Run the Spring Boot application

The backend server will start on http://localhost:8080

### Frontend (React)

1. Navigate to the frontend directory
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will start on http://localhost:3000

## Features

- Sweet inventory management
- Order processing
- Sales tracking
- User authentication
- Reports generation

## API Documentation

The API documentation will be available at http://localhost:8080/swagger-ui.html once the backend server is running.

## Development

### Backend Development

The backend is built with:
- Spring Boot 3.2.0
- Spring Data JPA
- SQLite Database
- Lombok for reducing boilerplate code

### Frontend Development

The frontend is built with:
- React 18
- TypeScript
- Material-UI for components
- Axios for API calls
- React Router for routing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.