import { Descriptions, Divider, Drawer, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const OrderView = (props) => {
  const { modalView, setModalView, dataRecord } = props;
  console.log(dataRecord);
  const [status, setStatus] = useState();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    if (dataRecord) {
      setStatus(
        dataRecord.status === 0
          ? "Pending"
          : dataRecord.status === 1
          ? "Completed"
          : dataRecord.status === 2
          ? "Rejected"
          : "Billed"
      );
      setDishes(dataRecord.orderDishes);
    }
  }, [dataRecord]);

  const onClose = () => {
    setModalView(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "dishID",
      key: "dishID",
    },
    {
      title: "Dish",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "TotalAmount",
      dataIndex: "totalAmount",
      key: "totalAmount",
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
        <Descriptions.Item label="Customer" span={2}>
          {dataRecord?.customerName}
        </Descriptions.Item>
        <Descriptions.Item label="Table" span={2}>
          {dataRecord?.tableNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Total">{dataRecord?.total}</Descriptions.Item>
        <Descriptions.Item label="Booking Time">
          {dayjs(dataRecord?.bookingTime).format("YYYY-MM-DD HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="Status">{status}</Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">Dish</Divider>
      <Table columns={columns} dataSource={dishes} pagination={false} />
    </Drawer>
  );
};
export default OrderView;
