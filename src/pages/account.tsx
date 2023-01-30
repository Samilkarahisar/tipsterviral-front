import { getPortalLink, getUser } from '@/api/user';
import Container from '@/components/ui/Container';
import { auth } from '@/lib/firebase';
import { Space } from 'antd';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Account = () => {
  const [user] = useAuthState(auth);
  const [account, setAccount] = useState<any>({});

  useEffect(() => {
    getSubscriptionInfo();
  }, [user]);

  const getSubscriptionInfo = async () => {
    const data = await getUser();
    if (data) setAccount(data);
  };
  const handleClick = async () => {
    if (account.subscriptionPlan == undefined) {
      router.push('/pricing');
    } else {
      const portalLink = await getPortalLink();
      router.push(portalLink.url);
    }
  };
  return (
    <>
      <Container className="mt-10">
        <section className="bg-transparent">
          <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8 ">
            <div className="flex flex-col align-center">
              <h1 className="text-2xl font-extrabold text-black text-center sm:text-4xl">
                Hi, {account.email}
              </h1>
            </div>
            <div className="flex flex-col align-center items-center mb-5">
              <Space className="text-lg font-extrabold text-black text-center sm:text-xl">
                Your API Key:{' '}
                <b className="bg-green-200 rounded-lg p-3 text-md font-bold">
                  {account.apiKey}
                </b>
              </Space>
            </div>
            <div className="flex flex-col align-center">
              <h1 className="text-lg font-extrabold text-black text-center sm:text-xl">
                {account.subscriptionPlan && account.subscriptionPlan.length > 0
                  ? 'Subscribed to ' + account.subscriptionPlan + 'plan'
                  : 'Free trial: ' +
                    account.creditsAmount +
                    ' free generation credits left'}
              </h1>
            </div>
            <div className="flex flex-col align-center">
              <h1 className="text-lg font-extrabold text-black text-center sm:text-xl">
                {account.subscriptionPlan == undefined ? (
                  <button
                    className="bg-[#4298f8] h-[50px] w-[250px] rounded-lg text-white text-lg font-bold mx-auto block"
                    onClick={() => router.push('/pricing')}>
                    Upgrade now
                  </button>
                ) : (
                  <button
                    className="bg-[#4298f8] h-[50px] w-[250px] rounded-lg text-white text-lg font-bold mx-auto block"
                    onClick={() => handleClick()}>
                    Manage Subscription
                  </button>
                )}
              </h1>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Account;
