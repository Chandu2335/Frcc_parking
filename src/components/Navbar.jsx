import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import frccLogo from '../assets/frcc-logo.png';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
  ];

  return (
    <header className="navbar" role="banner">
      <div className="navbar-container">
        <div className="navbar-brand" aria-label="FRCC Home">
          <div className="brand-icon-wrapper" aria-hidden="true">
            <img src={frccLogo} alt="FRCC Logo" className="brand-logo-img" />
          </div>
          <div className="brand-text">
            <span className="brand-title">FRCC</span>
            <span className="brand-subtitle">Film Recreation &amp; Cultural Centre</span>
          </div>
        </div>

        <nav className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`} role="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`nav-link ${item.active ? 'active' : ''}`}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="main-navigation"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}