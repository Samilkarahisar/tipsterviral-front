import { createDesignFromTool } from '@/api/tool';
import { getUser } from '@/api/user';
import Spinner from '@/components/ui/Spinner';
import { auth } from '@/lib/firebase';
import {
  IconBathroom,
  IconBedroom,
  IconBricks,
  IconCloset,
  IconGarage,
  IconGreen,
  IconKitchen,
  IconLivingRoom,
  IconLux,
  IconMarble,
  IconToilet,
  IconWood,
} from '@/res/icons';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type BillingInterval = 'year' | 'month';

const roomList = [
  {
    image: IconBathroom.src,
    label: 'Bathroom',
    value: '1',
  },
  {
    image: IconBedroom.src,
    label: 'Bedroom',
    value: '2',
  },
  {
    image: IconKitchen.src,
    label: 'Kitchen',
    value: '3',
  },
  {
    image: IconLivingRoom.src,
    label: 'Living Room',
    value: '4',
  },
  {
    image: IconToilet.src,
    label: 'Toilet',
    value: '5',
  },
  {
    image: IconGarage.src,
    label: 'Garage',
    value: '6',
  },
  {
    image: IconCloset.src,
    label: 'Closet',
    value: '7',
  },
];

const styleList = [
  {
    image: IconWood.src,
    label: 'Wood',
    value: '1',
  },
  {
    image: IconGreen.src,
    label: 'Green',
    value: '2',
  },
  {
    image: IconLux.src,
    label: 'Lux',
    value: '3',
  },
  {
    image: IconBricks.src,
    label: 'Bricks',
    value: '4',
  },
  {
    image: IconMarble.src,
    label: 'Marble',
    value: '5',
  },
];

const Tool = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [priceIdLoading, setPriceIdLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>();
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(roomList[0].value);
  const [selectedStyle, setSelectedStyle] = useState(styleList[0].value);

  useEffect(() => {
    getSubscriptionInfo();
  }, [user]);

  const changeHandler = (event) => {
    const file = event.target.files[0];
    const fileNotNull = file !== undefined;
    if (fileNotNull && file.type.toLowerCase().indexOf('image/') < 0) {
      setSelectedFile(undefined);
      setIsFileSelected(false);
      alert('Please select an image file');
    } else {
      setSelectedFile(file);
      setIsFileSelected(fileNotNull);
    }
  };

  const ImageThumb = ({ image }) => {
    return (
      <img
        src={URL.createObjectURL(image)}
        alt={image.name}
        className="object-scale-down h-full"
      />
    );
  };

  const getSubscriptionInfo = async () => {
    const data = await getUser();

    setSubscription(data);
    setPriceIdLoading(false);
  };

  const handleSubmission = async () => {
    let formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('room', selectedRoom);
    formData.append('style', selectedStyle);

    try {
      await createDesignFromTool(formData as FormData);
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return priceIdLoading ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <>
      <div className="max-w-[1000px] mx-auto py-4 px-4">
        <div className="flex flex-col laptop:flex-row rounded-3xl  laptop:min-w-[1000px]">
          <div className="flex mobile:flex-col mobile:w-full laptop:w-1/2 bg-transparent m-5 laptop:m-10 laptop:mr-5">
            <div className="flex w-full h-full laptop:h-3/4">
              <label className="flex flex-col w-full rounded-3xl border-4 border-dashed border-yellow-500 hover:cursor-pointer group">
                {isFileSelected ? (
                  <div className="flex flex-col w-full h-full">
                    <div className="flex flex-col items-center justify-center overflow-hidden p-4">
                      {selectedFile && <ImageThumb image={selectedFile} />}
                    </div>
                    <div className="flex items-center justify-center pb-4">
                      <span className="text-black font-bold">
                        File selected :{' '}
                        <span className=" text-yellow-500 font-thin underline">
                          {selectedFile && selectedFile.name}
                        </span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center m-10 laptop:my-auto group-hover:scale-110 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-24 h-24 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="pt-1 m-0 text-xl text-center tracking-wider text-black">
                      Upload a picture
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={changeHandler}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="flex mobile:flex-col mobile:w-full laptop:w-1/2 bg-transparent m-5 laptop:m-10 laptop:ml-5">
            <div className="w-full h-full">
              <div id="select-room" className="flex flex-col mb-4">
                <span className="text-black text-xl laptop:text-2xl">
                  Select the room of your picture
                </span>
                <div className="h-1 w-1/2 bg-yellow-500 rounded-xl mt-2 mb-8" />
                <div className="grid grid-cols-3 laptop:grid-cols-4">
                  {roomList.map((option) => (
                    <div
                      key={option.value}
                      className="cursor-pointer w-20 h-20 mr-1 mb-1 laptop:w-24 laptop:h-24 laptop:mr-2 laptop:mb-2"
                      onClick={() => {
                        setSelectedRoom(option.value);
                        console.log(option.value);
                      }}>
                      <div
                        className={`relative bg-[#fefbf2] 
                        ${
                          option.value === selectedRoom
                            ? 'border-4 border-yellow-500'
                            : ''
                        }`}>
                        <div className="p-6">
                          <img src={option.image} alt={option.label} />
                        </div>
                        <span className="absolute flex w-full h-full bottom-0 items-end justify-center">
                          {option.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div id="select-style" className="flex flex-col mb-4">
                <span className="text-black text-2xl">
                  Select the style of your room
                </span>
                <div className="h-1 w-1/2 bg-yellow-500 rounded-xl mt-2 mb-8" />
                <div className="grid grid-cols-3 laptop:grid-cols-4">
                  {styleList.map((option) => (
                    <div
                      key={option.value}
                      className="cursor-pointer w-20 h-20 mr-1 mb-1 laptop:w-24 laptop:h-24 laptop:mr-2 laptop:mb-2"
                      onClick={() => {
                        setSelectedStyle(option.value);
                        console.log(option.value);
                      }}>
                      <div
                        className={`relative
                        ${
                          option.value === selectedStyle
                            ? 'border-4 border-yellow-500'
                            : ''
                        }`}>
                        <div className="">
                          <img src={option.image} alt={option.label} />
                        </div>
                        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-lg">
                          {option.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="button-generate" className="flex flex-col w-full">
          <button
            className="flex rounded-full bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold bottom-0 py-2 px-8 mx-auto disabled:cursor-default disabled:bg-gray-500 disabled:hover:bg-gray-600"
            disabled={!isFileSelected}
            title={!isFileSelected ? 'Attach a file to generate' : ''}
            onClick={() => {
              handleSubmission();
            }}>
            Generate
          </button>
        </div>
      </div>
    </>
  );
};

export default Tool;
