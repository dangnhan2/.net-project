import { Descriptions, Divider, Drawer, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const IngredientView = (props) => {
  const { modalView, setModalView, dataRecord } = props;
  const [suppliers, setSuppliers] = useState();
  console.log(dataRecord);
  useEffect(() => {
    if (dataRecord) {
      setSuppliers(dataRecord.supplierName);
    }
  }, [dataRecord]);

  const onClose = () => {
    setModalView(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "supplierID",
      key: "supplierID",
    },
    {
      title: "Name",
      dataIndex: "supName",
      key: "supName",
      sorter: true,
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Transaction",
      dataIndex: "transaction",
      key: "transaction",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  return (
    <Drawer title="Dish Details" open={modalView} onClose={onClose} width={800}>
      <Descriptions bordered>
        <Descriptions.Item label="ID" span={3}>
          {dataRecord?.id}
        </Descriptions.Item>
        <Descriptions.Item label="Name" span={2}>
          {dataRecord?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Type" span={2}>
          {dataRecord?.unitType}
        </Descriptions.Item>
        <Descriptions.Item label="Price" span={2}>
          {dataRecord?.price}
        </Descriptions.Item>
        <Descriptions.Item label="Quantity" span={2}>
          {dataRecord?.quantity}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          {dataRecord?.description}
        </Descriptions.Item>
      </Descriptions>

      <Divider orientation="left">Supplier</Divider>
      <Table columns={columns} dataSource={suppliers} />
    </Drawer>
  );
};
export default IngredientView;
