import LoadingScreen from '@/components/ui/LoadingScreen';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';

const Header = dynamic(() => import('./Header'));

interface Props {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => setPageLoading(true);
    const handleRouteComplete = () => setPageLoading(false);
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      router.events.off('routeChangeStart', () => handleRouteChange);
      router.events.off('routeChangeStart', () => handleRouteComplete);
    };
  });

  return (
    <div className="bg-[#fffbf4] dark:bg-dark min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col">
        {pageLoading ? <LoadingScreen /> : children}
      </div>
      <Footer />
    </div>
  );
};

export default Wrapper;
