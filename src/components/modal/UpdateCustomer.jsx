import { Divider, Form, Input, Select, Button, Modal, App } from "antd";
import { useEffect, useState } from "react";
import { updateCustomer } from "../../api/api";

const UpdateCustomer = (props) => {
  const { message, notification } = App.useApp();
  const [form] = Form.useForm();
  const { modalUpdate, setModalUpdate, dataRecord, getCustomer } = props;
  const [genderChange, setGender] = useState();
  console.log(dataRecord);

  const onFinish = async (values) => {
    const { id, fullName, phoneNo, email, address, note } = values;
    let res = await updateCustomer(
      id,
      fullName,
      phoneNo,
      email,
      address,
      genderChange,
      note
    );

    if (res && res.statusCode === 200) {
      message.success("Action succeed");
      setModalUpdate(false);
      getCustomer();
    } else {
      const message = Object.values(res.message).flat();
      notification.error({
        message: "Action failed",
        description: message,
        duration: 3,
      });
    }
  };

  const handleCancel = () => {
    setModalUpdate(false);
  };

  const handleGenderChange = (value) => {
    if (value === 0) setGender(0);

    if (value === 1) setGender(1);

    if (value === 2) setGender(2);
  };

  useEffect(() => {
    if (dataRecord) {
      let gender = "";
      if (dataRecord.gender === 0) gender = "Male";
      if (dataRecord.gender === 1) gender = "Female";
      if (dataRecord.gender === 2) gender = "Other";

      form.setFieldsValue({
        id: dataRecord.id,
        fullName: dataRecord.fullName,
        phoneNo: dataRecord.phoneNo,
        email: dataRecord.email,
        address: dataRecord.address,
        gender: gender,
        note: dataRecord.note,
      });
    }
  }, [dataRecord]);

  return (
    <Modal
      title="Edit Customer"
      open={modalUpdate}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      width={600}
    >
      <Divider></Divider>
      <Form
        form={form}
        name="customerForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Id" name="id" style={{ flex: 1 }} hidden={true}>
          <Input />
        </Form.Item>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter full name!" }]}
            style={{ flex: 1 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNo"
            rules={[{ required: true, message: "Please enter phone number!" }]}
            style={{ flex: 1 }}
          >
            <Input />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
            style={{ flex: 1 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter address!" }]}
            style={{ flex: 1 }}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item
          label="Gender"
          rules={[{ required: true, message: "Please choose gender!" }]}
          name="gender"
        >
          <Select
            placeholder="Choose gender"
            value={genderChange}
            onChange={handleGenderChange}
          >
            <Select.Option value={0}>Male</Select.Option>
            <Select.Option value={1}>Female</Select.Option>
            <Select.Option value={2}>Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Note" name="note">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateCustomer;
