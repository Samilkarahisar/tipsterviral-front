import { createDesignFromTool } from '@/api/tool';
import { getUser } from '@/api/user';
import Spinner from '@/components/ui/Spinner';
import { auth } from '@/lib/firebase';
import { styleList } from '@/res/values';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

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
      console.log('Vous devez choisir une image');
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
                Vous n&apos;avez plus de crédit.
              </div>
              <div
                className="bg-[#ee7932] hover:bg-[#d46c2c] text-white text-xl rounded-lg py-2 px-4 mt-6 cursor-pointer"
                onClick={() => {
                  redirectToPricing();
                }}>
                Abonnez vous.
              </div>
            </div>
          ) : isSubmitted ? (
            <div className="flex flex-col justify-center items-center h-full w-full">
              <Spinner />
              <div className="text-center">
                <span className="text-xl">Génération en cours...</span>
                <br />
                Cela peut prendre 30 secondes.
              </div>
            </div>
          ) : isFileSelected ? (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="text-center text-xl">
                Voulez-vous utiliser le style{' '}
                <span className="font-bold">{selectedStyle}</span>?
              </div>
              <div
                className="bg-[#ee7932] hover:bg-[#d46c2c] text-white text-xl rounded-lg py-2 px-4 mt-6 cursor-pointer"
                onClick={() => {
                  handleSubmission();
                }}>
                Confirm
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="text-center text-xl">
                Veuillez choisir une photo
              </div>
              <div
                className="bg-[#ee7932] hover:bg-[#d46c2c] text-white text-xl rounded-lg py-2 px-4 mt-6 cursor-pointer"
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
        className={`flex justify-center items-center laptop:mx-auto 
        ${isStyleSelected ? 'blur' : ''}`}>
        <div className="flex flex-col flex-grow p-5">
          <label className="flex flex-col w-full min-h-[200px] mb-7 rounded-3xl border-4 border-dashed border-[#ee7932] hover:cursor-pointer group">
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
                  Télécharger une photo d&apos;appartement
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
            <div className="text-2xl font-bold">
              Choisir le style à appliquer
            </div>
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
