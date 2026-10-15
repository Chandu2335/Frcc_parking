import React from 'react';
import { Car } from 'lucide-react';
import './SlotGrid.css';

const DEFAULT_SLOTS = [
  { id: 'P01', status: 'available' },
  { id: 'P02', status: 'available' },
  { id: 'P03', status: 'available' },
  { id: 'P04', status: 'available' },
  { id: 'P05', status: 'available' },
  { id: 'P06', status: 'available' },
  { id: 'P07', status: 'available' },
  { id: 'P08', status: 'available' },
  { id: 'P09', status: 'available' },
  { id: 'P10', status: 'available' },
  { id: 'P11', status: 'available' },
  { id: 'P12', status: 'available' },
];

export default function SlotGrid({ slots, selectedSlot, onSelectSlot }) {
  const slotList = slots && slots.length > 0 ? slots : DEFAULT_SLOTS;

  return (
    <div className="booking-card slot-card" id="parking-slot-selection-card">
      <div className="booking-card-header">
        <Car size={18} className="card-header-icon" />
        <h3 className="booking-card-title">Select Parking Slot</h3>
      </div>
      <div className="booking-card-body">
        <div className="parking-slot-grid-4col" role="radiogroup" aria-label="Parking slots">
          {slotList.map((slot) => {
            const isBooked = slot.status === 'booked';
            const isSelected = selectedSlot === slot.id;

            let slotClass = 'slot-btn-available';
            if (isBooked) slotClass = 'slot-btn-booked';
            else if (isSelected) slotClass = 'slot-btn-selected';

            return (
              <button
                key={slot.id}
                type="button"
                id={`slot-${slot.id}`}
                className={`slot-grid-btn ${slotClass}`}
                disabled={isBooked}
                aria-disabled={isBooked}
                aria-checked={isSelected}
                role="radio"
                onClick={() => {
                  if (!isBooked && onSelectSlot) {
                    onSelectSlot(slot.id);
                  }
                }}
                title={
                  isBooked
                    ? `Slot ${slot.id} is Booked`
                    : isSelected
                    ? `Slot ${slot.id} is Selected`
                    : `Select Slot ${slot.id}`
                }
              >
                {slot.id}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
