import { TitleDto } from '@/types/dto/TitleDto';
import { List } from 'antd';
import router from 'next/router';
import React from 'react';
import Container from '../Container';
import LazyImage from '../LazyImage';

interface Props {
  userTitles: TitleDto[];
}

const UserTitles: React.FC<Props> = ({ userTitles }) => {
  return (
    <Container className="my-10">
      <List
        grid={{
          gutter: 30,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        pagination={{
          pageSize: 6,
        }}
        dataSource={userTitles}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            className="cursor-pointer"
            onClick={() => router.push('/title/' + item.id)}
            extra={
              <LazyImage
                iconClassName=""
                alt="logo"
                src={
                  item.image.length > 0
                    ? item.image
                    : item.generatedUrls.length > 0
                    ? JSON.parse(item.generatedUrls)[2]
                    : ''
                }
                className="w-[400px] h-[200px] rounded-sm object-contain object-left-top"
              />
            }>
            <List.Item.Meta className="title-list" title={item.title} />
          </List.Item>
        )}
      />
    </Container>
  );
};

export default UserTitles;
