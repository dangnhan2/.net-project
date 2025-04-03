import { Descriptions, Divider, Drawer, Table } from "antd";
import { useEffect, useState } from "react";

const MenuView = (props) => {
  const { modalView, setModalView, dataRecord } = props;
  const [status, setStatus] = useState();
  const [dishes, setDishes] = useState([]);

  console.log(dataRecord);

  useEffect(() => {
    if (dataRecord) {
      setStatus(dataRecord.status === 1 ? "Active" : "Inactive");
      setDishes(dataRecord.dishes);
    }
  }, [dataRecord]);
  console.log(dataRecord);

  const onClose = () => {
    setModalView(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (_, record) => (
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}images/${record.imgUrl}`}
          alt={record.name}
          style={{ width: 100 }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <Drawer
      title="Customer Details"
      open={modalView}
      onClose={onClose}
      width={800}
    >
      <Descriptions bordered>
        <Descriptions.Item label="ID" span={3}>
          {dataRecord?.id}
        </Descriptions.Item>
        <Descriptions.Item label="Name" span={2}>
          {dataRecord?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
          {status}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {dataRecord?.description}
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">Dish</Divider>
      <Table columns={columns} dataSource={dishes} pagination={false} />
    </Drawer>
  );
};
export default MenuView;
