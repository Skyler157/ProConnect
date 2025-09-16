import React, { useEffect, useRef, useState } from 'react';

export default function PayPal() {
  const paypal = useRef();
  const [paypalScriptLoaded, setPaypalScriptLoaded] = useState(false);

  // Load PayPal script dynamically
  useEffect(() => {
    if (!window.paypal) {
      const script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?client-id=AUFu_TZlaMDHuSMS8TVImZ0jivY0nEcoV2ruYyR4QYqWpGHXQDThWr5GipCE_cmC6vS9SDjEHMXojFEk";
      script.async = true;
      script.onload = () => {
        setPaypalScriptLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setPaypalScriptLoaded(true);
    }
  }, []);

  // Initialize the PayPal Buttons when the script is loaded
  useEffect(() => {
    if (paypalScriptLoaded && window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  value: '20.00',
                  currency_code: 'USD',
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.error(err);
        },
      }).render(paypal.current);
    }
  }, [paypalScriptLoaded]);

  return <div ref={paypal}></div>;
}
