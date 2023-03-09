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
      <Row className="font-Alexandria lg:text-5xl text-3xl h-[150px] max-w-[1000px] mx-auto w-full px-4 items-center ">
        <Col span={80}>
          <div className="font-bold text-[#ef8b34]">Projetez vos acheteurs</div>
          <div>dans leur futur bien immobilier</div>
        </Col>
      </Row>
      <Row className="font-Alexandria lg:text-xl text-xl h-[100px] max-w-[1000px] mx-auto w-full pl-20 items-center ">
        <Col span={80}>
          <div>1. Importez une photo</div>
          <div>2. Choisissez un style</div>
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

      <div className="max-w-[800px] w-full px-4 mx-auto py-5">
        <div className="text-3xl text-center mb-6 mt-[20px] font-Alexandria">
          Transformez quasi-instantanément{' '}
          <div>votre bien immobilier grâce à</div>
          <div className="font-extrabold">l&apos;Intelligence Artificielle</div>
        </div>
        <button
          className="bg-[#ef8b34] h-[50px] w-[250px] rounded-lg text-white text-lg font-bold mx-auto block"
          onClick={() => router.push('/login')}>
          Essayez gratuitement
        </button>
      </div>
    </>
  );
};

export default HomePage;
