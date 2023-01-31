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

      <div className="max-w-[1200px] w-full px-4 mx-auto py-10">
    
        <div className="font-bold text-3xl text-center mb-4 mt-[150px]">
          Ready to get started?
        </div>
        <button
          className="bg-[#4298f8] h-[50px] w-[250px] rounded-lg text-white text-lg font-bold mx-auto block"
          onClick={() => router.push('/login')}>
          Try decoloco for free
        </button>
      </div>
    </>
  );
};

export default HomePage;
