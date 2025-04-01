import { Descriptions, Drawer } from "antd";
import { useEffect, useState } from "react";

const EmployeeView = (props) => {
  const { modalView, setModalView, dataRecord } = props;
  console.log(dataRecord);

  const [status, setStatus] = useState();
  const [gender, setGender] = useState();
  console.log(status);

  console.log(gender);

  useEffect(() => {
    if (dataRecord) {
      dataRecord.status === 0 ? setStatus("Working") : setStatus("Lay-off");

      dataRecord.gender === 0
        ? setGender("Male")
        : dataRecord.gender === 1
        ? setGender("Female")
        : setGender("Other");
    }
  }, [dataRecord]);

  const onClose = () => {
    setModalView(false);
  };

  return (
    <Drawer
      title="Employee Details"
      open={modalView}
      onClose={onClose}
      width={800}
    >
      <Descriptions bordered>
        <Descriptions.Item label="ID" span={3}>
          {dataRecord?.id}
        </Descriptions.Item>
        <Descriptions.Item label="Name" span={2}>
          {dataRecord?.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Phone" span={2}>
          {dataRecord?.phoneNo}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>
          {dataRecord?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {dataRecord?.address}
        </Descriptions.Item>
        <Descriptions.Item label="Role" span={2}>
          {dataRecord?.role}
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
          {status}
        </Descriptions.Item>
        <Descriptions.Item label="Gender" span={2}>
          {gender}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};
export default EmployeeView;
