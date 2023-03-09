import { getRedesignById } from '@/api/redesign';
import Container from '@/components/ui/Container';
import { styleList } from '@/res/values';
import { RedesignDto } from '@/types/dto/RedesignDto';
import { NextPageContext } from 'next';
import { NextSeo } from 'next-seo';
import nookies from 'nookies';
import React from 'react';

interface Props {
  redesign: RedesignDto;
}

const RedesignPage: React.FC<Props> = ({ redesign }) => {
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
        <div className="flex flex-col laptop:items-center laptop:justify-center p-10">
          <img
            src={redesign.init_url}
            className="object-contain rounded-[25px] small:h-auto small:w-auto min-h-[200px] min-w-[200px]"
          />
          <div className="relative">
            <img
              src="https://i.ibb.co/xfLDTt6/Nouveau-projet-21.png"
              className="small:h-auto small:w-auto min-h-[200px] min-w-[200px] laptop:w-[75px] laptop:h-[75px]"
            />
            <div className="absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="rounded-full overflow-hidden h-24 w-72 flex items-center justify-center bg-gray-300 border-2 border-black relative ">
                  <img
                    src={
                      styleList.find((style) => {
                        return style.label === redesign.style;
                      })?.image
                    }
                    alt="Image"
                    className="h-24 w-72 object-cover"
                  />
                  <div className="absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="text-4xl font-bold text-[white] drop-shadow-2xl shadow-black">
                      {redesign.style}
                      <span className="text-[#ee7932]">.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img
            src={redesign.result_url}
            alt="alt-text"
            className="object-contain rounded-[25px] small:h-auto small:w-auto min-h-[200px] min-w-[200px]"
          />
          <div className="flex flex-col items-start mt-10">
            <h1 className="text-3xl font-bold mb-5">
              Voulez vous utiliser le style {redesign.style}?
            </h1>
            <button className="bg-[#ee7932] h-[50px] w-[250px] rounded-lg text-white text-lg font-bold  block">
              Aller à l&apos;outil de design
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
