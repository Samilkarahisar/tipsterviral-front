import { createDesignFromTool } from '@/api/tool';
import { getUser } from '@/api/user';
import Spinner from '@/components/ui/Spinner';
import { auth } from '@/lib/firebase';
import { roomTypeList, styleList } from '@/res/values';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Tool = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [account, setAccount] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isRoomEmpty, setIsRoomEmpty] = useState(true);
  const [selectedRoomStyle, setSelectedRoomStyle] = useState(
    styleList[0].value,
  );
  const [selectedRoomStyleLabel, setSelectedRoomStyleLabel] = useState('');
  const [isRoomStyleSelected, setIsRoomStyleSelected] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState(
    roomTypeList[0].value,
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNoCreditsLeft, setIsNoCreditsLeft] = useState(false);

  useEffect(() => {
    getSubscriptionInfo();
    setIsNoCreditsLeft(account.credits_amount <= 0);
  }, [user]);

  const getSubscriptionInfo = async () => {
    const data = await getUser();
    if (data) setAccount(data);
    else router.push('/login');
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
        className="object-scale-down rounded-3xl h-[300px]"
      />
    );
  };

  const toggleIsRoomStyleSelected = async () => {
    setIsRoomStyleSelected(!isRoomStyleSelected);
  };

  const toggleIsRoomEmpty = async (empty: boolean) => {
    setIsRoomEmpty(empty);
  };

  const handleSubmission = async () => {
    if (!selectedFile) {
      console.log('Vous devez choisir une image');
      return;
    } else {
      try {
        setIsSubmitted(true);
        const result = await createDesignFromTool(
          selectedFile,
          selectedRoomStyle,
          selectedRoomType,
          isRoomEmpty,
        );
        if (result?.code == 200) {
          router.push('/redesign/' + result.id);
        } else if (result?.code == 666) {
          alert(
            "Vous n'avez plus de crédits, veuillez consulter les offres Decoloco",
          );
          router.push('/pricing');
        } else {
          console.log(result?.code + ': ' + result?.status);
          alert('Une erreur est survenue...');
          router.push('/');
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
          !isRoomStyleSelected ? 'hidden' : ''
        }`}>
        <div className="absolute bg-white top-1/2 left-1/2 -ml-36 -mt-28 p-5 rounded-xl w-72 h-60">
          <div
            className={`absolute top-0 right-0 m-4 cursor-pointer ${
              isSubmitted ? 'hidden' : ''
            }`}
            onClick={() => {
              toggleIsRoomStyleSelected();
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
                Cela peut prendre plus de 1 min.
              </div>
            </div>
          ) : isFileSelected ? (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="text-center text-xl">
                Voulez-vous utiliser le style{' '}
                <span className="font-bold">{selectedRoomStyleLabel}</span>?
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
                  toggleIsRoomStyleSelected();
                }}>
                OK
              </div>
            </div>
          )}
        </div>
        <div
          className="w-full h-full bg-black bg-opacity-40 transition overflow-auto"
          onClick={() => {
            if (!isSubmitted) toggleIsRoomStyleSelected();
          }}></div>
      </div>
      <div
        id="selectDiv"
        className={`flex justify-center items-center laptop:mx-auto
        ${isRoomStyleSelected ? 'blur' : ''}`}>
        <div className="flex flex-col flex-grow p-5 pb-10">
          <label className="flex flex-col w-full min-h-[200px] laptop:w-[800px] mb-7 hover:cursor-pointer group bg-white rounded-3xl shadow">
            {isFileSelected ? (
              <div className="flex flex-col w-full h-full">
                <div className="flex flex-col items-center justify-center overflow-hidden p-4">
                  {selectedFile && <ImageThumb image={selectedFile} />}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center m-10 laptop:my-auto group-hover:scale-105 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-24 h-24 text-[#ee7932]"
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
          <div id="options">
            <div className="text-2xl font-bold mb-4">
              La pièce sur la photo est
            </div>
            <div className="flex flex-row justify-center items-center mb-10">
              <div
                className={`relative cursor-pointer transition hover:scale-100 ${
                  isRoomEmpty ? 'scale-[0.95]' : 'scale-[0.8]'
                }`}
                onClick={() => {
                  toggleIsRoomEmpty(true);
                }}>
                <div
                  className={`rounded-[25px] overflow-hidden border-4 border-transparent ${
                    isRoomEmpty ? 'border-[#ee7932]' : ''
                  }`}>
                  <img
                    src={
                      'https://imagedelivery.net/UabTOQ3wdufnHp8GajOkxg/c89d68bb-3064-498f-af66-4cc5bba16b41-init.png/public'
                    }
                    className={`object-contain small:h-auto small:w-auto min-h-[150px] min-w-[150px] laptop:w-[320px] laptop:h-[320px]`}
                  />
                </div>
                <div
                  className={`absolute flex w-full h-full -bottom-8 items-end justify-center text-2xl ${
                    isRoomEmpty ? 'font-bold' : ''
                  }`}>
                  Vide
                </div>
              </div>
              <div
                className={`relative cursor-pointer transition hover:scale-100 ${
                  !isRoomEmpty ? 'scale-[0.95]' : 'scale-[0.8]'
                }`}
                onClick={() => {
                  toggleIsRoomEmpty(false);
                }}>
                <div
                  className={`rounded-[25px] overflow-hidden border-4 border-transparent ${
                    !isRoomEmpty ? 'border-[#ee7932]' : ''
                  }`}>
                  <img
                    src={
                      'https://imagedelivery.net/UabTOQ3wdufnHp8GajOkxg/c89d68bb-3064-498f-af66-4cc5bba16b41-result.png/public'
                    }
                    className={`object-contain small:h-auto small:w-auto min-h-[150px] min-w-[150px] laptop:w-[320px] laptop:h-[320px]`}
                  />
                </div>
                <div
                  className={`absolute flex w-full h-full -bottom-8 items-end justify-center text-2xl ${
                    !isRoomEmpty ? 'font-bold' : ''
                  }`}>
                  Meublée
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold mb-4">Type de pièce</div>
            <div id="select-room" className="flex flex-col mb-4">
              <div className="grid grid-cols-2 laptop:grid-cols-4">
                {roomTypeList.map((option, id) => (
                  <div className="relative" key={id}>
                    <div
                      className="flex justify-center items-center "
                      onClick={() => {
                        setSelectedRoomType(option.value);
                      }}>
                      <div
                        className={`relative w-32 h-32 bg-[#fefbf2] cursor-pointer
                        ${
                          option.value === selectedRoomType
                            ? 'rounded-[10px] border-4 border-[#ee7932]'
                            : ''
                        }`}>
                        <div className="p-6">
                          <img src={option.image} alt={option.label} />
                        </div>
                        <span className="absolute flex w-full h-full bottom-0 items-end justify-center text-[20px]">
                          {option.label}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div id="styleSelectDiv">
            <div className="text-2xl font-bold">Style</div>
            <div className="grid grid-cols-1 laptop:grid-cols-2">
              {styleList.map((option, id) => (
                <div
                  key={id}
                  onClick={() => {
                    setSelectedRoomStyle(option.value);
                    setSelectedRoomStyleLabel(option.label);
                    setIsRoomStyleSelected(true);
                  }}
                  className="flex w-full justify-center items-center mt-5">
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
      </div>
    </>
  );
};

export default Tool;
