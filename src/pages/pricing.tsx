import { getUser, subscribeUser } from '@/api/user';
import Container from '@/components/ui/Container';
import Spinner from '@/components/ui/Spinner';
import { auth } from '@/lib/firebase';
import { getStripe } from 'get-stripe';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type BillingInterval = 'year' | 'month';

const Pricing = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [priceIdLoading, setPriceIdLoading] = useState(true);

  const [subscription, setSubscription] = useState<any>();

  useEffect(() => {
    getSubscriptionInfo();
  }, [user]);

  const getSubscriptionInfo = async () => {
    const data = await getUser();
    setSubscription(data);
    setPriceIdLoading(false);
  };

  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');

  const products = [
    {
      id: 'prod_NU2X29q39J3WUA',
      name: 'Pro',
      description: 'Bon plan',
      image:
        'https://i.ibb.co/X7TDm0k/Capture-d-e-cran-2023-03-09-a-00-24-40.png',
      features: [
        '100 crédits',
        "Puissance de l'IA",
        'Hébérgement des images',
        'Support par email',
      ],
      prices: [
        {
          id: 'price_1Mj4SAIkTMCG3UAUvXJy7GoZ',
          interval: 'month',
          currency: 'EUR',
          unit_amount: 19,
        },
        {
          id: 'price_1Mj4SBIkTMCG3UAUri1OadUN',
          interval: 'year',
          currency: 'EUR',
          unit_amount: 190,
        },
      ],
    },
    {
      id: 'prod_NU2ZrwVwfJYLJb',
      name: 'Entreprise',
      description: 'Convient aux entreprises',
      image:
        'https://images.unsplash.com/photo-1495321308589-43affb814eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      features: [
        'Utilisation illimité',
        "Puissance de l'IA",
        'Hébérgement des images',
        'Support client au téléphone',
        // 'Up to 10 team members',
      ],
      prices: [
        {
          id: 'price_1Mj4U0IkTMCG3UAU7uTuNjkX',
          interval: 'month',
          currency: 'EUR',
          unit_amount: 199,
        },
        {
          id: 'price_1Mj4U0IkTMCG3UAUDKhZpqat',
          interval: 'year',
          currency: 'EUR',
          unit_amount: 1999,
        },
      ],
    },
  ];

  //https://github.com/vercel/nextjs-subscription-payments/blob/main/pages/api/create-checkout-session.ts
  const handleCheckout = async (price: any, subscription: any) => {
    if (!user) {
      return router.push('/signin');
    }

    if (subscription.creditsAmount > 0) {
      //si le user a un
      return router.push('/dashboard'); //faire acount plus tard
    }

    try {
      const data = await subscribeUser(price);

      const stripe = await getStripe();
      stripe?.redirectToCheckout(data);
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(false);
    }
  };

  return priceIdLoading ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <>
      <Container>
        <section className="bg-transparent">
          <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8 ">
            <div className="sm:flex sm:flex-col sm:align-center">
              <h1 className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
                Prêt à commencer ?
              </h1>
              <p className="text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
                Choisissez le plan qui vous correspond
              </p>
              <div className="bg-gray-200 relative self-center mt-6 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
                <button
                  onClick={() => setBillingInterval('month')}
                  type="button"
                  className={`${
                    billingInterval === 'month'
                      ? 'bg-[#ee7932] relative w-1/2 border-zinc-800 shadow-sm text-white'
                      : 'text-black ml-0.5 relative w-1/2 border border-transparent'
                  } rounded-md m-1 py-2 text-sm font-medium blackspace-nowrap sm:w-auto sm:px-8`}>
                  Mensuel
                </button>
                <button
                  onClick={() => setBillingInterval('year')}
                  type="button"
                  className={`${
                    billingInterval === 'year'
                      ? 'bg-[#ee7932] relative w-1/2 border-zinc-800 shadow-sm text-white'
                      : 'text-black ml-0.5 relative w-1/2 border border-transparent'
                  } rounded-md m-1 py-2 text-sm font-medium blackspace-nowrap sm:w-auto sm:px-8`}>
                  Annuel
                </button>
              </div>
            </div>
            <div className="h-70 min-h-full mt-6 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none">
              {products.map((product, index) => {
                const price = product?.prices?.find(
                  (price) => price.interval === billingInterval,
                );
                if (!price) return null;

                const priceString = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: price.currency,
                  minimumFractionDigits: 0,
                }).format(
                  price.interval == 'year'
                    ? (price?.unit_amount || 0) / 12
                    : price?.unit_amount || 0,
                );
                const yearlyValue = Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: price.currency,
                  minimumFractionDigits: 0,
                }).format(price?.unit_amount || 0);
                return (
                  <div
                    key={product.id}
                    className={`bg-white rounded-3xl shadow divide-y divide-zinc-600  `}>
                    <div className="p-2">
                      <div className="relative bg-black w-full h-52 rounded-3xl overflow-hidden">
                        <img
                          src={product.image}
                          className="h-full w-full object-cover object-center"
                        />
                        <div className="absolute bottom-0 left-0 p-6">
                          <div className="text-white text-2xl">
                            #{index + 1}
                          </div>
                          <div className="text-white text-6xl">
                            {product.name}
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="text-center p-4">
                          <span className="text-5xl font-bold text-[#ee7932]">
                            {priceString}
                          </span>
                          <span className="text-base font-medium">
                            /par mois
                          </span>
                        </div>
                        <div className="text-center p-4">
                          {product.features?.map((a, i) => {
                            return (
                              <div key={i} className="font-medium py-2">
                                {a}
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex justify-center p-4">
                          <div className="text-center px-4 py-2 rounded-full border-2">
                            {product.description}
                          </div>
                        </div>
                      </div>
                      <div
                        className="cursor-pointer bg-gray-200 hover:bg-gray-300 w-full h-20 rounded-3xl"
                        onClick={() => {
                          subscription != undefined
                            ? handleCheckout(price, subscription)
                            : router.push('/login');
                        }}>
                        <div className="flex justify-center items-center w-full h-full">
                          <div className="font-bold text-lg">
                            {subscription != undefined
                              ? subscription.credits_amount > 3
                                ? 'Gérer mon abonnement'
                                : 'Payer'
                              : 'Essai gratuit'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div></div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Pricing;
