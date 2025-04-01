import { Descriptions, Divider, Drawer, Image } from "antd";
import { useState } from "react";

const DishView = (props) => {
  const { modalView, setModalView, dataRecord } = props;
  const thumbnail = `${import.meta.env.VITE_IMAGE_URL}/images/${
    dataRecord?.imageUrl
  }`;

  const onClose = () => {
    setModalView(false);
  };

  return (
    <Drawer title="Dish Details" open={modalView} onClose={onClose} width={800}>
      <Descriptions bordered>
        <Descriptions.Item label="ID" span={3}>
          {dataRecord?.id}
        </Descriptions.Item>
        <Descriptions.Item label="Name" span={2}>
          {dataRecord?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Price" span={2}>
          {dataRecord?.price}
        </Descriptions.Item>
        <Descriptions.Item label="Category" span={2}>
          {dataRecord?.category}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          {dataRecord?.description}
        </Descriptions.Item>
      </Descriptions>

      <Divider></Divider>
      <Image src={thumbnail} width={200} />
    </Drawer>
  );
};
export default DishView;
