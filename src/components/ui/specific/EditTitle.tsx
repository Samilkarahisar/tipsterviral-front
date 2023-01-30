import { logoPositions, titlePositions, weight } from '@/res/values';
import { TitleDto } from '@/types/dto/TitleDto';
import { BgColorsOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Input, Menu, Row, Switch, Tooltip } from 'antd';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

interface Props {
  title: TitleDto;
  onChange: (
    displayLogo: boolean,
    logoPosition: string,
    displayTitle: boolean,
    titlePosition: string,
    titleFont: string,
    titleWeight: string,
    titleSize: number,
    titleColor: string,
  ) => void;
}

const EditTitle: React.FC<Props> = ({ title, onChange }) => {
  const [displayLogo, setDisplayLogo] = useState(title.displayLogo);
  const [logoPosition, setLogoPosition] = useState(title.logoPosition);
  const [displayTitle, setDisplayTitle] = useState(title.displayTitle);
  const [titlePosition, setTitlePosition] = useState(title.titlePosition);
  const [titleFont, setTitleFont] = useState(title.titleFont);
  const [titleWeight, setTitleWeight] = useState(title.titleWeight);
  const [titleSize, setTitleSize] = useState(title.titleSize);
  const [titleColor, setTitleColor] = useState(title.titleColor);
  const [isPickingColor, setIsPickingColor] = useState(false);

  return (
    <div>
      <Row className="mb-3">
        <label className="w-[100px] self-center mr-2">Display logo</label>
        <Switch
          checked={displayLogo}
          onChange={(checked) => {
            setDisplayLogo(checked);
            onChange(
              displayLogo,
              logoPosition,
              displayTitle,
              titlePosition,
              titleFont,
              titleWeight,
              titleSize,
              titleColor,
            );
          }}
        />
      </Row>
      <Row className="mb-6">
        <label className="w-[100px] self-center">Logo position</label>
        <Dropdown
          className="w-[200px] ml-2"
          overlay={
            <Menu
              onAnimationEnd={onChange(
                displayLogo,
                logoPosition,
                displayTitle,
                titlePosition,
                titleFont,
                titleWeight,
                titleSize,
                titleColor,
              )}>
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
      <Row className="mb-3">
        <label className="w-[100px] self-center mr-2">Display title</label>
        <Switch
          checked={displayTitle}
          onChange={(checked) => {
            setDisplayTitle(checked);
            onChange(
              displayLogo,
              logoPosition,
              displayTitle,
              titlePosition,
              titleFont,
              titleWeight,
              titleSize,
              titleColor,
            );
          }}
        />
      </Row>
      <Row className="mb-3">
        <label className="w-[100px] self-center">Title position</label>
        <Dropdown
          className="w-[200px] ml-2"
          overlay={
            <Menu
              onAnimationEnd={onChange(
                displayLogo,
                logoPosition,
                displayTitle,
                titlePosition,
                titleFont,
                titleWeight,
                titleSize,
                titleColor,
              )}>
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
        <label className="w-[100px] self-center">Font weight</label>
        <Dropdown
          className="w-[200px] ml-2"
          overlay={
            <Menu
              onAnimationEnd={onChange(
                displayLogo,
                logoPosition,
                displayTitle,
                titlePosition,
                titleFont,
                titleWeight,
                titleSize,
                titleColor,
              )}>
              {weight.map((w) => (
                <Menu.Item key={w} onClick={() => setTitleWeight(w)}>
                  {w}
                </Menu.Item>
              ))}
            </Menu>
          }>
          <Button>
            <Row>
              <Col span={12} className="text-left">
                {titleWeight}
              </Col>
              <Col span={12} className="text-right">
                <DownOutlined />
              </Col>
            </Row>
          </Button>
        </Dropdown>
      </Row>

      <Row className="mb-3">
        <label className="w-[100px] self-center">Font Color</label>
        <Row className="w-[210px]">
          <Col span={18}>
            <Input
              type="text"
              value={'#' + titleColor}
              onChange={(e) => {
                setTitleColor(e.target.value.substring(1));
                onChange(
                  displayLogo,
                  logoPosition,
                  displayTitle,
                  titlePosition,
                  titleFont,
                  titleWeight,
                  titleSize,
                  titleColor,
                );
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
                  color={titleColor}
                  onChangeComplete={(e: any) => {
                    setTitleColor(e.hex.substring(1));
                    onChange(
                      displayLogo,
                      logoPosition,
                      displayTitle,
                      titlePosition,
                      titleFont,
                      titleWeight,
                      titleSize,
                      titleColor,
                    );
                  }}
                />
              </div>
            )}
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default EditTitle;
