import { getUser } from '@/api/user';
import Spinner from '@/components/ui/Spinner';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type BillingInterval = 'year' | 'month';
const options = [
  {
    image: 'https://via.placeholder.com/100x100',
    label: 'Option 1',
    value: '1',
  },
  {
    image: 'https://via.placeholder.com/100x100',
    label: 'Option 2',
    value: '2',
  },
  {
    image: 'https://via.placeholder.com/100x100',
    label: 'Option 3',
    value: '3',
  },
  {
    image: 'https://via.placeholder.com/100x100',
    label: 'Option 4',
    value: '4',
  },
  {
    image: 'https://via.placeholder.com/100x100',
    label: 'Option 5',
    value: '5',
  },
  {
    image: 'https://via.placeholder.com/100x100',
    label: 'Option 6',
    value: '6',
  },
  {
    image: 'https://via.placeholder.com/100x100',
    label: 'Option 7',
    value: '7',
  },
];

const Tool = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [priceIdLoading, setPriceIdLoading] = useState(true);
  const [subscription, setSubscription] = useState<any>();
  const [selectedFile, setSelectedFile] = useState();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(options[0].value);

  useEffect(() => {
    getSubscriptionInfo();
  }, [user]);

  const changeHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setIsFileSelected(event.target.files[0] !== undefined);
  };

  const ImageThumb = ({ image }) => {
    return (
      <img
        src={URL.createObjectURL(image)}
        alt={image.name}
        className="object-scale-down h-48 w-96"
      />
    );
  };

  const getSubscriptionInfo = async () => {
    const data = await getUser();

    setSubscription(data);
    setPriceIdLoading(false);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append('File', selectedFile);

    fetch('https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return priceIdLoading ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <>
      <div className="">
        <div className="max-w-[1000px] mx-auto py-2 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-2xl font-extrabold text-black sm:text-left sm:text-4xl">
              Welcome to{' '}
              <span className="text-yellow-500 text-bold">decoloco</span>,
              rediscover your home, try some deco, be loco !
            </h1>
            <p className="mt-5 text-lg text-zinc-200 sm:text-left sm:text-2xl">
              This tool do the magic fo you. It permits you to see your rooms
              with differents looks and styles in a few clicks. All you have to
              do is uplad a picture of one of your room, select the actions you
              want to do in this room, and start the generation.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-black">
        <div className="max-w-[1000px] mx-auto py-2 sm:py-6 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <div className="flex justify-center my-8">
              <div className="w-[750px] rounded-lg shadow-xl bg-gray-50">
                <div className="m-4">
                  <label className="inline-block mb-2 text-gray-500">
                    Upload your picture
                  </label>
                  <div className="flex items-center justify-center ">
                    <label className="flex flex-col w-full border-2 border-gray-300 border-dashed hover:bg- hover:border-yellow-500">
                      {isFileSelected ? (
                        <div className="flex flex-col items-center justify-center pt-7 overflow-hidden">
                          {selectedFile && <ImageThumb image={selectedFile} />}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-7">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Attach a file
                          </p>
                        </div>
                      )}

                      <input
                        type="file"
                        name="file"
                        onChange={changeHandler}
                        className="opacity-0"
                      />
                    </label>
                  </div>
                  <label className="inline-block mb-2 text-gray-500">
                    Select the room type
                  </label>
                  <div className="mb-3 xl:w-96">
                    <select
                      className="form-select appearance-none w-full px-3 py-1.5 rounded text-gray-700 border-2 border-gray-300 hover:border-orange focus:border-yellow-500 focus:outline-none"
                      aria-label="Default select example">
                      <option selected>Kitchen</option>
                      <option value="1">Bedroom</option>
                      <option value="2">Bathroom</option>
                      <option value="3">Living room</option>
                    </select>
                  </div>

                  <label className="inline-block mb-2 text-gray-500">
                    Select the style to use
                  </label>
                  <div className="mb-3 xl:w-96">
                    <select
                      className="form-select appearance-none w-full px-3 py-1.5 rounded text-gray-700 border-2 border-gray-300 hover:border-orange focus:border-yellow-500 focus:outline-none"
                      aria-label="Default select example">
                      <option selected>Modern</option>
                      <option value="1">Industrial</option>
                      <option value="2">Bathroom</option>
                      <option value="3">Living room</option>
                    </select>
                  </div>

                  <label className="inline-block mb-2 text-gray-500">
                    Select the style to use
                  </label>
                  <div className="relative">
                    <div className="form-select block sm:text-sm sm:leading-5">
                      <div className="overflow-y-auto h-64">
                        <div className="flex flex-wrap">
                          {options.map((option) => (
                            <div
                              key={option.value}
                              className={`p-2 cursor-pointer ${
                                option.value === selectedStyle
                                  ? 'bg-gray-200'
                                  : ''
                              } flex items-center`}
                              onClick={() => {
                                setSelectedStyle(option.value);
                                console.log(option.value);
                              }}>
                              <div className="relative w-28 h-28">
                                <img
                                  src={option.image}
                                  alt={option.label}
                                  className="w-full"
                                />
                                <div className="absolute bottom-0 text-center">
                                  {option.label}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center p-2">
                  <button
                    className="w-full px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded shadow-xl disabled:bg-gray-300 disabled:cursor-default"
                    disabled={!isFileSelected}
                    title={!isFileSelected ? 'Attach a file to generate' : ''}>
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tool;
