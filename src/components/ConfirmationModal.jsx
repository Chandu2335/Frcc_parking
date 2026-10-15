import React from 'react';
import { CheckCircle2, QrCode, Calendar, Clock, MapPin, Car, Bike, CreditCard, Printer, RotateCcw } from 'lucide-react';
import './ConfirmationModal.css';

export default function ConfirmationModal({ booking, onReset }) {
  if (!booking) return null;

  const isTwoWheeler = booking.vehicleType === 'Two Wheeler';

  // Format date nicely
  let formattedDate = booking.date;
  try {
    const d = new Date(booking.date + 'T00:00:00');
    formattedDate = d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    formattedDate = booking.date;
  }

  // Format time
  let formattedTime = booking.time;
  try {
    const [hours, minutes] = booking.time.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    formattedTime = `${displayH}:${minutes} ${ampm}`;
  } catch {
    formattedTime = booking.time;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-success-title">
      <div className="modal-container">
        {/* Success Header */}
        <div className="modal-success-banner">
          <div className="success-icon-glow">
            <CheckCircle2 size={44} className="success-check-icon" />
          </div>
          <h2 id="modal-success-title" className="modal-title">
            Parking Slot Booked Successfully
          </h2>
          <p className="modal-subtitle">
            Your parking reservation has been recorded. Present this digital pass at the campus barrier gate.
          </p>
        </div>

        {/* Digital Campus Pass Card */}
        <div className="pass-card">
          <div className="pass-header">
            <div>
              <span className="pass-tag">OFFICIAL CAMPUS PASS</span>
              <h3 className="pass-system-name">FRCC Smart Mobility Zone</h3>
            </div>
            <div className="pass-booking-id-box">
              <span className="id-label">BOOKING ID</span>
              <span className="id-value" id="booking-id-display">{booking.bookingId}</span>
            </div>
          </div>

          <div className="pass-slot-banner">
            <div className="slot-large-badge">
              <span className="slot-prefix">PARKING SLOT</span>
              <span className="slot-number" id="confirmed-slot-display">{booking.slot}</span>
            </div>
            <div className="slot-meta">
              <span className="zone-name">Zone A • Ground Floor</span>
              <span className="gate-name">Enter via North Gate 2</span>
            </div>
          </div>

          <div className="pass-details-grid">
            <div className="pass-detail-cell">
              <div className="cell-label">
                <Calendar size={14} /> Date
              </div>
              <div className="cell-value" id="confirmed-date-display">{formattedDate}</div>
            </div>

            <div className="pass-detail-cell">
              <div className="cell-label">
                <Clock size={14} /> Time
              </div>
              <div className="cell-value" id="confirmed-time-display">{formattedTime}</div>
            </div>

            <div className="pass-detail-cell">
              <div className="cell-label">
                {isTwoWheeler ? <Bike size={14} /> : <Car size={14} />} Vehicle Type
              </div>
              <div className="cell-value" id="confirmed-veh-type-display">{booking.vehicleType}</div>
            </div>

            <div className="pass-detail-cell">
              <div className="cell-label">
                <Car size={14} /> Registration No.
              </div>
              <div className="cell-value highlighted-reg" id="confirmed-veh-num-display">{booking.vehicleNumber}</div>
            </div>

            <div className="pass-detail-cell">
              <div className="cell-label">
                <CreditCard size={14} /> Payment Method
              </div>
              <div className="cell-value" id="confirmed-payment-display">{booking.paymentMethod}</div>
            </div>

            <div className="pass-detail-cell">
              <div className="cell-label">
                <MapPin size={14} /> City
              </div>
              <div className="cell-value" id="confirmed-city-display">{booking.city || 'Not specified'}</div>
            </div>
          </div>

          {/* QR Pass / Barcode Mock */}
          <div className="pass-barcode-area">
            <div className="qr-box">
              <QrCode size={52} />
            </div>
            <div className="barcode-info">
              <span className="barcode-code">{booking.bookingId} • SCAN AT RFID GATE</span>
              <span className="barcode-sub">Valid for single entry & exit on the reserved date</span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="modal-actions">
          <button
            type="button"
            id="book-another-slot-btn"
            className="btn-book-another"
            onClick={onReset}
          >
            <RotateCcw size={18} />
            <span>Book Another Slot</span>
          </button>

          <button
            type="button"
            id="print-pass-btn"
            className="btn-print"
            onClick={handlePrint}
          >
            <Printer size={18} />
            <span>Print / Save Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
}
