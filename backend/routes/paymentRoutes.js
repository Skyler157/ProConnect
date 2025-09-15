const express = require('express');
const paypal = require('paypal-rest-sdk');
const mpesa = require('mpesa-api');
const router = express.Router();

// PayPal payment setup
paypal.configure({
  mode: 'sandbox', // or 'live' for production
  client_id: 'YOUR_PAYPAL_CLIENT_ID',
  client_secret: 'YOUR_PAYPAL_CLIENT_SECRET'
});

// Create payment with PayPal
router.post('/paypal', (req, res) => {
  const { amount } = req.body;
  
  const paymentPayload = {
    intent: 'sale',
    payer: { payment_method: 'paypal' },
    transactions: [{
      amount: { total: amount, currency: 'USD' },
      description: 'Payment for services on ProConnect'
    }],
    redirect_urls: {
      return_url: 'http://yourdomain.com/payment/success',
      cancel_url: 'http://yourdomain.com/payment/cancel'
    }
  };

  paypal.payment.create(paymentPayload, (error, payment) => {
    if (error) {
      res.status(500).json({ message: 'Error creating PayPal payment', error });
    } else {
      res.status(200).json(payment);
    }
  });
});

// M-Pesa Payment setup (simplified version)
router.post('/mpesa', async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const payment = await mpesa.initiatePayment(phone, amount);
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error with M-Pesa payment', error });
  }
});

module.exports = router;
