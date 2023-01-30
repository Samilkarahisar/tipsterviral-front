import { addSite, deleteSite, getSites } from '@/api/site';
import { addTitle, getTitles } from '@/api/title';
import { getUser } from '@/api/user';
import Container from '@/components/ui/Container';
import FormSection from '@/components/ui/FormSection';
import FormSectionsWrapper from '@/components/ui/FormSectionsWrapper';
import FormWrapper from '@/components/ui/FormWrapper';
import LoadingScreen from '@/components/ui/LoadingScreen';
import EditSiteModal from '@/components/ui/specific/EditSiteModal';
import UserTitles from '@/components/ui/specific/UserTitles';
import { auth } from '@/lib/firebase';
import { SiteDto } from '@/types/dto/SiteDto';
import { IFormSection } from '@/types/Form';
import {
  DeleteOutlined,
  DownOutlined,
  GlobalOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Col, Dropdown, Menu, Modal, Row, Tooltip } from 'antd';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
type FormItems = Omit<IFormSection, 'register'>;
const Dashboard = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [loadingTitles, setLoadingTitles] = useState(false);
  const [loadingGeneration, setLoadingGeneration] = useState(false);
  const [userWebsites, setUserWebsites] = useState<SiteDto[]>([]);
  const [selectedWebsite, setSelectedWebsite] = useState<SiteDto>();
  const [showAddWebsiteModal, setShowAddWebsiteModal] = useState(false);
  const [showLogoSizeTooLargeModal, setShowLogoSizeTooLargeModal] =
    useState(false);
  const [showEditWebsiteModal, setShowEditWebsiteModal] = useState(false);
  const [userCredit, setCredit] = useState(0);
  const [titleInputValue, setTitleInputValue] = useState('');
  const [userTitles, setUserTitles] = useState([]);

  const [showConfirmDeletionModal, setShowConfirmDeletionModal] =
    useState(false);
  const onDeleteConfirm = async (a: any) => {
    if (selectedWebsite) {
      console.log(a.id);
      const deleteRes = await deleteSite(a.id);
      if (deleteRes?.code === 200) {
        router.push('/dashboard');
      }
    }
  };
  const addSiteFormItems: FormItems = {
    title: 'Add a website',
    items: [
      {
        label: 'Site name',
        name: 'siteName',
        type: 'text',
        required: true,
        maxLength: 100,
        component: 'input',
      },
      {
        label: 'Logo',
        name: 'logoData',
        type: 'file',
        accept: 'image/*',
        required: true,
        maxLength: 100,
        component: 'input',
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      const data = await getSites();
      setCredit(user.creditsAmount);

      if (data?.code === 200 && data.res) {
        setUserWebsites(data.res);
        if (data.res.length > 0) {
          setSelectedWebsite(data.res[0]);

          const titles = await getTitles(data.res[0].id);
          if (titles?.code === 200 && titles.res) {
            setUserTitles(titles.res.reverse());
          }
        }
        setLoadingScreen(false);
      }
    };

    fetchData().catch(console.error);
  }, [user]);

  const onAddTitleConfirm = async () => {
    if (user && selectedWebsite && titleInputValue != '') {
      setLoadingGeneration(true);
      const createTitleDto = {
        siteId: selectedWebsite.id,
        title: titleInputValue,
      };

      const titleResult = await addTitle(createTitleDto);
      if (titleResult.status == 'success') {
        console.log(titleResult);
        router.push('/title/' + titleResult.id);
      } else if (titleResult.status == 'noCreditLeft') {
        setLoadingGeneration(false);
      }
    }
  };

  const getWebsites = async () => {
    try {
      const data = await getSites();
      if (data?.code === 200) {
        setUserWebsites(data.res || []);
      }
    } catch (err: any) {
      if (err?.toString().includes('403')) {
        alert('Session timed out');
      }
    }
  };

  return (
    <>
      <NextSeo
        title={`Imageyeti - Dashboard`}
        description={'Type your title and generate your images'}
      />
      <Modal
        open={showLogoSizeTooLargeModal}
        onOk={() => setShowLogoSizeTooLargeModal(false)}
        onCancel={() => setShowLogoSizeTooLargeModal(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        title="Logo size too large">
        <div>Please use an image with a size under 1Mo.</div>
      </Modal>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (userWebsites && userWebsites.length == 0) || !selectedWebsite ? (
        <Container className="mt-10">
          <div className="mt-2 bg-green2 p-2 rounded-lg max-w-[500px]">
            <b>You don&apos;t have any website registered yet!</b>
            <label className="block">
              To start using Imageyeti, please add a website to your profile, it
              will be useful to find your different content and corresponding
              images in the future.
            </label>
          </div>
          <form
            className="mt-10"
            onSubmit={handleSubmit(async (values) => {
              if (user) {
                const response = await addSite(
                  values.siteName,
                  values.logoData[0],
                );
                if (response.code == 409) {
                  setShowLogoSizeTooLargeModal(true);
                } else if (response.site) setSelectedWebsite(response.site);
              }

              getWebsites();
            })}>
            <FormWrapper className="gap-x-14">
              <FormSectionsWrapper>
                <FormSection {...addSiteFormItems} register={register} />
                <Button
                  htmlType="submit"
                  type="primary"
                  className="mt-6 max-w-[150px]">
                  Add
                </Button>
              </FormSectionsWrapper>
            </FormWrapper>
          </form>
        </Container>
      ) : (
        <Container className="mt-10">
          <Modal
            open={showAddWebsiteModal}
            onOk={handleSubmit(async (values) => {
              if (user) {
                const response = await addSite(
                  values.siteName,
                  values.logoData[0],
                );
                if (response.code == 409) {
                  setShowLogoSizeTooLargeModal(true);
                } else if (response.site) {
                  setSelectedWebsite(response.site);

                  getWebsites();

                  setShowAddWebsiteModal(false);

                  setLoadingTitles(true);
                  const titles = await getTitles(response.site.id);
                  if (titles?.code === 200 && titles.res) {
                    setLoadingTitles(false);
                    setUserTitles(titles.res.reverse());
                  }
                }
              }
            })}
            okText="Confirm"
            onCancel={() => setShowAddWebsiteModal(false)}
            destroyOnClose={true}
            title="Add a new website">
            <FormSection {...addSiteFormItems} register={register} />
          </Modal>
          {showEditWebsiteModal && (
            <EditSiteModal
              site={selectedWebsite}
              visible={showEditWebsiteModal}
              onClose={() => setShowEditWebsiteModal(false)}></EditSiteModal>
          )}
          <Row>
            <Dropdown
              className="w-[300px]"
              overlay={
                <Menu>
                  {userWebsites.map((site) => (
                    <Menu.Item
                      key={site.id}
                      onClick={async () => {
                        setLoadingTitles(true);
                        setSelectedWebsite(site);
                        const titles = await getTitles(site.id);
                        if (titles?.code === 200 && titles.res) {
                          setLoadingTitles(false);
                          setUserTitles(titles.res.reverse());
                        }
                      }}>
                      {site.siteName}
                    </Menu.Item>
                  ))}
                </Menu>
              }>
              <Button>
                <Row>
                  <Col span={12} className="text-left">
                    {selectedWebsite.siteName}
                  </Col>
                  <Col span={12} className="text-right">
                    <DownOutlined />
                  </Col>
                </Row>
              </Button>
            </Dropdown>
            <Tooltip title="Add a new website">
              <Button
                icon={<PlusOutlined />}
                onClick={() => {
                  setShowAddWebsiteModal(true);
                }}
              />
            </Tooltip>
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
                  onClick={() => onDeleteConfirm(selectedWebsite)}>
                  Delete
                </Button>,
              ]}
              title="Website deletion">
              You are about to delete the selected website, this action is
              irreversible and all title and associated images will be lost.
            </Modal>
            <Tooltip title="Delete website">
              <Button
                icon={<DeleteOutlined />}
                onClick={() => {
                  setShowConfirmDeletionModal(true);
                }}
              />
            </Tooltip>
          </Row>
          <form
            className="mt-10 relative w-[300px] sm:w-[400px] h-[50px]"
            onSubmit={handleSubmit(async () => {
              if (userCredit <= 0) {
                router.push('/pricing');
              } else {
                onAddTitleConfirm();
              }
            })}>
            <input
              className=" border-gray-2 border-1 block font-bold w-full h-full mx-auto pl-4 pr-[120px] rounded-2xl bg-secondary border-transparent border focus:border-black hover:border-black dark:bg-dark-secondary  text-black"
              id="contentTitle"
              type="text"
              placeholder="Title"
              onChange={(e) => {
                setTitleInputValue(e.target.value);
              }}
            />
            {userCredit > 0 ? (
              <Button
                loading={loadingGeneration}
                htmlType="submit"
                type="primary"
                shape="round"
                style={{ position: 'absolute' }}
                className="right-[10px] top-[10px] block">
                Generate
              </Button>
            ) : (
              <Button
                disabled={true}
                type="primary"
                shape="round"
                style={{ position: 'absolute' }}
                className="right-[10px] top-[10px] block">
                0 credits left
              </Button>
            )}

            <div className="float-left ml-1">
              <Tooltip title="🇺🇸 🇫🇷 🇪🇸 🇹🇷 🇧🇷 100+ langs supported">
                <GlobalOutlined />
              </Tooltip>
            </div>
            <div className="float-right mr-1">Credits left: {userCredit}</div>
          </form>
          {loadingTitles ? (
            <LoadingScreen />
          ) : (
            <UserTitles userTitles={userTitles} />
          )}
        </Container>
      )}
    </>
  );
};

export default Dashboard;
