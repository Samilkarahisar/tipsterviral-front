import { Col, Row } from 'antd';
import { NextSeo } from 'next-seo';
import router from 'next/router';
import React from 'react';

const HomePage = () => {
  return (
    <>
      <NextSeo
        title={`Decoloco.co - Projetez vos acheteurs dans leur futur bien immobilier`}
        description={'Projetez vos acheteurs dans leur futur bien immobilier.'}
      />
      <Row className="font-Alexandria lg:text-5xl text-3xl max-w-[1000px] mx-auto w-full px-10 laptop:px-20 py-10 items-center ">
        <Col span={80}>
          <div className="font-bold text-[#ef8b34]">Projetez vos acheteurs</div>
          <div>dans leur futur bien immobilier</div>
        </Col>
      </Row>
      <Row className="font-Alexandria lg:text-xl text-xl max-w-[1000px] mx-auto w-full px-10 laptop:px-20 items-center ">
        <Col span={80}>
          <div>1. Importez une photo de la pièce d'un appartemment/maison</div>
          <div>2. Choisissez un style à y appliquer</div>
          <div>3. Obtenez un nouvel apreçu de votre pièce</div>
        </Col>
      </Row>
      <div className="flex flex-col laptop:flex-row laptop:items-stretch laptop:justify-center p-10 ">
        <img
          src={
            'https://imagedelivery.net/UabTOQ3wdufnHp8GajOkxg/c89d68bb-3064-498f-af66-4cc5bba16b41-init.png/public'
          }
          className="object-contain rounded-[25px] small:h-auto small:w-auto min-h-[200px] min-w-[200px] laptop:w-[320px] laptop:h-[320px]"
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
          src={
            'https://imagedelivery.net/UabTOQ3wdufnHp8GajOkxg/c89d68bb-3064-498f-af66-4cc5bba16b41-result.png/public'
          }
          alt="alt-text"
          className="object-contain rounded-[25px] small:h-auto small:w-auto min-h-[200px] min-w-[200px] laptop:w-[320px] laptop:h-[320px]"
        />
      </div>

      <div
        style={{
          backgroundImage: 'url(https://i.ibb.co/09FwV12/landingpage3-3.png)',
          width: '100%',
        }}
        className="h-[150px] laptop:h-[9vh] animate-ltr-linear-infinite laptop:bg-contain bg-repeat-x"></div>

      <div className="p-10">
        <div className="flex flex-col laptop:flex-row gap-5 justify-center items-center max-w-[800px] w-full mx-auto px-14 py-10 bg-gray-200 rounded-3xl">
          <div className="text-3xl font-Alexandria">
            Transformez en un clique <div>votre bien immobilier grâce à</div>
            <span className="font-extrabold">
              l&apos;Intelligence Artificielle
            </span>
          </div>
          <button
            className="bg-[#ef8b34] hover:bg-[#d46c2c] cursor-pointer py-4 px-6 rounded-3xl text-white text-2xl  mx-auto block"
            onClick={() => router.push('/login')}>
            Essayez gratuitement
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
