import { deleteSite } from '@/api/site';
import { font, logoPositions, titlePositions, weight } from '@/res/values';
import { SiteDto } from '@/types/dto/SiteDto';
import {
  BgColorsOutlined,
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Dropdown,
  Input,
  InputNumber,
  Menu,
  Modal,
  Row,
  Slider,
  Switch,
  Tooltip,
  Upload,
} from 'antd';
import router from 'next/router';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import LazyImage from '../LazyImage';

interface Props {
  site: SiteDto;
  visible: boolean;
  onClose: () => void;
}

const EditSiteModal: React.FC<Props> = ({ visible, site, onClose }) => {
  const [siteName, setSiteName] = useState(site.siteName);
  const [logo, setLogo] = useState<Blob>();
  const [isEditingLogo, setIsEditingLogo] = useState(false);
  const [displayLogo, setDisplayLogo] = useState(site.defaultDisplayLogo);
  const [logoPosition, setLogoPosition] = useState(site.defaultLogoPosition);
  const [displayTitle, setDisplayTitle] = useState(site.defaultDisplayTitle);
  const [titlePosition, setTitlePosition] = useState(site.defaultTitlePosition);
  const [titleFont, setTitleFont] = useState(site.defaultTitleFont);
  const [fontWeight, setFontWeight] = useState(site.defaultFontWeight);
  const [showConfirmDeletionModal, setShowConfirmDeletionModal] =
    useState(false);
  const [fontSize, setFontSize] = useState(site.defaultFontSize);
  const [fontColor, setFontColor] = useState(site.defaultFontColor);
  const [isPickingColor, setIsPickingColor] = useState(false);

  const onConfirm = () => {
    alert('update');
    const newSite = site;
    //la gestion de l'upload du logo est compliqué à voir.
    newSite.defaultDisplayLogo = displayLogo;
    newSite.defaultDisplayTitle = displayTitle;
    newSite.defaultFontColor = fontColor;
    newSite.defaultFontSize = fontSize;
    newSite.defaultFontWeight = fontWeight;
    newSite.defaultLogoPosition = logoPosition;
    newSite.defaultTitleFont = titleFont;
    newSite.defaultTitlePosition = titlePosition;

    onClose();
  };

  const onDeleteConfirm = async () => {
    const deleteRes = await deleteSite(site.id);
    if (deleteRes?.code === 200) {
      router.push('/dashboard');
    }
  };

  const onLogoUpload = (file: Blob) => {
    setLogo(file);
  };

  const onRemoveLogo = () => {
    setLogo(undefined);
  };

  return (
    <Modal
      open={visible}
      onOk={() => onConfirm()}
      okText="Confirm"
      onCancel={() => onClose()}
      destroyOnClose={true}
      title="Configure your website">
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
        title="Website deletion">
        You are about to delete the selected website, this action is
        irreversible and all title and associated images will be lost.
      </Modal>
      <div className="mb-3">
        <Input
          type="text"
          placeholder="Site name"
          defaultValue={siteName}
          onChange={(e) => {
            setSiteName(e.target.value);
          }}
        />
      </div>
      {!isEditingLogo ? (
        <Row>
          <LazyImage
            src={site.defaultLogoUrl}
            alt={'logo'}
            iconClassName={''}
            className={'w-[40px] h-[40px] rounded-sm'}></LazyImage>
          <Tooltip title="Edit logo">
            <Button
              className="self-center ml-2"
              icon={<EditOutlined />}
              onClick={() => {
                setIsEditingLogo(true);
              }}></Button>
          </Tooltip>
        </Row>
      ) : (
        <Row>
          <Upload
            listType="picture"
            beforeUpload={onLogoUpload}
            onRemove={onRemoveLogo}
            maxCount={1}
            accept=".svg,.png,.jpeg,.jpg">
            <Button icon={<UploadOutlined />}>Upload your logo</Button>
          </Upload>
          {logo ? (
            ''
          ) : (
            <Tooltip title="Cancel">
              <Button
                className="self-center ml-2"
                icon={<CloseOutlined />}
                onClick={() => {
                  setIsEditingLogo(false);
                }}></Button>
            </Tooltip>
          )}
        </Row>
      )}
      <h1 className="mt-6 mb-3">Default parameters</h1>
      <Row className="mb-3">
        <label className="w-[100px] self-center mr-2">Display logo</label>
        <Switch
          checked={displayLogo}
          onChange={(checked) => setDisplayLogo(checked)}
        />
      </Row>
      {displayLogo && (
        <Row className="mb-6">
          <label className="w-[100px] self-center">Logo position</label>
          <Dropdown
            className="w-[200px] ml-2"
            overlay={
              <Menu>
                {logoPositions.map((p) => (
                  <Menu.Item key={p} onClick={() => setLogoPosition(p)}>
                    {p}
                  </Menu.Item>
                ))}
              </Menu>
            }>
            <Button>
              <Row>
                <Col span={12} className="text-left">
                  {logoPosition}
                </Col>
                <Col span={12} className="text-right">
                  <DownOutlined />
                </Col>
              </Row>
            </Button>
          </Dropdown>
        </Row>
      )}
      <Row className="mb-3">
        <label className="w-[100px] self-center mr-2">Display title</label>
        <Switch
          checked={displayTitle}
          onChange={(checked) => setDisplayTitle(checked)}
        />
      </Row>
      {displayTitle && (
        <>
          <Row className="mb-3">
            <label className="w-[100px] self-center">Title position</label>
            <Dropdown
              className="w-[200px] ml-2"
              overlay={
                <Menu>
                  {titlePositions.map((p) => (
                    <Menu.Item key={p} onClick={() => setTitlePosition(p)}>
                      {p}
                    </Menu.Item>
                  ))}
                </Menu>
              }>
              <Button>
                <Row>
                  <Col span={12} className="text-left">
                    {titlePosition}
                  </Col>
                  <Col span={12} className="text-right">
                    <DownOutlined />
                  </Col>
                </Row>
              </Button>
            </Dropdown>
          </Row>
          <Row className="mb-3">
            <label className="w-[100px] self-center">Title font</label>
            <Dropdown
              className="w-[200px] ml-2"
              overlay={
                <Menu>
                  {font.map((f) => (
                    <Menu.Item key={f} onClick={() => setTitleFont(f)}>
                      {f}
                    </Menu.Item>
                  ))}
                </Menu>
              }>
              <Button>
                <Row>
                  <Col span={12} className="text-left">
                    {titleFont}
                  </Col>
                  <Col span={12} className="text-right">
                    <DownOutlined />
                  </Col>
                </Row>
              </Button>
            </Dropdown>
          </Row>
          <Row className="mb-3">
            <label className="w-[100px] self-center">Font weight</label>
            <Dropdown
              className="w-[200px] ml-2"
              overlay={
                <Menu>
                  {weight.map((w) => (
                    <Menu.Item key={w} onClick={() => setFontWeight(w)}>
                      {w}
                    </Menu.Item>
                  ))}
                </Menu>
              }>
              <Button>
                <Row>
                  <Col span={12} className="text-left">
                    {fontWeight}
                  </Col>
                  <Col span={12} className="text-right">
                    <DownOutlined />
                  </Col>
                </Row>
              </Button>
            </Dropdown>
          </Row>
          <Row className="mb-3">
            <label className="w-[100px] self-center">Font size</label>
            <Row className="w-[200px]">
              <Col span={12}>
                <Slider
                  min={1}
                  max={50}
                  onChange={(e) => setFontSize(e)}
                  value={fontSize}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={1}
                  max={50}
                  style={{
                    margin: '0 16px',
                  }}
                  value={fontSize}
                  onChange={(e) => setFontSize(e)}
                />
              </Col>
            </Row>
          </Row>
          <Row className="mb-3">
            <label className="w-[100px] self-center">Font Color</label>
            <Row className="w-[210px]">
              <Col span={18}>
                <Input
                  type="text"
                  value={fontColor}
                  onChange={(e) => {
                    setFontColor(e.target.value);
                  }}
                />
              </Col>
              <Col span={4} offset={2} className="relative">
                <Tooltip title="Color picker">
                  <Button
                    icon={<BgColorsOutlined />}
                    onClick={() => setIsPickingColor(!isPickingColor)}
                  />
                </Tooltip>
                {isPickingColor && (
                  <div className="absolute z-10 top-[-310px] left-[-190px]">
                    <SketchPicker
                      color={fontColor}
                      onChangeComplete={(e: any) => setFontColor(e.hex)}
                    />
                  </div>
                )}
              </Col>
            </Row>
          </Row>
        </>
      )}
      <Row justify="end" className="mt-6">
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => setShowConfirmDeletionModal(true)}>
          Delete this website
        </Button>
      </Row>
    </Modal>
  );
};

export default EditSiteModal;
