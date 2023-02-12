import { getDesignBySlug } from '@/api/design';
import Container from '@/components/ui/Container';
import { DesignDto } from '@/types/dto/DesignDto';
import { NextPageContext } from 'next';
import { NextSeo } from 'next-seo';
import nookies from 'nookies';
import React from 'react';

interface Props {
  design: DesignDto;
}

const DesignPage: React.FC<Props> = ({ design }) => {
  return (
    <>
      <NextSeo
        title={`${design.title + ' NFT'} - CoinHunt`}
        description={`${design.title}, ` + design.prompt}
        openGraph={{
          url: 'coinhunt.cc',
          title: `${design.title + ' NFT'} - CoinHunt`,
          description: `${design.title}, ` + design.prompt,
          site_name: 'Coinhunt',
        }}
      />
      <Container>
        <div className="flex laptop:gap-14 small:gap-4 tablet:flex-row flex-col mb-10">
          <div className="small:flex hidden flex-col items-center tablet:mb-0 mb-6">
            {
              'https://replicate.delivery/pbxt/gAMb3DP3cWYlA94eYOkzIajKbzw5eMi7OgBkNocUIhZ5iYbQA/out-0.png'
            }
          </div>
          <div className="flex flex-col w-full">
            <div className="small:hidden mb-5 flex items-center justify-center">
              {
                'https://replicate.delivery/pbxt/gAMb3DP3cWYlA94eYOkzIajKbzw5eMi7OgBkNocUIhZ5iYbQA/out-0.png'
              }
            </div>
            <div className="flex justify-between space-x-3">
              <div className="flex flex-col laptop:justify-between gap-3">
                <div className="flex small:flex-row flex-col">
                  {design.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const { token } = nookies.get(ctx);
  const { slug } = ctx.query;

  let design = null;

  try {
    design = await getDesignBySlug(token, slug as string);
  } catch (e) {
    return;
  }

  if (!design) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      design,
    },
  };
}

export default DesignPage;
