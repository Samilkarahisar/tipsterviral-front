import { createDesignFromTool } from '@/api/tool';
import { getUser } from '@/api/user';
import Spinner from '@/components/ui/Spinner';
import { auth } from '@/lib/firebase';
import { roomTypeList, styleList } from '@/res/values';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Tool = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isRoomEmpty, setIsRoomEmpty] = useState(true);
  const [selectedRoomStyle, setSelectedRoomStyle] = useState(
    styleList[0].value,
  );
  const [selectedRoomStyleLabel, setSelectedRoomStyleLabel] = useState(
    styleList[0].label,
  );
  const [selectedRoomType, setSelectedRoomType] = useState(
    roomTypeList[0].value,
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNoCreditsLeft, setIsNoCreditsLeft] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const freeToken = router.query.freeToken;

  useEffect(() => {
    const getSubscriptionInfo = async () => {
      const data = await getUser();
      if (data) {
        setIsNoCreditsLeft(data.credits_amount <= 0);
      } else if (!freeToken) {
        router.push('/login');
      }
    };

    if (!loading) getSubscriptionInfo();
  }, [loading, freeToken, router]);

  const changeHandler = (event: any) => {
    if (user || freeToken) {
      const file = event.target.files[0];
      const fileNotNull = file !== undefined;
      if (fileNotNull && file.type.toLowerCase().indexOf('image/') < 0) {
        setSelectedFile(undefined);
        setIsFileSelected(false);
        alert(t('tool.errorNoPicture'));
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

  const handleSubmission = async () => {
    if (!selectedFile) {
      console.log(t('tool.errorNoPicture'));
      return;
    } else {
      try {
        setIsSubmitted(true);
        const result = await createDesignFromTool(
          selectedFile,
          selectedRoomStyle,
          selectedRoomType,
          isRoomEmpty,
          freeToken,
        );
        if (result?.code == 200) {
          router.push('/redesign/' + result.id);
        } else if (result?.code == 666) {
          alert(t('tool.alertCredit'));
          router.push('/pricing');
        } else {
          console.log(result?.code + ': ' + result?.status);
          alert(t('tool.error'));
          router.push('/');
        }
      } catch (err) {
        console.log(err);
        return;
      }
    }
  };

  const { t } = useTranslation('home');

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-50 w-full h-full ${
          !showPopup ? 'hidden' : ''
        }`}>
        <div className="absolute bg-white top-1/2 left-1/2 -ml-36 -mt-28 p-5 rounded-xl w-72 h-60">
          <div
            className={`absolute top-0 right-0 m-4 cursor-pointer ${
              isSubmitted ? 'hidden' : ''
            }`}
            onClick={() => {
              setShowPopup(false);
            }}>
            <svg
              className="h-8 w-8 hover:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          {isNoCreditsLeft ? (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="text-center text-xl">
                {t('tool.noCreditLeft')}
              </div>
              <div
                className="bg-[#ee7932] hover:bg-[#d46c2c] text-white text-xl rounded-lg py-2 px-4 mt-6 cursor-pointer"
                onClick={() => {
                  redirectToPricing();
                }}>
                Abonnez-vous
              </div>
            </div>
          ) : isSubmitted ? (
            <div className="flex flex-col justify-center items-center h-full w-full">
              <Spinner />
              <div className="text-center">
                <span className="text-xl">{t('tool.designing')}</span>
                <br />
                {t('tool.timeWarning')}
              </div>
            </div>
          ) : isFileSelected ? (
            isRoomEmpty ? (
              <div className="flex flex-col justify-center items-center w-full h-full">
                <div className="text-center text-xl">
                  {t('tool.furnishInto')}{' '}
                  <span className="font-bold">
                    {
                      roomTypeList.find(
                        (type) => type.value === selectedRoomType,
                      )?.label
                    }
                  </span>{' '}
                  ?
                </div>
                <div
                  className="bg-[#ee7932] hover:bg-[#d46c2c] text-white text-xl rounded-lg py-2 px-4 mt-6 cursor-pointer"
                  onClick={() => {
                    handleSubmission();
                  }}>
                  {t('tool.confirm')}
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center w-full h-full">
                <div className="text-center text-xl">
                  {t('tool.redecorate')}{' '}
                  <span className="font-bold">
                    {
                      roomTypeList.find(
                        (type) => type.value === selectedRoomType,
                      )?.label
                    }
                  </span>{' '}
                  {t('tool.withStyle')}{' '}
                  <span className="font-bold">{selectedRoomStyleLabel}</span> ?
                </div>
                <div
                  className="bg-[#ee7932] hover:bg-[#d46c2c] text-white text-xl rounded-lg py-2 px-4 mt-6 cursor-pointer"
                  onClick={() => {
                    handleSubmission();
                  }}>
                  {t('tool.confirm')}
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="text-center text-xl">
                {t('tool.choosePicture')}
              </div>
              <div
                className="bg-[#ee7932] hover:bg-[#d46c2c] text-white text-xl rounded-lg py-2 px-4 mt-6 cursor-pointer"
                onClick={() => {
                  setShowPopup(false);
                }}>
                OK
              </div>
            </div>
          )}
        </div>
        <div
          className="w-full h-full bg-black bg-opacity-40 transition overflow-auto"
          onClick={() => {
            if (!isSubmitted) setShowPopup(false);
          }}></div>
      </div>

      <div
        id="selectDiv"
        className={`flex justify-center items-center laptop:mx-auto
        ${showPopup ? 'blur' : ''}`}>
        <div className="flex flex-col flex-grow p-5 pb-10">
          {freeToken ? (
            <div className="text-3xl text-[#ee7932] font-bold mb-4">
              {t('tool.freeTrial')}
            </div>
          ) : (
            ''
          )}
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
                  {t('tool.uploadPicture')}
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
            <div className="text-2xl font-bold mb-4">{t('tool.pictureIs')}</div>
            <div className="flex flex-row justify-center items-center mb-10">
              <div
                className={`relative cursor-pointer transition hover:scale-100 ${
                  isRoomEmpty ? 'scale-[0.95]' : 'scale-[0.8]'
                }`}
                onClick={() => {
                  setIsRoomEmpty(true);
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
                  {t('tool.empty')}
                </div>
              </div>
              <div
                className={`relative cursor-pointer transition hover:scale-100 ${
                  !isRoomEmpty ? 'scale-[0.95]' : 'scale-[0.8]'
                }`}
                onClick={() => {
                  setIsRoomEmpty(false);
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
                  {t('tool.furnished')}
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold mb-4">{t('tool.roomType')}</div>
            <div id="select-room-type" className="flex flex-col mb-4">
              <div className="grid grid-cols-2 laptop:grid-cols-3">
                {roomTypeList.map((option, id) => (
                  <div className="relative" key={id}>
                    <div
                      className={`flex justify-center items-center transition hover:scale-100 ${
                        option.value === selectedRoomType
                          ? 'scale-[0.95]'
                          : 'scale-[0.9]'
                      }`}
                      onClick={() => {
                        setSelectedRoomType(option.value);
                      }}>
                      <div
                        className={`relative w-32 h-32 bg-[#fefbf2] cursor-pointer rounded-[10px] border-4
                        ${
                          option.value === selectedRoomType
                            ? 'border-[#ee7932]'
                            : 'border-transparent'
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
            {!isRoomEmpty ? (
              <div id="select-style">
                <div className="text-2xl font-bold">Style</div>
                <div className="grid grid-cols-1 laptop:grid-cols-2">
                  {styleList.map((option, id) => (
                    <div
                      key={id}
                      onClick={() => {
                        setSelectedRoomStyle(option.value);
                        setSelectedRoomStyleLabel(option.label);
                      }}
                      className="flex w-full justify-center items-center mt-5">
                      <div className="relative">
                        <div
                          className={`rounded-full overflow-hidden h-24 w-80  flex items-center justify-center relative cursor-pointer border-4  transition hover:scale-100 
                        ${
                          option.value === selectedRoomStyle
                            ? ' border-[#ee7932] scale-[0.95]'
                            : 'border-transparent scale-[0.9]'
                        }`}>
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
            ) : (
              ''
            )}
          </div>

          <div className="mt-10">
            <button
              className="bg-[#ef8b34] hover:bg-[#d46c2c] cursor-pointer py-4 px-6 rounded-3xl text-white text-2xl  mx-auto block"
              onClick={() => setShowPopup(true)}>
              {isRoomEmpty ? t('tool.furnish') : t('tool.restyle')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tool;
