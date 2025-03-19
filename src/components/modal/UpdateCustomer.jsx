import { Divider, Form, Input, Select, Button, Modal, App } from "antd";
import { useEffect, useState } from "react";
import { updateCustomer } from "../../api/api";

const UpdateCustomer = (props) => {
  const { message, notification } = App.useApp();
  const [form] = Form.useForm();
  const { modalUpdate, setModalUpdate, dataRecord, getCustomer } = props;
  const [genderChange, setGenderChange] = useState();
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

    if (res) {
      message.success("Cập nhật thành công");
      setModalUpdate(false);
      getCustomer();
      form.resetFields();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: "Cập nhật thất bại",
        duration: 3,
      });
    }
  };

  const handleCancel = () => {
    setModalUpdate(false);
  };

  const handleGenderChange = (value) => {
    const genderNumber =
      value === "Male"
        ? 0
        : value === "Female"
        ? 1
        : value === "Other"
        ? 2
        : null;

    setGenderChange(genderNumber);
  };

  useEffect(() => {
    if (dataRecord) {
      const genderString =
        dataRecord.gender === 0
          ? "Male"
          : dataRecord.gender === 1
          ? "Female"
          : dataRecord.gender === 2
          ? "Other"
          : undefined;

      form.setFieldsValue({
        id: dataRecord.id,
        fullName: dataRecord.fullName,
        phoneNo: dataRecord.phoneNo,
        email: dataRecord.email,
        address: dataRecord.address,
        gender: genderString,
        note: dataRecord.note,
      });

      setGenderChange(genderString);
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
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
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
