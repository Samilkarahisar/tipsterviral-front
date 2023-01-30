import { deleteTitle, getTitleById, titleEdit } from '@/api/title';
import { getUser } from '@/api/user';
import Container from '@/components/ui/Container';
import FormSectionsWrapper from '@/components/ui/FormSectionsWrapper';
import FormWrapper from '@/components/ui/FormWrapper';
import LazyImage from '@/components/ui/LazyImage';
import EditTitle from '@/components/ui/specific/EditTitle';
import { auth } from '@/lib/firebase';
import { TitleDto } from '@/types/dto/TitleDto';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Modal, Row, Tooltip } from 'antd';
import { NextPageContext } from 'next';
import { NextSeo } from 'next-seo';
import router from 'next/router';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { generateMore } from '../../api/title';

interface Props {
  title: TitleDto;
}

const TitlePage: React.FC<Props> = ({ title }) => {
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: 0,
      height: 0,
    });

    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== 'undefined') {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }
  const size = useWindowSize();
  const [user] = useAuthState(auth);
  const [copy, setCopy] = useState({
    value: title.image,
    copied: false,
  });
  const [displayLogo, setDisplayLogo] = useState(title.displayLogo);
  const [logoPosition, setLogoPosition] = useState(title.logoPosition);
  const [displayTitle, setDisplayTitle] = useState(title.displayTitle);
  const [titlePosition, setTitlePosition] = useState(title.titlePosition);
  const [titleFont, setTitleFont] = useState(title.titleFont);
  const [titleWeight, setTitleWeight] = useState(title.titleWeight);
  const [titleSize, setTitleSize] = useState(title.titleSize);
  const [titleColor, setTitleColor] = useState(title.titleColor);
  const [noMoreCredit, setNoMoreCredit] = useState(true);
  const [loadingGeneration, setLoadingGeneration] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [showConfirmDeletionModal, setShowConfirmDeletionModal] =
    useState(false);

  const { handleSubmit } = useForm();
  const [selectImage, setSelectImage] = useState(
    title.image.length > 0 ? title.image : JSON.parse(title.generatedUrls)[2],
  );
  const convertVhToPx = (vh: number) => {
    const oneVhInPx = size.height / 100;
    return oneVhInPx * vh;
  };
  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      setNoMoreCredit(user.creditsAmount <= 0);
    };

    fetchData().catch(console.error);
  }, [user]);

  const handleClick = (a: any) => {
    setSelectImage(JSON.parse(title.generatedUrls)[a]);
  };

  const onDeleteConfirm = async () => {
    const deleteRes = await deleteTitle(title.id);
    if (deleteRes?.code === 200) {
      router.push('/dashboard');
    }
  };

  const onGenerateMore = async () => {
    setLoadingGeneration(true);
    const titleDto = {
      id: title.id,
      siteId: title.siteId,
    };
    const newGenerations = await generateMore(titleDto);
    if (newGenerations.status == 'success') {
      router.push('/title/' + newGenerations.id);
    } else if (newGenerations.status == 'noCreditLeft') {
      setLoadingGeneration(false);
      setNoMoreCredit(true);
    }
  };

  const onEditSave = async () => {
    setLoadingSave(true);
    title.displayLogo = displayLogo;
    title.displayTitle = displayTitle;
    title.logoPosition = logoPosition;
    title.titlePosition = titlePosition;
    title.titleFont = titleFont;
    title.titleWeight = titleWeight;
    title.titleSize = titleSize;
    title.titleColor = titleColor;
    const titleDto = {
      ...title,
      image: selectImage,
    };
    const savedImage = await titleEdit(titleDto);
    setLoadingSave(false);
    router.push('/title/' + savedImage.id);
  };

  const handleEditTitleChange = (
    displayLogo: boolean,
    logoPosition: string,
    displayTitle: boolean,
    titlePosition: string,
    titleFont: string,
    titleWeight: string,
    titleSize: number,
    titleColor: string,
  ) => {
    setDisplayLogo(displayLogo);
    setLogoPosition(logoPosition);
    setDisplayTitle(displayTitle);
    setTitlePosition(titlePosition);
    setTitleFont(titleFont);
    setTitleWeight(titleWeight);
    setTitleSize(titleSize);
    setTitleColor(titleColor);
  };

  const getLogoPositionClass = (logoPosition: string) => {
    switch (logoPosition) {
      case 'top-left':
        return 'top-0 left-0';
      case 'top-right':
        return 'top-0 right-0';
      case 'bot-left':
        return 'bottom-0 left-0';
      case 'bot-right':
        return 'bottom-0 right-0';
      default:
        return '';
    }
  };
  const getTitlePositionClass = (titlePosition: string) => {
    switch (titlePosition) {
      case 'top':
        return 'top-0 pl-5';
      case 'mid':
        return 'top-[45%] pl-5';
      default:
        return 'bottom-3 pl-5';
    }
  };
  const getTitleWeightClass = (titleWeight: string) => {
    switch (titleWeight) {
      case 'lighter':
        return 'font-light';
      case 'normal':
        return 'font-medium';
      case 'bold':
        return 'font-bold';
      default:
        return '';
    }
  };

  return (
    <>
      <NextSeo
        title={`${title.title} - Imageyeti`}
        description={`Image we generated for ${title.title}, `}
        openGraph={{
          url: 'imageyeti.com',
          title: `${title.title + ' Image'} - Imageyeti`,
          description: `${title.title}`,
          site_name: 'Imageyeti',
        }}
      />
      <Container>
        <Modal
          open={showConfirmDeletionModal}
          onCancel={() => setShowConfirmDeletionModal(false)}
          footer={[
            <Button
              key="cancel"
              onClick={() => setShowConfirmDeletionModal(false)}>
              Cancel
            </Button>,
            <Button
              key="delete"
              danger
              type="primary"
              onClick={() => onDeleteConfirm()}>
              Delete
            </Button>,
          ]}
          title="Title deletion">
          You are about to delete this title, this action is irreversible and
          all associated images will be lost.
        </Modal>
        <div className="flex laptop:gap-14 small:gap-4 tablet:flex-row flex-col mb-10">
          <div className="mt-10 flex flex-col w-full mx-auto">
            <Row>
              <Col span={20} className="text-[24px] leading-[32px] font-bold">
                {title.title}
              </Col>
              <Col span={4}>
                <Row justify="end">
                  <Tooltip title="Delete this title">
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => setShowConfirmDeletionModal(true)}
                    />
                  </Tooltip>
                </Row>
              </Col>
            </Row>

            <div
              style={{
                backgroundImage: 'url(' + selectImage + ')',
                height: '20vh',
                width: '40vh',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
              className="relative bg-black mx-auto mt-10">
              {selectImage.search('_') > 0 && (
                <>
                  <div
                    style={{
                      textShadow: '2px 2px 4px #000000',
                      fontSize: (titleSize * convertVhToPx(20)) / 240 + 'px',
                      color: '#' + titleColor,
                      fontFamily: titleFont,
                    }}
                    className={`absolute drop-shadow-2xl ${
                      displayTitle ? 'block' : 'hidden'
                    } ${getTitlePositionClass(
                      titlePosition,
                    )} ${getTitleWeightClass(titleWeight)}`}>
                    {title.title}
                  </div>
                  <img
                    className={`w-1/6 m-5 absolute ${
                      displayLogo ? 'block' : 'hidden'
                    } ${getLogoPositionClass(logoPosition)}`}
                    src={title.logoUrl}
                  />
                </>
              )}
            </div>
            {title.image.length > 0 && !title.generatedUrls ? (
              <div className="mx-auto">
                <input
                  className="mt-2 bg-orange p-2 min-w-[70%] rounded-lg"
                  value={copy.value}
                  onChange={({ target: { value } }) =>
                    setCopy({ value, copied: false })
                  }
                />

                <CopyToClipboard
                  text={copy.value}
                  onCopy={() => setCopy({ value: copy.value, copied: true })}>
                  {copy.copied ? (
                    <button className="mt-2 ml-3 bg-green3 p-2 rounded-lg max-w-[500px]">
                      Copied
                    </button>
                  ) : (
                    <button className="mt-2 ml-3 bg-lime p-2 rounded-lg max-w-[500px]">
                      Copy
                    </button>
                  )}
                </CopyToClipboard>
              </div>
            ) : (
              <div>
                {' '}
                <div className="mx-auto mt-5">
                  <EditTitle
                    title={title}
                    onChange={handleEditTitleChange}></EditTitle>
                </div>
                <div className="mt-5 mx-auto">
                  <form
                    onSubmit={handleSubmit(async () => {
                      onEditSave();
                    })}>
                    <FormWrapper className="gap-x-14">
                      <FormSectionsWrapper>
                        <Button
                          htmlType="submit"
                          type="primary"
                          className="mx-auto"
                          loading={loadingSave}>
                          Save
                        </Button>
                      </FormSectionsWrapper>
                    </FormWrapper>
                  </form>
                </div>
              </div>
            )}
            {title.generatedUrls ? (
              <Row className="mt-5">
                {title.generatedUrls.length > 0 &&
                  JSON.parse(title.generatedUrls).map(
                    (imgSrc: string, index: number) => (
                      // eslint-disable-next-line react/jsx-key
                      <div
                        onClick={() => handleClick(index)}
                        className="w-[310px] h-[210px] bg-white rounded-lg mx-auto mt-3">
                        <LazyImage
                          key={index}
                          src={imgSrc}
                          className=""
                          iconClassName="w-[300px] h-[200px]"
                          alt=""
                        />
                      </div>
                    ),
                  )}
              </Row>
            ) : (
              <div></div>
            )}
            {!noMoreCredit ? (
              <Button
                type="primary"
                loading={loadingGeneration}
                className="mx-auto mt-3"
                onClick={onGenerateMore}>
                Generate more
              </Button>
            ) : (
              <Button type="primary" disabled={true} className="mx-auto mt-3">
                0 credits left
              </Button>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.query;
  const { token } = nookies.get(ctx);
  let title = null;

  try {
    title = await getTitleById(token, id as string);
  } catch (e) {
    return;
  }

  if (!title) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      title,
    },
  };
}
export default TitlePage;
