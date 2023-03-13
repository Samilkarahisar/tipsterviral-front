import { getRedesignById } from '@/api/redesign';
import Container from '@/components/ui/Container';
import { styleList } from '@/res/values';
import { RedesignDto } from '@/types/dto/RedesignDto';
import { NextPageContext } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React from 'react';

interface Props {
  redesign: RedesignDto;
}

const RedesignPage: React.FC<Props> = ({ redesign }) => {
  const router = useRouter();
  const redirectToTool = async () => {
    router.push('/tool');
  };

  return (
    <>
      <NextSeo
        title={`Redesign your room in ${redesign.style} + style - Decoloco`}
        description={`A fresh redesign`}
        openGraph={{
          url: 'decoloco.co',
          title: `${
            'Redesign your room in ' + redesign.style + ' style'
          } - Decoloco`,
          description: `A fresh redesign`,
          site_name: 'decoloco.co',
        }}
      />
      <Container>
        <div className="flex flex-col laptop:flex-row laptop:items-center laptop:justify-center laptop:max-w-[1000px] mx-auto px-5 pt-10">
          <img
            src={redesign.init_url}
            className="object-contain rounded-[25px] small:h-auto small:w-auto min-h-[200px] min-w-[200px]"
          />
          <div className="relative">
            <div className="small:h-auto small:w-auto min-h-[200px] min-w-[200px] laptop:w-[75px] laptop:h-[75px]"></div>
            <div className="absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="rounded-full overflow-hidden h-24 w-72 flex items-center justify-center bg-transparent border-0 rotate-90 laptop:rotate-0">
                  <img
                    src="https://i.ibb.co/b5kd9b3/Nouveau-projet-23.png"
                    alt="Image"
                    className="h-12 w-36"
                  />
                </div>
              </div>
            </div>
          </div>
          <img
            src={redesign.result_url}
            alt="alt-text"
            className="object-contain rounded-[25px] small:h-auto small:w-auto min-h-[200px] min-w-[200px]"
          />
        </div>
        <div className="flex flex-col justify-center items-center mx-auto px-5 py-10">
          <div className="flex flex-col">
            <div className="flex flex-col laptop:flex-row">
              <h1 className="text-4xl font-bold mb-5 mr-5 pt-3">
                Vous avez utilisé le style
              </h1>
              <div className="rounded-full overflow-hidden h-16 w-48 flex items-center justify-center bg-gray-300 border-2 border-black relative ">
                <img
                  src={
                    styleList.find((style) => {
                      return (
                        style.value.toLowerCase() ===
                        redesign.style.toLowerCase()
                      );
                    })?.image
                  }
                  alt="Image"
                  className="h-16 w-48 object-cover"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="text-3xl font-bold text-white drop-shadow-2xl shadow-black">
                    {
                      styleList.find((style) => {
                        return (
                          style.value.toLowerCase() ===
                          redesign.style.toLowerCase()
                        );
                      })?.label
                    }
                    <span className="text-[#ee7932]">.</span>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-xl font-medium mb-5 mr-5 pt-5">
              Essayez d&apos;autres styles et d&apos;autres pièces avec
              l&apos;outil de Decoloco !
            </h1>
            <button
              className="bg-[#ee7932] hover:bg-[#d46c2c] cursor-pointer h-[50px] w-[150px] rounded-lg text-white text-lg font-bold  block"
              onClick={() => {
                redirectToTool();
              }}>
              Aller à l&apos;outil
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.query;

  const { token } = nookies.get(ctx);
  let redesign = null;

  try {
    const pass = await getRedesignById(token, id as string);
    redesign = pass.redesign;
  } catch (e) {
    return;
  }

  if (!redesign) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      redesign,
    },
  };
}

export default RedesignPage;
