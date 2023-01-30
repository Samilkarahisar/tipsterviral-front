import '@/styles/globals.css';
import 'antd/dist/antd.css';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import React from 'react';
import Wrapper from '../components/ui/Wrapper';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="ImageYeti"
        description="Our yeti automatically generates a fitting image for your content"
      />
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </>
  );
}
export default MyApp;
