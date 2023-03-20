import { getRedesignById } from '@/api/redesign';
import Container from '@/components/ui/Container';
import { RedesignDto } from '@/types/dto/RedesignDto';
import { DownloadOutlined, ZoomInOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import { NextPageContext } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useCallback, useEffect, useState } from 'react';
import ImageViewer from 'react-simple-image-viewer';

interface Props {
  redesign: RedesignDto;
}

const RedesignPage: React.FC<Props> = ({ redesign }) => {
  const [images, setImages] = useState<any>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  useEffect(() => {
    setImages(redesign.result_url.split(';'));
  }, []);
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const router = useRouter();
  const redirectToTool = async () => {
    router.push('/tool');
  };

  function downloadImage(url: any, id: any) {
    console.log(url);
    saveAs(
      url,
      'Decoloco_' + redesign.id.split('-').pop() + '_image_' + id + '.jpg',
    );
  }

  return (
    <>
      <NextSeo
        title={`Redesign your room in ${redesign.style} + style - Decoloco`}
        description={`A fresh redesign`}
        openGraph={{
          url: 'decoloco.co',
          title: `${
            'Redesign your room in ' + redesign.style + ' style'
          } - Decoloco`,
          description: `A fresh redesign`,
          site_name: 'decoloco.co',
        }}
      />
      <Container>
        {isViewerOpen && (
          <ImageViewer
            src={images}
            currentIndex={currentImage}
            disableScroll={true}
            closeOnClickOutside={true}
            backgroundStyle={{ background: 'transparent' }}
            onClose={closeImageViewer}
          />
        )}
        <div className="flex flex-col laptop:flex-row laptop:items-center laptop:justify-center laptop:max-w-[1000px] mx-auto px-5 pt-10">
          <img
            src={redesign.init_url}
            className="object-contain rounded-[25px] small:h-auto small:w-auto min-h-[200px] min-w-[200px]"
          />
          <div className="relative">
            <div className="small:h-auto small:w-auto min-h-[200px] min-w-[200px] laptop:w-[75px] laptop:h-[75px]"></div>
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

          <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4">
            {images.map((redesign: any, id: number) => (
              <div
                key={id}
                className="relative"
                style={{
                  filter: 'brightness(1)',
                  transition: 'filter 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                }}>
                <img
                  src={redesign}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex flex-col items-center justify-center">
                    <button
                      onClick={() => downloadImage(redesign, id)}
                      className="w-[32px] h-[32px] border border-white rounded-full">
                      <DownloadOutlined className="!text-white" />
                    </button>
                    <span className="text-xs text-white mt-1">Télécharger</span>
                  </div>
                  <div className="flex flex-col items-center justify-center ml-2">
                    <button
                      onClick={() => openImageViewer(id)}
                      className="w-[32px] h-[32px] border border-white rounded-full">
                      <ZoomInOutlined className="!text-white" />
                    </button>
                    <span className="text-xs text-white mt-1">Voir</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mx-auto px-5 py-10">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-5 mr-5 pt-3">
              Pour télécharger une image, cliquez dessus.
            </h1>
            <h1 className="text-xl font-medium mb-5 mr-5 pt-5">
              Meublez d&apos;autres pièces avec l&apos;outil de Decoloco !
            </h1>
            <button
              className="bg-[#ee7932] hover:bg-[#d46c2c] cursor-pointer h-[50px] w-[150px] rounded-lg text-white text-lg font-bold  block"
              onClick={() => {
                redirectToTool();
              }}>
              Aller à l&apos;outil
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.query;

  const { token } = nookies.get(ctx);
  let redesign = null;

  try {
    const pass = await getRedesignById(token, id as string);
    redesign = pass.redesign;
  } catch (e) {
    return;
  }

  if (!redesign) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      redesign,
    },
  };
}

export default RedesignPage;
