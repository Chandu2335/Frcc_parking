import React from 'react';
import { X, QrCode, CreditCard, ShieldCheck, AlertTriangle } from 'lucide-react';
import './PaymentConfirmModal.css';

export default function PaymentConfirmModal({ method, upiId, maskedCard, amount, onCancel, onContinue }) {
  if (!method) return null;

  const isUpi = method === 'UPI';

  return (
    <div className="pay-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="pay-modal-title">
      <div className="pay-modal-container">
        <div className="pay-modal-header">
          <div className="pay-modal-title-row">
            <div className={`pay-modal-title-icon ${isUpi ? 'is-upi' : 'is-card'}`}>
              {isUpi ? <QrCode size={20} /> : <CreditCard size={20} />}
            </div>
            <h3 className="pay-modal-title" id="pay-modal-title">
              {isUpi ? 'Confirm UPI Payment' : 'Confirm Card Payment'}
            </h3>
          </div>
          <button type="button" className="pay-modal-close" id="pay-modal-close-btn" onClick={onCancel} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="pay-modal-body">
          {isUpi ? (
            <div className="pay-modal-row">
              <span className="pay-modal-label">UPI ID:</span>
              <span className="pay-modal-value mono" id="pay-modal-upi-id">{upiId}</span>
            </div>
          ) : (
            <div className="pay-modal-row">
              <span className="pay-modal-label">Card:</span>
              <span className="pay-modal-value mono" id="pay-modal-card-mask">{maskedCard}</span>
            </div>
          )}

          <div className="pay-modal-row">
            <span className="pay-modal-label">Amount:</span>
            <span className="pay-modal-amount" id="pay-modal-amount">{'\u20B9'}{amount}</span>
          </div>

          <p className="pay-modal-question">
            Do you want to continue with {isUpi ? 'UPI' : 'card'} payment?
          </p>

          <p className="pay-modal-demo-note">
            <AlertTriangle size={13} />
            <span>Frontend demonstration only — no real money is transferred.</span>
          </p>
        </div>

        <div className="pay-modal-actions">
          <button type="button" className="pay-modal-btn-cancel" id="pay-modal-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="pay-modal-btn-continue" id="pay-modal-continue-btn" onClick={onContinue}>
            <ShieldCheck size={16} />
            <span>Continue Payment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
