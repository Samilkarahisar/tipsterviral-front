import { IconEmail } from '@/res/icons';
import { footerRoutes } from '@/res/routes';
import Link from 'next/link';
import React from 'react';
import Container from './Container';

const Footer = () => {
  return (
    <div className="bg-white border-t border-secondary dark:border-dark-secondary pt-4 pb-4">
      <Container>
        <div className="flex tablet:items-center items-start justify-between tablet:mb-10 mb-14 flex-wrap gap-5">
          <ul className="flex space-y-4 tablet:space-x-8 flex-wrap tablet:flex-row flex-col tablet:space-y-0 mb-0">
            {footerRoutes.map(({ label, route }) => (
              <li key={route}>
                <Link href={route}>
                  <a className="dark:text-dark-gray1 text-gray1 text-sm laptop:text-md">
                    {label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex space-x-3 flex-wrap">
            <div className="p-[10px] bg-secondary flex dark:bg-dark-secondary rounded-xl">
              <Link href="mailto:no-reply@example.com">
                <a target="_blank" className="flex">
                  <IconEmail alt="email" />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <label className="text-gray2 text-xs">
          Decoloco © 2022 - contact@decoloco.co
        </label>
      </Container>
    </div>
  );
};

export default Footer;
