# ATMOS - Modern Weather Dashboard

A premium, responsive Weather Report Application built using React and Axios. This project fetches real-time atmospheric telemetry from the OpenWeatherMap API and displays it through a visually stunning, dynamic dashboard.

Objective
The primary goal was to develop a React-based web application that retrieves weather data from an external API and presents it to the user with a high-end, responsive UI.

Features
- Dynamic Themes: The application's background gradient shifts automatically based on weather conditions (Clear, Cloudy, Rain, etc.) and time of day.
- Dual Mode: Full support for Dark and Light modes with custom-tailored color palettes for each weather state.
- Extended Telemetry: Displays Humidity, Wind Speed, Atmospheric Pressure, Visibility, and Sunrise/Sunset times.
- Recent Searches: Remembers your last 5 searched cities for quick access.
- Glassmorphism Design: A sophisticated UI utilizing frosted glass containers and modern typography (`Outfit` & `Space Grotesk`).
- Fully Responsive: Optimized for seamless viewing across mobile, tablet, and desktop devices using CSS Grid and Media Queries.

Tech Stack
- Core: React.js (via Vite)
- API Handling: Axios
- Icons: Lucide React
- Styling: Vanilla CSS (CSS Variables, Grid, Flexbox, Keyframe Animations)
- Data Source: OpenWeatherMap API

Task Breakdown
The project was executed following these core requirements:
1. Setup: Initialized a React project using modern tooling.
2. API Integration: Installed and utilized `axios` for robust HTTP requests.
3. Semantic Layout: Built the structure using HTML5 semantic elements for accessibility and organization.
4. Search Functionality: Implemented a dynamic search bar to find weather by city name.
5. Styling: Used custom CSS to create a premium, "wow-factor" design.
6. Responsiveness: Ensured the layout adapts perfectly to any screen size.
7. Dynamic URL: Used template literals to handle user inputs within the API endpoint.
8. Componentization: Created a dedicated `WeatherWidget` component to manage state and logic separately.
9. Hooks: Leveraged `useState` for data management and `useEffect` for theme/background transitions.
10. Error Handling: Implemented graceful error states for invalid city names or network failures.


---
*Developed as part of the Week 10 Project - ATMOS Weather App.*
