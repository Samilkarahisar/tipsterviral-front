import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE;

  if (!stripePromise && key !== undefined) {
    stripePromise = loadStripe(key);
  }

  return stripePromise;
};
