/**
 * FRCC Parking — UPI deep-link helper (frontend, no payment gateway).
 *
 * A valid `upi://pay` payment request requires a CONFIGURED merchant/payee
 * UPI ID and payee name. The end-user's own UPI ID is never used as the
 * payee address.
 *
 * Configuration (Vite env vars, add a `.env` file in the project root):
 *   VITE_UPI_MERCHANT_UPI_ID   e.g. frccparking@okhdfcbank   (payee VPA)
 *   VITE_UPI_MERCHANT_NAME     e.g. FRCC Parking Services    (payee name)
 *   VITE_UPI_CURRENCY          default: INR
 *
 * When the merchant/payee details are NOT configured, the request is not
 * invented: buildUpiPaymentRequest() reports `ready: false` with a clear
 * message instead.
 */

const MERCHANT_VPA = (import.meta.env.VITE_UPI_MERCHANT_UPI_ID || '').trim();
const MERCHANT_NAME = (import.meta.env.VITE_UPI_MERCHANT_NAME || '').trim();
const CURRENCY = (import.meta.env.VITE_UPI_CURRENCY || 'INR').toUpperCase();

export function isUpiMerchantConfigured() {
  return MERCHANT_VPA.length > 0 && MERCHANT_NAME.length > 0;
}

/**
 * Builds a `upi://pay` deep link from the configured merchant details and the
 * user's actual booking amount.
 *
 * @param {object} opts
 * @param {number} opts.amount          actual calculated booking amount (₹)
 * @param {string} [opts.note]          short transaction note
 * @param {string} [opts.transactionRef] merchant transaction reference (tr)
 * @returns {{ready: true, deepLink: string, transactionRef?: string} |
 *           {ready: false, message: string}}
 */
export function buildUpiPaymentRequest({ amount, note, transactionRef }) {
  if (!isUpiMerchantConfigured()) {
    return {
      ready: false,
      message:
        'Merchant UPI configuration is required to launch a payment request. ' +
        'Please set the merchant UPI ID and name (VITE_UPI_MERCHANT_UPI_ID / ' +
        'VITE_UPI_MERCHANT_NAME), then try again.'
    };
  }

  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return {
      ready: false,
      message: 'Invalid payment amount. Unable to create a UPI payment request.'
    };
  }

  const params = new URLSearchParams();
  params.set('pa', MERCHANT_VPA);   // payee address (merchant, never the user)
  params.set('pn', MERCHANT_NAME);  // payee name
  params.set('am', numericAmount.toFixed(2)); // amount in ₹
  params.set('cu', CURRENCY);       // currency code, default INR
  if (note) params.set('tn', note.slice(0, 30)); // transaction note (short)
  if (transactionRef) params.set('tr', transactionRef);

  return {
    ready: true,
    deepLink: `upi://pay?${params.toString()}`,
    transactionRef: transactionRef || null
  };
}

/**
 * Attempts to hand the `upi://pay` link to the OS/browser so the device's
 * available UPI app chooser (Google Pay, PhonePe, Paytm, BHIM, ...) can
 * open. No single app is hard-coded.
 *
 * Success of the launch itself can NOT be verified from a web page, so this
 * only reports whether a launch attempt was made — callers must never treat
 * it as "payment succeeded".
 *
 * @returns {boolean} true if a launch attempt was made, false on failure
 */
export function attemptUpiAppLaunch(deepLink) {
  if (typeof window === 'undefined' || !deepLink) return false;
  try {
    // Hidden iframe first so non-mobile browsers don't fully navigate away.
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'display:none;width:0;height:0;border:0;';
    iframe.src = deepLink;
    document.body.appendChild(iframe);
    window.setTimeout(() => {
      try {
        iframe.remove();
      } catch (_) {
        /* ignore */
      }
    }, 4000);

    // Top-level navigation for mobile browsers that require it.
    window.location.href = deepLink;
    return true;
  } catch (_) {
    return false;
  }
}