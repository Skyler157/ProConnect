import React, { useState } from 'react';
import '../styles/PaymentPage.css';
import PayPal from '../Paypal';

function PaymentPage() {
  const amount = 50; // Example amount to be paid

  const [showPayPal, setShowPaypal] = useState(false);

  const handleProceedToCheckout = () => {
    setShowPaypal(true);
  };

  return (
    <div className="payment-page">
      <h2>Make Payment</h2>
      <p>To proceed with your service request, please complete the payment of ${amount}.</p>
      {!showPayPal && (
        <button onClick={handleProceedToCheckout} type='submit'>PROCEED TO PAYMENT</button>)}
      {showPayPal && (
        <div className="paypal-container">
          <PayPal />
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
