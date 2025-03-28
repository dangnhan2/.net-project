import { Divider, Form, Input, Modal, Select, Button, App } from "antd";
import { addCustomer } from "../../api/api";
import { useState } from "react";

const AddCustomer = (props) => {
  const { message, notification, modal } = App.useApp();
  const { modalAdd, setModalAdd, getCustomer } = props;
  const [gender, setGender] = useState(null);
  const [form] = Form.useForm();
  console.log(gender);
  const handleGenderChange = (value) => {
    console.log(value);
    if (value === 0) setGender(0);

    if (value === 1) setGender(1);

    if (value === 2) setGender(2);
  };

  const onFinish = async (values) => {
    const { fullName, phoneNo, email, address, note } = values;
    let data = await addCustomer(
      fullName,
      phoneNo,
      email,
      address,
      gender,
      note
    );
    console.log(data);
    console.log(gender);

    if (data && data.statusCode === 201) {
      message.success(data.message);
      getCustomer();
      setModalAdd(false);

      form.resetFields();
    } else {
      var errorMessage = Object.values(data).flat().join("\n");
      notification.error({
        message: "Action failed",
        description: errorMessage,
        duration: 4,
      });
    }
  };

  const handleCancel = () => {
    setModalAdd(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Add New Customer"
      open={modalAdd}
      onCancel={handleCancel}
      onOk={() => {
        form.submit();
      }}
      width={600}
    >
      <Divider />
      <Form
        name="customerForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please enter full name!" }]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNo"
            rules={[{ required: true, message: "Please enter phone number!" }]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Enter phone" />
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
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter address!" }]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Enter address" />
          </Form.Item>
        </div>

        <Form.Item
          label="Gender"
          name="gen"
          rules={[{ required: true, message: "Please choose gender!" }]}
        >
          <Select
            placeholder="Choose gender"
            onChange={handleGenderChange}
            value={gender}
          >
            <Select.Option value={0}>Male</Select.Option>
            <Select.Option value={1}>Female</Select.Option>
            <Select.Option value={2}>Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Note" name="note">
          <Input.TextArea placeholder="Enter note: (e.g. VIP)" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCustomer;
