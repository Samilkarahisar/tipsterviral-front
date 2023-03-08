import { getAllRedesignsByUserId } from '@/api/redesign';
import { getUser } from '@/api/user';
import { auth } from '@/lib/firebase';
import {
  DollarCircleFilled,
  PictureFilled,
  PlusCircleFilled,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

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
    if (data) setRedesigns(data.redesigns);
  };

  const redirectToRedesign = async (id: string) => {
    router.push('/redesign/' + id);
  };

  const redirectToTool = async () => {
    router.push('/tool');
  };

  return (
    <>
      <div className="laptop:max-w-[1500px] mx-auto">
        <div className="grid grid-cols-2 laptop:grid-cols-4 gap-2 w-full h-[120px] p-6">
          <div className="flex justify-center items-center border bg-white border-gray-200 rounded-xl p-4">
            <div className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-lg">
              <DollarCircleFilled className="text-xl" />
            </div>
            <div className="flex flex-col pl-2">
              <div className="text-gray-400 text-lg font-bold">Crédits</div>
              <div className="text-[#ee7932] text-3xl">
                {account.credits_amount}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center border bg-white border-gray-200 rounded-xl p-4">
            <div className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-lg">
              <PictureFilled className="text-xl" />
            </div>
            <div className="flex flex-col pl-2">
              <div className="text-gray-400 text-lg font-bold">Designs</div>
              <div className="text-[#ee7932] text-3xl">{redesigns?.length}</div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 laptop:grid-cols-4 gap-2">
            {redesigns?.map((redesign: any, id: number) => (
              <div className="relative" key={id}>
                <div
                  className="flex flex-col justify-center items-center w-full h-[200px] bg-gray-500 rounded-3xl cursor-pointer overflow-hidden"
                  onClick={() => {
                    redirectToRedesign(redesign.id);
                  }}>
                  <img
                    src={redesign.result_url}
                    alt={redesign.style}
                    className="h-full w-full object-cover object-center"
                  />
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
              className="flex flex-col justify-center items-center w-full h-[200px] bg-[#ee7932] hover:bg-[#d46c2c] cursor-pointer rounded-3xl"
              onClick={() => {
                redirectToTool();
              }}>
              <PlusCircleFilled className="text-8xl !text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
