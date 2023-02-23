import { auth } from '@/lib/firebase';
import { IconClose, IconMenu } from '@/res/icons';
import { ImgLogo } from '@/res/images';
import {
  footerRoutes,
  headerRoutes,
  ROUTE_ACCOUNT,
  ROUTE_DASHBOARD,
  ROUTE_LOGIN,
} from '@/res/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Container from './Container';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        nookies.set(undefined, 'token', token, {
          path: '/',
          maxAge: 60 * 60,
        });
      }
    });
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (open) {
        setOpen(false);
      }
    };
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [open, router.events]);

  return (
    <div className="border-b border-secondary border-black dark:border-dark-secondary laptop:py-[16px] py-4 sticky top-0 bg-white dark:bg-dark z-20">
      <Container>
        <div className="flex justify-between">
          <div className="flex justify-between items-center gap-10">
            <Link href={!user ? '/' : '/dashboard'}>
              <a className="w-40 h-50  block">
                <img src={ImgLogo.src} />
              </a>
            </Link>
          </div>

          {open && (
            <div
              role="button"
              onClick={() => setOpen(false)}
              className="laptop:hidden bg-black bg-opacity-20 fixed inset-0 transition-colors duration-300"
            />
          )}

          <div
            className={`laptop:static fixed ${
              !open ? 'translate-x-full' : 'translate-x-0'
            } right-0 min-h-screen laptop:min-h-0 laptop:transform-none transition-transform duration-300 laptop:h-auto h-full bg-blue-100 laptop:w-auto w-[265px] top-0 laptop:p-0 p-4 pr-9 laptop:gap-10 laptop:flex laptop:flex-row flex-col`}>
            <IconClose
              onClick={() => setOpen(false)}
              className="laptop:hidden mb-5 stroke-current text-gray1 dark:text-dark-gray1 cursor-pointer"
            />
            <ul className="flex laptop:items-center items-end laptop:space-x-7 space-y-4 laptop:space-y-0 flex-none laptop:flex-row flex-col laptop:mb-0 mb-6">
              {headerRoutes.map(({ label, route }) => (
                <li key={route}>
                  <Link href={route}>
                    <a>
                      <label className="cursor-pointer">{label}</label>
                    </a>
                  </Link>
                </li>
              ))}
              {user && isClient && (
                <>
                  <li>
                    <Link href={ROUTE_ACCOUNT}>
                      <a>
                        <label className="cursor-pointer">Account</label>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={ROUTE_DASHBOARD}>
                      <a>
                        <label className="cursor-pointer">Dashboard</label>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <label
                      className="cursor-pointer"
                      onClick={async () => {
                        await auth.signOut();
                        nookies.destroy(undefined, 'token', {
                          path: '/landing',
                        });
                      }}>
                      Sign out
                    </label>
                  </li>
                </>
              )}
              {!user && !loading && isClient && (
                <>
                  <li>
                    <Link href={ROUTE_LOGIN}>
                      <a>
                        <label className="cursor-pointer">Sign in</label>
                      </a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="laptop:hidden h-px w-full bg-secondary dark:bg-dark-secondary mb-6" />
            <ul className="laptop:hidden flex items-end space-y-4 flex-none flex-col mb-6">
              {footerRoutes.map(({ label, route }) => (
                <li key={route}>
                  <Link href={route}>
                    <a>
                      <label className="cursor-pointer">{label}</label>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="laptop:hidden h-px w-full bg-secondary dark:bg-dark-secondary mb-7" />
          </div>
          <div className="flex space-x-7 items-center laptop:hidden">
            <IconMenu
              alt="menu"
              className="cursor-pointer stroke-current dark:text-white  text-black stroke-2"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
