import '@/styles/globals.css';
import 'antd/dist/antd.css';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { hotjar } from 'react-hotjar';
import Wrapper from '../components/ui/Wrapper';
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    hotjar.initialize(3428804, 6);
  }, []);
  return (
    <>
      <DefaultSeo
        title="Decoloco.co"
        description="Redesign your house in 5 seconds"
      />
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </>
  );
}
export default MyApp;
