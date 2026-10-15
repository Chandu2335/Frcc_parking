import React from 'react';
import { Calendar, CalendarDays, Clock, MapPin, Car, Bike, Tag, Hash } from 'lucide-react';
import './BookingSummary.css';

export default function BookingSummary({
  formData,
  selectedSlot,
  amount,
  pricePerDay
}) {
  const isTwoWheeler = formData.vehicleType === 'Two Wheeler';
  const numberOfDays = Number(formData.days) || 1;

  // Format date helper (e.g. 10/10/2026)
  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return 'Not selected';
    try {
      const [year, month, day] = dateStr.split('-');
      if (year && month && day) {
        return `${day}/${month}/${year}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  // Format time helper (e.g. 10:00 AM)
  const formatTimeDisplay = (timeStr) => {
    if (!timeStr) return 'Not selected';
    try {
      const [hours, minutes] = timeStr.split(':');
      const h = parseInt(hours, 10);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const displayH = h % 12 || 12;
      return `${displayH}:${minutes} ${ampm}`;
    } catch {
      return timeStr;
    }
  };

  return (
    <div className="embedded-booking-summary" id="embedded-booking-summary-section">
      <div className="summary-section-title-row">
        <div className="title-left">
          <Tag size={16} className="title-icon" />
          <h3 className="summary-heading">Booking Details</h3>
        </div>
        <span className="summary-badge-zone">Zone A • Ground Level</span>
      </div>

      <div className="summary-grid-compact">
        {/* City */}
        <div className="summary-item">
          <span className="summary-item-label">
            <MapPin size={13} /> City:
          </span>
          <span className="summary-item-value" id="summary-city-value">
            {formData.city ? formData.city : <span className="muted-italic">Select city</span>}
          </span>
        </div>

        {/* Parking Slot */}
        <div className="summary-item">
          <span className="summary-item-label">
            <MapPin size={13} /> Parking Slot:
          </span>
          <span className="summary-item-value" id="summary-slot-value">
            {selectedSlot ? (
              <span className="slot-pill-compact">{selectedSlot}</span>
            ) : (
              <span className="muted-italic">Select a slot</span>
            )}
          </span>
        </div>

        {/* Vehicle Type */}
        <div className="summary-item">
          <span className="summary-item-label">
            {isTwoWheeler ? <Bike size={13} /> : <Car size={13} />} Vehicle Type:
          </span>
          <span className="summary-item-value" id="summary-vehicle-type-value">
            {formData.vehicleType || <span className="muted-italic">Select vehicle type</span>}
          </span>
        </div>

        {/* Number of Days */}
        <div className="summary-item">
          <span className="summary-item-label">
            <CalendarDays size={13} /> Number of Days:
          </span>
          <span className="summary-item-value" id="summary-days-value">
            {numberOfDays} Day{numberOfDays > 1 ? 's' : ''}
          </span>
        </div>

        {/* Date */}
        <div className="summary-item">
          <span className="summary-item-label">
            <Calendar size={13} /> Date:
          </span>
          <span className="summary-item-value" id="summary-date-value">
            {formData.date ? formatDateDisplay(formData.date) : <span className="muted-italic">Select date</span>}
          </span>
        </div>

        {/* Time */}
        <div className="summary-item">
          <span className="summary-item-label">
            <Clock size={13} /> Time:
          </span>
          <span className="summary-item-value" id="summary-time-value">
            {formData.time ? formatTimeDisplay(formData.time) : <span className="muted-italic">Select time</span>}
          </span>
        </div>

        {/* Vehicle Number */}
        <div className="summary-item">
          <span className="summary-item-label">
            <Hash size={13} /> Vehicle Number:
          </span>
          <span className="summary-item-value mono-value" id="summary-vehicle-number-value">
            {formData.vehicleNumber ? formData.vehicleNumber : <span className="muted-italic">Not entered</span>}
          </span>
        </div>
      </div>

      {/* Pricing Row */}
      <div className="summary-pricing-bar">
        <div className="pricing-col">
          <span className="pricing-label">Price Per Day:</span>
          <span className="pricing-rate" id="summary-price-rate">
            {formData.vehicleType ? `₹${pricePerDay}` : '—'}
          </span>
        </div>

        <div className="pricing-col days-col">
          <span className="pricing-label">Days:</span>
          <span className="pricing-rate" id="summary-days-rate">
            {numberOfDays}
          </span>
        </div>

        <div className="pricing-col total-col">
          <span className="pricing-label">Total Amount:</span>
          <span className="pricing-total" id="summary-total-amount">
            ₹{amount}
          </span>
        </div>
      </div>
    </div>
  );
}
