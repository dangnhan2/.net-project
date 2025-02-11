import { Button, Divider, Form, Input, Modal } from "antd";

const AddCustomer = (props) => {
  const { modalAdd, setModalAdd } = props;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleOk = () => {
    setModalAdd(false);
  };

  const handleCancel = () => {
    setModalAdd(false);
  };
  return (
    <Modal
      title="New Customer"
      open={modalAdd}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
    >
      <Divider></Divider>
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Full name"
          name="fullname"
          rules={[
            {
              required: true,
              message: "Please input your phone fullname!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCustomer;
