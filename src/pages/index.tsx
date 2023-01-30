import {
  IconCheck,
  IconCode,
  IconCustomization,
  IconOptions,
  IconTitle,
} from '@/res/icons';
import { ImgLandingPreview } from '@/res/images';
import { Col, Row } from 'antd';
import { NextSeo } from 'next-seo';
import router from 'next/router';
import React from 'react';

const HomePage = () => {
  return (
    <>
      <NextSeo
        title={`Imageyeti - AI powered image generation API`}
        description={
          'Imageyeti handles everything for you. We use the newest technologies like Stable Diffusion to find a unique background for your needs. All you have to do is to give us a title and we provide you a content ready image, for your blog, podcast, social media usages.'
        }
      />
      <Row className="font-bold lg:text-5xl text-3xl h-[300px] max-w-[800px] mx-auto w-full px-4 items-center">
        <Col span={12}>
          <div>Automatically</div>
          <div>design</div>
          <div>your images.</div>
        </Col>
        <Col span={12}>
          <img src={ImgLandingPreview.src} />
        </Col>
      </Row>

      <div className="h-[315px] py-10">
        <div className="font-bold max-w-[800px] w-full px-4 mx-auto">
          <Row className="text-lg mb-6">
            <IconTitle className="inline-block" />
            <label className="ml-4 self-center">
              Write the title of your content{' '}
            </label>
          </Row>
          <Row className="text-lg mb-6">
            <IconCheck />
            <label className="ml-4 self-center">
              We find a fitting background image
            </label>
          </Row>
          <Row className="text-lg mb-6">
            <IconCheck />
            <label className="ml-4 self-center">Add your logo and title</label>
          </Row>
          <Row className="text-lg mb-6">
            <IconCheck />
            <label className="ml-4 self-center">Host the image for you</label>
          </Row>
        </div>
      </div>
      <div
        style={{
          backgroundImage: 'url(https://i.ibb.co/xsdrg8H/Nouveau-projet-8.jpg)',
          width: '100%',
        }}
        className="xl:h-[30vh] lg:h-[25vh] md:h-[20vh] sm:h-[15vh] h-[10vh] animate-ltr-linear-infinite bg-contain ">
        <div className="text-center text-white xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-4xl  font-extrabold  xl:pt-[11vh] lg:pt-[9vh] md:pt-[7vh] sm:pt-[5vh] pt-[3vh] drop-shadow-xl">
          AI Powered
        </div>
      </div>
      <div className="max-w-[1200px] w-full px-4 mx-auto py-10">
        <div className="font-bold text-3xl text-center mb-10">Features</div>
        <div className="flex">
          <div className="w-1/3 text-center px-5">
            <IconOptions className="mb-4 inline" />
            <div className="font-bold text-lg mb-4">Image Generation</div>
            <div className="text-[14px] leading-[18px]">
              Imageyeti handles everything for you. All you have to do is to
              give us a title and we provide you a <b>content ready image</b>,
              for your
              <b> blog, podcast, social media</b> usages.
            </div>
          </div>
          <div className="w-1/3 text-center px-5">
            <IconCode className="mb-4 inline" />
            <div className="font-bold text-lg mb-4">API</div>
            <div className="text-[14px] leading-[18px]">
              Easy to use, single endpoint{' '}
              <a className="underline" href="/documentation">
                magic API 🔮
              </a>
              . Using our API you can
              <b> totally automate </b>
              your usage of our image generation services.
            </div>
          </div>
          <div className="w-1/3 text-center px-5">
            <IconCustomization className="mb-4 inline" />
            <div className="font-bold text-lg mb-4">Edit</div>
            <div className="text-[14px] leading-[18px]">
              We can handle everything for you. However we also have the tools
              for you to
              <b> customize your images.</b> You can pick the background and the
              text styling among it.
            </div>
          </div>
        </div>
        <div className="font-bold text-3xl text-center mb-4 mt-[150px]">
          Ready to get started?
        </div>
        <button
          className="bg-[#4298f8] h-[50px] w-[250px] rounded-lg text-white text-lg font-bold mx-auto block"
          onClick={() => router.push('/login')}>
          Try Imageyeti for free
        </button>
      </div>
    </>
  );
};

export default HomePage;
