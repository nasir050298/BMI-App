// App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Responsive Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Logo</div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/">About</a></li>
          <li><a href="/">Services</a></li>
          <li><a href="/">Contact</a></li>
        </ul>
      </nav>

      {/* Responsive Main Content */}
      <main className="main-content">
        <h1>Welcome to Our Responsive App</h1>
        
        <div className="card-container">
          {/* Cards will stack on mobile and arrange in grid on desktop */}
          <div className="card">
            <img src="https://via.placeholder.com/300" alt="Demo" />
            <h3>Feature 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          
          <div className="card">
            <img src="https://via.placeholder.com/300" alt="Demo" />
            <h3>Feature 2</h3>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore.</p>
          </div>
          
          <div className="card">
            <img src="https://via.placeholder.com/300" alt="Demo" />
            <h3>Feature 3</h3>
            <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
          </div>
        </div>
      </main>

      {/* Responsive Footer */}
      <footer className="footer">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>We create amazing web experiences</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: contact@example.com</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>Social media links</p>
        </div>
      </footer>
    </div>
  );
}

export default App;