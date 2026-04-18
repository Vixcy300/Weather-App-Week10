import React from 'react';
import WeatherWidget from './components/WeatherWidget';
import { Heart } from 'lucide-react';
import './App.css';

function App() {
  return (
    <>
      <main>
        <WeatherWidget />
      </main>
      <footer className="app-footer glass-panel">
        <p>Project by <strong>Vignesh</strong></p>
        <div className="footer-divider"></div>
        <p className="footer-subtext">
          Week 10 Project <Heart size={14} className="heart-icon" /> Weather App
        </p>
      </footer>
    </>
  );
}

export default App;
