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
        title={`${design.title + ' Design'} - Decoloco`}
        description={`${design.title}, ` + design.prompt}
        openGraph={{
          url: 'decoloco.co',
          title: `${design.title + ' Design'} - Decoloco`,
          description: `${design.title}, ` + design.prompt,
          site_name: 'decoloco.co',
        }}
      />
      <Container>
        <div className="flex items-center justify-center mt-5">
          <img
            src="https://replicate.delivery/pbxt/gAMb3DP3cWYlA94eYOkzIajKbzw5eMi7OgBkNocUIhZ5iYbQA/out-0.png"
            alt="alt-text"
            className="object-contain rounded-[75px] small:h-auto small:w-auto min-h-[200px] min-w-[200px] laptop:w-[520px] laptop:h-[520px]"
          />
        </div>

        <div className="flex laptop:gap-14 small:gap-4 tablet:flex-row flex-col mt-10 pl-20">
          <div className="small:flex hidden flex-col items-center tablet:mb-0 mb-6 justify-end">
            {/* laptop*/}
            <div className="laptop:w-[520px] ">
              <div className="text-[#ee7932] underline">
                <p className="text-[#ee7932] text-3xl font-serif text-right ">
                  Description
                </p>
              </div>
              <div className="text-black text-right">
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            {/* mobile */}
            <div className=" small:hidden flex justify-between space-x-3">
              <div className="flex flex-col laptop:justify-between gap-3">
                <div className="text-[#ee7932] underline">
                  <p className="text-[#ee7932] text-3xl font-serif">
                    Description2
                  </p>
                </div>

                <div className="text-black text-right">
                  <p>Description text goes here.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between space-x-3">
              <div className="flex flex-col laptop:justify-between gap-3">
                <div className="text-[#ee7932] underline">
                  <p className="text-[#ee7932] text-3xl font-serif">Styles</p>
                </div>
                <div className="flex items-center">
                  <h1 className="text-4xl font-bold mr-4 pt-4">
                    Bedroom<span className="text-[#ee7932]">.</span>
                  </h1>
                  <div className="rounded-full overflow-hidden h-12 w-36 flex items-center justify-center bg-gray-300">
                    <img
                      src="https://static01.nyt.com/images/2020/10/25/realestate/19shopping1/oakImage-1602795344944-superJumbo.jpg"
                      alt="Image"
                      className="h-12 w-36 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col laptop:ml-20 laptop:pl-40 mb-10">
          <div className="flex flex-col items-start mt-5">
            <h1 className="text-3xl font-bold mb-5">
              Could your room look like this?
            </h1>
            <button
              className="bg-[#ee7932] h-[50px] w-[250px] rounded-lg text-white text-lg font-bold  block"
              onClick={() => router.push('/login')}>
              Try decoloco for free
            </button>
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
    const pass = await getDesignBySlug(token, slug as string);
    design = pass.res[0];
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
