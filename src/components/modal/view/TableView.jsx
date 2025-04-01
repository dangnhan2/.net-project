import { Descriptions, Drawer } from "antd";
import { useEffect, useState } from "react";

const TableView = (props) => {
  const { modalView, setModalView, dataRecord } = props;
  const [status, setStatus] = useState();

  useEffect(() => {
    if (dataRecord) {
      if (dataRecord.status === 0) setStatus("On hold");
      if (dataRecord.status === 1) setStatus("Unavailable");
      if (dataRecord.status === 2) setStatus("Using");
      if (dataRecord.status === 3) setStatus("Empty");
    }
  }, [dataRecord]);

  const onClose = () => {
    setModalView(false);
  };

  return (
    <Drawer
      title="Table Details"
      open={modalView}
      onClose={onClose}
      width={800}
    >
      <Descriptions bordered>
        <Descriptions.Item label="ID" span={3}>
          {dataRecord?.id}
        </Descriptions.Item>
        <Descriptions.Item label="Number" span={2}>
          {dataRecord?.number}
        </Descriptions.Item>
        <Descriptions.Item label="Capacity" span={2}>
          {dataRecord?.capacity}
        </Descriptions.Item>
        <Descriptions.Item label="Location" span={2}>
          {dataRecord?.location}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
          {status}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};
export default TableView;
