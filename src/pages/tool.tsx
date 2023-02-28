import { createDesignFromTool } from '@/api/tool';
import { getUser } from '@/api/user';
import Spinner from '@/components/ui/Spinner';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type BillingInterval = 'year' | 'month';

const styleList = [
  {
    image:
      'https://imageio.forbes.com/specials-images/imageserve/632d891161b9efabbc7d2c23/0x0.jpg?format=jpg&crop=2200,1232,x398,y0,safe&width=1200',
    label: 'Japanese',
    value: '1',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2017/01/18/13/10/galaxy-soho-1989816_1280.jpg',
    label: 'Modern',
    value: '2',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2020/06/07/01/50/window-5268702_1280.jpg',
    label: 'Minimalist',
    value: '3',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2019/05/29/19/51/house-4238414_1280.jpg',
    label: 'Scandinavian',
    value: '4',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2018/03/12/20/07/maldives-3220702_1280.jpg',
    label: 'Tropical',
    value: '5',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2015/06/27/16/34/wall-823611_1280.jpg',
    label: 'Industrial',
    value: '2',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2021/03/02/01/07/cyberpunk-6061251_1280.jpg',
    label: 'Cyberpunk',
    value: '3',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2019/11/04/19/15/steampunk-4601917_1280.jpg',
    label: 'Steampunk',
    value: '4',
  },
  {
    image: 'https://cdn.pixabay.com/photo/2015/04/08/13/22/car-712684_1280.jpg',
    label: 'Vice City',
    value: '5',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2014/12/06/12/47/fireplace-558985_1280.jpg',
    label: 'Christmas',
    value: '5',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2014/10/15/01/57/catherines-palace-489085_1280.jpg',
    label: 'Palace',
    value: '5',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2018/07/13/09/04/architecture-3535243_1280.jpg',
    label: 'Morocco',
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
        if (result?.code == 200) {
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
        <div className="flex flex-col flex-grow p-5">
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
            <div className="text-2xl font-bold">Choose a style</div>
            {styleList.map((option, id) => (
              <div
                key={id}
                onClick={() => {
                  setSelectedStyle(option.label);
                  setIsStyleSelected(true);
                  console.log(option.value);
                }}
                className="flex flex-col w-full justify-center items-center mt-5">
                <div className="relative">
                  <div className="rounded-full overflow-hidden h-24 w-80  flex items-center justify-center bg-gray-300 border-2 border-black relative ">
                    <img
                      src={option.image}
                      alt="Image"
                      className="h-24 w-80 object-cover blur-[0.7px]"
                    />
                    <div className="absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="text-4xl font-bold pt-2 text-[white] drop-shadow-2xl shadow-black">
                        {option.label}
                        <span className="text-[#ee7932]">.</span>
                      </div>
                    </div>
                  </div>
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
