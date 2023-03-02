import { getAllRedesignsByUserId } from '@/api/redesign';
import { getUser } from '@/api/user';
import { auth } from '@/lib/firebase';
import fontawesome, { IconDefinition } from '@fortawesome/fontawesome';
import { faCoins, faImages, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

fontawesome.library.add(
  faCoins as IconDefinition,
  faImages as IconDefinition,
  faPlus as IconDefinition,
);

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [account, setAccount] = useState<any>({});
  const [redesigns, setRedesigns] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    getSubscriptionInfo();
    getRedesigns();
  }, [user]);

  const getSubscriptionInfo = async () => {
    const data = await getUser();
    if (data) setAccount(data);
  };

  const getRedesigns = async () => {
    const data = await getAllRedesignsByUserId();
    console.log(data);
    if (data) setRedesigns(data.redesigns);
  };

  const redirectToRedesign = async (id) => {
    router.push('/redesign/' + id);
  };

  const redirectToTool = async () => {
    router.push('/tool');
  };

  return (
    <>
      <div className="grid grid-cols-2 laptop:grid-cols-4 gap-2 w-full h-[120px] p-6">
        <div className="flex justify-center items-center border bg-white border-gray-200 rounded-xl p-4">
          <div className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-lg">
            <FontAwesomeIcon icon={'coins'} size={'2x'} />
          </div>
          <div className="flex flex-col pl-2">
            <div className="text-gray-400 text-lg font-bold">Crédits</div>
            <div className="text-yellow-500 text-3xl">
              {account.credits_amount}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center border bg-white border-gray-200 rounded-xl p-4">
          <div className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-lg">
            <FontAwesomeIcon icon={'images'} size={'2x'} />
          </div>
          <div className="flex flex-col pl-2">
            <div className="text-gray-400 text-lg font-bold">Designs</div>
            <div className="text-yellow-500 text-3xl">{redesigns?.length}</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 laptop:grid-cols-4 gap-2">
          {redesigns?.map((redesign) => (
            <div className="relative">
              <div
                className="flex flex-col justify-center items-center w-full h-[200px] bg-gray-500 rounded-3xl cursor-pointer overflow-hidden"
                onClick={() => {
                  redirectToRedesign(redesign.id);
                }}>
                <img src={redesign.result_url} alt={redesign.style} />
                <div className="absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="text-4xl font-bold pt-2 text-[white] drop-shadow-2xl shadow-black">
                    {redesign.style}
                    <span className="text-[#ee7932]">.</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div
            className="flex flex-col justify-center items-center w-full h-[200px] bg-yellow-500 hover:bg-yellow-600 cursor-pointer rounded-3xl"
            onClick={() => {
              redirectToTool();
            }}>
            <FontAwesomeIcon icon={'plus'} size={'4x'} color={'white'} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
