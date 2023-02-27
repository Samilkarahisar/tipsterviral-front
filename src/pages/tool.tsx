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
  const [selectedStyle, setSelectedStyle] = useState(styleList[0].value);
  const [isStyleSelected, setIsStyleSelected] = useState(false);
  const [submit, setSubmit] = useState(false);

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
    if (!selectedFile) {
      console.log('No file selected');
      return;
    } else {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('style', selectedStyle);

      try {
        const result = await createDesignFromTool(formData);
        if (result.code == 200) {
          router.push('/redesign/' + result.id);
        }
      } catch (err) {
        console.log(err);
        return;
      }
    }
  };

  return priceIdLoading ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <>
      <div id="selectDiv" className="flex justify-center">
        <div className="flex flex-col flex-grow px-10 py-5 max-w-lg">
          <label className="flex flex-col w-full min-h-[200px] mb-7 rounded-3xl border-4 border-dashed border-yellow-500 hover:cursor-pointer group">
            {isFileSelected ? (
              <div className="flex flex-col w-full h-full">
                <div className="flex flex-col items-center justify-center overflow-hidden p-4">
                  {selectedFile && <ImageThumb image={selectedFile} />}
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
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
              onChange={(e) => {
                if (!submit) {
                  changeHandler(e);
                }
              }}
              className="hidden"
            />
          </label>
          <div
            id="styleSelectDiv"
            className={`${isStyleSelected ? 'blur' : ''}`}>
            {styleList.map((option, id) => (
              <div
                key={id}
                className="flex flex-col w-full h-12 my-2 rounded-full bg-black justify-center items-center"
                onClick={() => {
                  setSelectedStyle(option.value);
                  setIsStyleSelected(true);
                  console.log(option.value);
                }}>
                <div className="text-white font-bold text-lg">
                  {option.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        id="transformDiv"
        className={`${
          !isStyleSelected ? 'hidden' : ''
        } absolute bottom-0 w-full h-1/4 bg-white rounded-t-3xl border-2 transition-all`}>
        <div className="flex flex-col ">
          <div
            className="flex self-end p-2 m-2 rounded-full bg-black"
            onClick={() => {
              if (!submit) {
                setIsStyleSelected(false);
              }
            }}>
            <svg
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <path
                strokeLinecap-="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="flex self-center">
            <button
              className="flex items-center bg-yellow-500 hover:bg-yellow-600 text-white text-2xl py-2 px-8 rounded-full"
              onClick={() => {
                handleSubmission();
              }}>
              {submit ? (
                <svg
                  className="animate-spin text-white h-5 w-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <></>
              )}
              Transform
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tool;
