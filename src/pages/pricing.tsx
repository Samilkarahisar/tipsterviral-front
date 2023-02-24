import { getUser, subscribeUser } from '@/api/user';
import Container from '@/components/ui/Container';
import Spinner from '@/components/ui/Spinner';
import { auth } from '@/lib/firebase';
import { Button } from 'antd';
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
      id: 'prod_MXfCcpUQitl4qU',
      name: 'Blogger',
      description: 'To start automating',
      features: [
        '📷 30 credits / month',
        '🧠 AI generation',
        '✔️ Image hosting',
      ],
      prices: [
        {
          id: 'price_1Lnmk0Dc5KIhK6yTLiGOIn8t',
          interval: 'month',
          currency: 'EUR',
          unit_amount: 19,
        },
        {
          id: 'price_1Lnmk0Dc5KIhK6yTugx1BLFJ',
          interval: 'year',
          currency: 'EUR',
          unit_amount: 156,
        },
      ],
    },
    {
      id: 'prod_MT6OceZdnHqZwP',
      name: 'Professional',
      description: 'Automate like a pro',
      features: [
        '📷 100 credits / month',
        '🧠 AI generation',
        '✔️ Image hosting',
        '🔮 Magic API available',
      ],
      prices: [
        {
          id: 'price_1LnmlUDc5KIhK6yTairt79Um',
          interval: 'month',
          currency: 'EUR',
          unit_amount: 29,
        },
        {
          id: 'price_1LnmlUDc5KIhK6yTcpuv75dP',
          interval: 'year',
          currency: 'EUR',
          unit_amount: 228,
        },
      ],
    },
    {
      id: 'prod_MWZy0lGkvNRdAt',
      name: 'Enterprise',
      description: 'Automate at scale',
      features: [
        '📷 1000 credits / month',
        '🧠 AI generation',
        '✔️ Image hosting',
        '🔮 Magic API available',
        '📞 1 to 1 Support ',
      ],
      prices: [
        {
          id: 'price_1LnmnfDc5KIhK6yT8OJFKTI9',
          interval: 'month',
          currency: 'EUR',
          unit_amount: 99,
        },
        {
          id: 'price_1LnmnfDc5KIhK6yTuaP4qY3U',
          interval: 'year',
          currency: 'EUR',
          unit_amount: 1068,
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
      <Container className="mt-10">
        <section className="bg-transparent">
          <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8 ">
            <div className="sm:flex sm:flex-col sm:align-center">
              <h1 className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
                Let the yeti do its{' '}
                <a className="underline" href="/documentation">
                  magic 🔮
                </a>
              </h1>
              <p className="mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
                Start automating your image design process today.
              </p>
              <div className="bg-blue-100   relative self-center mt-6 bg-zinc-900 rounded-lg p-0.5 flex sm:mt-8 border border-zinc-800">
                <button
                  onClick={() => setBillingInterval('month')}
                  type="button"
                  className={`${
                    billingInterval === 'month'
                      ? 'bg-blue-200 relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-black'
                      : 'text-black ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                  } rounded-md m-1 py-2 text-sm font-medium blackspace-nowrap sm:w-auto sm:px-8`}>
                  Monthly billing
                </button>
                <button
                  onClick={() => setBillingInterval('year')}
                  type="button"
                  className={`${
                    billingInterval === 'year'
                      ? 'bg-blue-200 relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-black'
                      : 'text-black ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
                  } rounded-md m-1 py-2 text-sm font-medium blackspace-nowrap sm:w-auto sm:px-8`}>
                  Yearly billing
                </button>
              </div>
            </div>
            <div className="h-70 min-h-full mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
              {products.map((product) => {
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
                    className={`bg-white ${
                      product.name == 'Professional'
                        ? 'bg-blue-100'
                        : 'border-0'
                    }  rounded-2xl shadow divide-y divide-zinc-600 bg-zinc-900 `}>
                    <div className="p-6">
                      <h2 className="text-2xl leading-6 font-semibold text-black">
                        {product.name}
                      </h2>
                      <span className="mt-4 text-zinc-300">
                        {product.description}
                      </span>
                      <div className="h-60 min-h-full">
                        {product.features?.map((a, i) => {
                          return (
                            <div key={i} className="font-bold pt-5">
                              {a}
                            </div>
                          );
                        })}
                      </div>
                      <div className="pt-10">
                        <span className="text-5xl font-extrabold black">
                          {priceString}
                        </span>
                        <span className="text-base font-medium text-zinc-100">
                          /month
                        </span>
                      </div>
                      {subscription != undefined ? (
                        <Button
                          onClick={() => handleCheckout(price, subscription)}
                          className="mt-8 block w-full rounded-md py-2 text-sm font-semibold text-black text-center hover:bg-zinc-900">
                          {subscription.creditsAmount > 3
                            ? 'Manage'
                            : 'Subscribe'}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => router.push('/login')}
                          className="mt-8 block w-full rounded-md py-2 text-sm font-semibold text-black text-center hover:bg-zinc-900">
                          {'Try for free'}
                        </Button>
                      )}
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
