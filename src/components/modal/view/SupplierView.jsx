import { Descriptions, Drawer } from "antd";

const SupplierView = (props) => {
  const { modalView, setModalView, dataRecord } = props;
  console.log(dataRecord);

  const onClose = () => {
    setModalView(false);
  };

  return (
    <Drawer
      title="Supplier Details"
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
        <Descriptions.Item label="Email" span={2}>
          {dataRecord?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Phone Number" span={2}>
          {dataRecord?.phoneNo}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {dataRecord?.address}
        </Descriptions.Item>
        <Descriptions.Item label="Representative">
          {dataRecord?.representative}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};
export default SupplierView;
