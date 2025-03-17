import { Divider, Form, Input, Select, Button, Modal } from "antd";
import { useEffect } from "react";

const UpdateCustomer = (props) => {
  const [form] = Form.useForm();
  const { modalUpdate, setModalUpdate, dataRecord } = props;
  console.log(dataRecord);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleCancel = () => {
    setModalUpdate(false);
  };

  useEffect(() => {
    if (dataRecord) {
      form.setFieldsValue({
        id: dataRecord.id,
        phone: dataRecord.phone,
        address: dataRecord.address,
      });
    }
  }, [dataRecord]);

  return (
    <Modal
      title="Edit Customer"
      open={modalUpdate}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Divider></Divider>
      <Form
        name="customerForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[{ required: true, message: "Please enter full name!" }]}
            style={{ flex: 1 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
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
            rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
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

        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Please choose gender!" }]}>
          <Select placeholder="Choose gender">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Note" name="note">
          <Input.TextArea />
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button onClick={handleCancel} style={{ backgroundColor: "red", color: "white" }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
export default UpdateCustomer;
