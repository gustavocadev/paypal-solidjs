import { onMount } from 'solid-js';
import { loadScript } from '@paypal/paypal-js';

export const CheckoutPayment = () => {
  onMount(async () => {
    const paypal = await loadScript({
      clientId: '',
    });
    if (!paypal) return;
    if (!paypal.Buttons) return;

    paypal
      .Buttons({
        createOrder: (data, actions) => {
          console.log('Creating order...');
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: '0.01', // Replace with the amount you want to charge
                },
              },
            ],
            intent: 'CAPTURE',
          });
        },
        onApprove: async (data, actions) => {
          console.log('Approving order...');
          return actions.order?.capture().then((details) => {
            console.log(
              `Transaction completed by ${details.payment_source?.paypal?.name}`,
            );
          });
        },
        onError: (err) => {
          console.error('PayPal Checkout onError', err);
        },
      })
      .render('#paypal-button-container');
  });

  return <div id="paypal-button-container" />;
};
