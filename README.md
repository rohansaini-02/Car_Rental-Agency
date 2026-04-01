# Rentify - Car Rental Application

A fully functional car rental SaaS application built with React+Vite, Core PHP REST APIs, and MySQL.

## Features
- Role-based Authentication (Customer vs Agency)
- Secure image uploads
- Date overlap checking to prevent double bookings
- Seamless dynamic front-end built with Vite & React Router DOM
- Premium "Glassmorphism" UI with Custom CSS + Bootstrap

## Developer Strategy Note (Security)
> **Note on JWT Storage:** 
In this solution, the JWT Token is being stored inside `localStorage` for the ease of development. 
In a real-world production level SaaS application, JWT tokens should be stored securely using `httpOnly` cookies over HTTPS to protect against Cross-Site Scripting (XSS) attacks.

## Database Installation
1. Create a MySQL database named `rentify_db`
2. Import `backend/database.sql`
3. Configure `backend/config/constants.php` if you don't use the standard `root` password for localhost MySQL.

## Setup Backend
Run the backend with PHP's built-in server:
```bash
cd backend
php -S localhost:8000
```

## Setup Frontend
Run the React development server:
```bash
cd frontend
npm install
npm run dev
```

The app will be accessible at: `http://localhost:5173`
