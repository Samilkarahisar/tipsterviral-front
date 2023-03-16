import { FieldTimeOutlined } from '@ant-design/icons';
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
      <Row className="font-Alexandria lg:text-xl text-xl max-w-[1200px] mx-auto px-10 laptop:px-20 items-center">
        <Col className="pr-14">
          <div>1. Importez une photo vide de votre pièce</div>
          <div>2. Choisissez un style</div>
          <div>3. Obtenez une version meublée</div>
        </Col>
        <Col className="mt-4 laptop:pl-6 ">
          <button
            className="bg-[#ef8b34] hover:bg-[#d46c2c] cursor-pointer py-4 px-6 rounded-3xl text-white text-2xl  mx-auto block"
            onClick={() => router.push('/login')}>
            Essayez gratuitement
          </button>
        </Col>
      </Row>
      <div className="flex flex-col laptop:flex-row laptop:items-stretch laptop:justify-center p-10 ">
        <div className="rounded-3xl h-auto w-auto laptop:w-[350px] laptop:h-[350px] overflow-hidden">
          <img
            src={
              'https://imagedelivery.net/UabTOQ3wdufnHp8GajOkxg/6c41685e-e162-40e3-8db1-30fcf4fafb00/public'
            }
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex flex-col items-center">
          <FieldTimeOutlined className="!text-[#ef8b34] text-4xl pt-10 laptop:mt-16" />
          <div className="flex items-center text-l text-bold text-[#ef8b34] ">
            60 secondes
          </div>
          <div className="relative">
            <div className="small:h-auto small:w-auto min-h-[200px] laptop:min-h-[0px] min-w-[200px] laptop:w-[75px] laptop:h-[75px]"></div>
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
        </div>
        <div className="rounded-3xl h-auto w-auto laptop:w-[350px] laptop:h-[350px] overflow-hidden">
          <img
            src={
              'https://imagedelivery.net/UabTOQ3wdufnHp8GajOkxg/291b8240-de21-4e6f-0fa9-7da34fd5d000/public'
            }
            alt="alt-text"
            className="h-full w-full object-cover object-center"
          />
        </div>
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
