import React from 'react';
import {
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import Navbar from './components/Navbar';
import ParkingBookingPage from './pages/ParkingBookingPage';
import frccLogo from './assets/frcc-logo.png';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <ParkingBookingPage />
      </main>
      <footer className="footer">
        <div className="footer-container">
          {/* Column 1 — FRCC branding */}
          <div className="footer-brand">
            <div className="footer-brand-emblem">
              <img src={frccLogo} alt="FRCC Logo" className="footer-brand-logo" />
            </div>
            <span className="footer-brand-name">FRCC</span>
            <span className="footer-brand-tagline">- reel stories... real connections ...</span>
            <span className="footer-brand-subtitle">Film Recreation &amp; Cultural Centre</span>
          </div>

          {/* Column 2 — Quick links */}
          <div className="footer-column">
            <h4 className="footer-column-title">Quick links</h4>
            <div className="footer-column-links">
              <a href="#">Home</a>
              <a href="#">Book an activity</a>
              <a href="#">Membership</a>
              <a href="#">My profile</a>
              <a href="#">Contact / Support</a>
            </div>
          </div>

          {/* Column 3 — Services */}
          <div className="footer-column">
            <h4 className="footer-column-title">Services</h4>
            <div className="footer-column-links">
              <a href="#">Stay</a>
              <a href="#">Halls</a>
              <a href="#">Activities</a>
              <a href="#">Parking</a>
              <a href="#">Membership</a>
            </div>
          </div>

          {/* Column 4 — Contact */}
          <div className="footer-column">
            <h4 className="footer-column-title">Contact</h4>
            <div className="footer-contact">
              <p>
                <MapPin size={16} />
                <span>
                  <strong>Hyderabad Address:</strong><br />
                  Second Floor, Samridhi Vasyam, D No 1/98/9/3/23, Capital Pk Rd,
                  Above Axis Bank, Image Gardens Branch, Jaihind Enclave, Madhapur,
                  Hyderabad, Telangana 500081
                </span>
              </p>
              <p>
                <MapPin size={16} />
                <span>
                  <strong>Vijayawada Address:</strong><br />
                  D.No. 24-29-210A, Durgapuram, Gulabithota Road, Vijayawada,
                  NTR District, Andhra Pradesh – 520003
                </span>
              </p>
              <p>
                <Phone size={16} />
                <span>+91 7893616262</span>
              </p>
              <p>
                <Mail size={16} />
                <span>hello@frcc.club</span>
              </p>
              <p className="footer-contact-hours">
                <span>Front desk open 6 AM – 11 PM daily</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Accessibility</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
}