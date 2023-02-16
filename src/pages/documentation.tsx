import { getUser } from '@/api/user';
import Container from '@/components/ui/Container';
import { auth } from '@/lib/firebase';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const Documentation = () => {
  const [user] = useAuthState(auth);
  const [apiKey, setApiKey] = useState('$API-KEY');

  useEffect(() => {
    getSubscriptionInfo();
  }, [user]);

  const getSubscriptionInfo = async () => {
    const data = await getUser();
    if (data) setApiKey(data.apiKey);
  };

  return (
    <>
      <Container className="mt-10">
        <section className="bg-transparent">
          <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8 ">
            <div className="sm:flex sm:flex-col sm:align-center">
              <h1 className="text-4xl font-extrabold text-black sm:text-center sm:text-6xl">
                Magic API 🔮
              </h1>
              <p className="mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
                Use our single endpoint API to automate your generation process.
              </p>
              <div className="m-auto">
                <b>API Link</b>
                <label className="block p-2 rounded-lg max-w-[500px] bg-green2 ">
                  https://api.decoloco.co/magicGenerate
                </label>
              </div>
              <div className=" m-auto">
                <p className="mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl max-w-2xl m-auto">
                  What to send
                </p>
                <table className="table-fixed border-separate border border-slate-500 ">
                  <thead className="text-left">
                    <tr>
                      <th className="border border-slate-600 p-5">Param</th>
                      <th className="border border-slate-600 p-5">Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-600 p-5">apiKey</td>
                      <td>
                        <b className="bg-green-200 rounded-lg p-3">{apiKey}</b>
                      </td>
                    </tr>
                  </tbody>
                  <thead className="text-left">
                    <tr>
                      <th className="border border-slate-600 p-5">
                        Body <br></br>
                        (Object with following properties)
                      </th>
                      <th className="border border-slate-600 p-5">Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-600 p-5">
                        title [required]
                      </td>
                      <td className="border border-slate-600 p-5">
                        (string)
                        <ul>The image will be generated based on this</ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-600 p-5">
                        titleFont [optional]
                      </td>
                      <td className="border border-slate-600 p-5">
                        (string)
                        <ul>
                          <li>Arial</li>
                          <li>Verdana</li>
                          <li>Roboto</li>
                          <li>Times New Roman</li>
                          <li>Courier New</li>
                          <li>serif</li>
                          <li>sans-serif</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-600 p-5">
                        titleSize [optional]
                      </td>
                      <td className="border border-slate-600 p-5">
                        (string) <ul> 0 to 50</ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-600 p-5">
                        titlePosition [optional]
                      </td>
                      <td className="border border-slate-600 p-5">
                        (string)
                        <ul>
                          <li>top</li>
                          <li>mid</li>
                          <li>bot</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-600 p-5">
                        titleColor [optional]
                      </td>
                      <td className="border border-slate-600 p-5">
                        (string) <ul>ffffff [hexcode]</ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-600 p-5">
                        titleWeight [optional]
                      </td>
                      <td className="border border-slate-600 p-5">
                        (string)
                        <ul>
                          <li>normal</li>
                          <li>bold</li>
                          <li>lighter</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-600 p-5">
                        logoUrl [optional]
                      </td>
                      <td className="border border-slate-600 p-5">
                        (string) <ul>A Url that serves your logo</ul>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-600 p-5">
                        logoPosition [optional]
                      </td>
                      <td className="border border-slate-600 p-5">
                        (string)
                        <ul>
                          <li>top-left</li>
                          <li>top-right</li>
                          <li>bot-left</li>
                          <li>bot-right</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Documentation;
