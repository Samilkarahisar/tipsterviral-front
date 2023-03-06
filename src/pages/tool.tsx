import { createDesignFromTool } from '@/api/tool';
import { getUser } from '@/api/user';
import Spinner from '@/components/ui/Spinner';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

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
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [account, setAccount] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(styleList[0].value);
  const [isStyleSelected, setIsStyleSelected] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNoCreditsLeft, setIsNoCreditsLeft] = useState(false);

  useEffect(() => {
    getSubscriptionInfo();
    setIsNoCreditsLeft(account.credits_amount <= 0);
    console.log(isNoCreditsLeft);
  }, [user]);

  const getSubscriptionInfo = async () => {
    const data = await getUser();
    if (data) setAccount(data);
  };

  const changeHandler = (event) => {
    if (user) {
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
    } else {
      router.push('/login');
    }
  };

  const redirectToPricing = () => {
    router.push('/pricing');
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

  const toggleIsStyleSelected = async () => {
    setIsStyleSelected(!isStyleSelected);
  };

  const handleSubmission = async () => {
    if (!selectedFile) {
      console.log('No file selected');
      return;
    } else {
      try {
        setIsSubmitted(true);
        const result = await createDesignFromTool(selectedFile, selectedStyle);
        if (result?.code == 200) {
          router.push('/redesign/' + result.id);
        } else {
          console.log(result?.code + ': ' + result?.status);
        }
      } catch (err) {
        console.log(err);
        return;
      }
    }
  };

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-50 w-full h-full ${
          !isStyleSelected ? 'hidden' : ''
        }`}>
        <div className="absolute bg-white top-1/2 left-1/2 -ml-36 -mt-28 p-5 rounded-xl w-72 h-60">
          <div
            className={`absolute top-0 right-0 m-4 cursor-pointer ${
              isSubmitted ? 'hidden' : ''
            }`}
            onClick={() => {
              toggleIsStyleSelected();
            }}>
            <svg
              className="h-8 w-8 hover:text-gray-600"
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
          {isNoCreditsLeft ? (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="text-center text-xl">
                Sorry you don&apos;t have any credits left...
              </div>
              <div
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-xl rounded-lg py-2 px-4 mt-6 cursor-pointer"
                onClick={() => {
                  redirectToPricing();
                }}>
                Buy more
              </div>
            </div>
          ) : isSubmitted ? (
            <div className="flex flex-col justify-center items-center h-full w-full">
              <Spinner />
              <div className="text-center">
                <span className="text-xl">Generating...</span>
                <br />
                Please wait a few seconds
              </div>
            </div>
          ) : isFileSelected ? (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="text-center text-xl">
                Do you want to use the{' '}
                <span className="font-bold">{selectedStyle}</span> style ?
              </div>
              <div
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-xl rounded-lg py-2 px-4 mt-6 cursor-pointer"
                onClick={() => {
                  handleSubmission();
                }}>
                Confirm
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="text-center text-xl">Please select a picture</div>
              <div
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-xl rounded-lg py-2 px-4 mt-6 cursor-pointer"
                onClick={() => {
                  toggleIsStyleSelected();
                }}>
                OK
              </div>
            </div>
          )}
        </div>
        <div
          className="w-full h-full bg-black bg-opacity-40 transition overflow-auto"
          onClick={() => {
            if (!isSubmitted) toggleIsStyleSelected();
          }}></div>
      </div>
      <div
        id="selectDiv"
        className={`flex justify-center items-center  laptop:mx-auto 
        ${isStyleSelected ? 'blur' : ''}`}>
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
                changeHandler(e);
              }}
              className="hidden"
            />
          </label>
          <div id="styleSelectDiv">
            <div className="text-2xl font-bold">Choose a style</div>
            {styleList.map((option, id) => (
              <div
                key={id}
                onClick={() => {
                  setSelectedStyle(option.label);
                  setIsStyleSelected(true);
                }}
                className="flex flex-col w-full justify-center items-center mt-5">
                <div className="relative">
                  <div className="rounded-full overflow-hidden h-24 w-80  flex items-center justify-center bg-gray-300 border-2 border-black relative cursor-pointer">
                    <img
                      src={option.image}
                      alt="Image"
                      className="h-24 w-80 object-cover blur-[0.7px]"
                    />
                    <div className="absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="text-4xl font-bold text-[white] drop-shadow-2xl shadow-black">
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
    </>
  );
};

export default Tool;
