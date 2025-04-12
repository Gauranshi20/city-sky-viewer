🌦️ City Sky Viewer - MERN Stack
A full-stack Weather App built using the MERN (MongoDB, Express, React, Node.js) stack. This app allows users to search for weather conditions of any city using real-time data from the OpenWeatherMap API and save their favorite locations.

📌 Features
🌍 Search real-time weather by city name

🔄 Fetches data from OpenWeatherMap API

❤️ Save favorite cities (stored in MongoDB)

📱 Responsive UI with React

🚀 Backend API built with Express and Node.js

💾 MongoDB for storing user preferences

🛠️ Tech Stack
Technology	Description
MongoDB	NoSQL database to store user data
Express	Web framework for Node.js
React	Frontend library
Node.js	Runtime environment
Axios	For making HTTP requests
OpenWeatherMap API	For fetching weather data
📸 Demo
(Optional: Add a link or GIF preview of your app here)

🚀 Getting Started
⚙️ Prerequisites
Node.js

MongoDB (Local or Atlas)

API key from OpenWeatherMap

🔧 Installation
1. Clone the repository
git clone https://github.com/yourusername/weather-app-mern.git
cd weather-app-mern
2. Install backend dependencies
cd backend
npm install
3. Install frontend dependencies
cd ../frontend
npm install
🔑 Environment Variables
Create a .env file in both backend/ and frontend/ directories.

Backend .env
PORT=5000
MONGO_URI=your_mongo_connection_string
OPENWEATHER_API_KEY=your_openweathermap_api_key
Frontend .env
REACT_APP_API_BASE_URL=http://localhost:5000/api
▶️ Running the App
Start backend server
cd backend
npm start
Start frontend development server
cd ../frontend
npm start
