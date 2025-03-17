import { Divider, Form, Input, Modal, Select, Button } from "antd";

const AddCustomer = (props) => {
  const { modalAdd, setModalAdd } = props;

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleCancel = () => {
    setModalAdd(false);
  };

  return (
    <Modal
      title="Add New Customer"
      open={modalAdd}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Divider />
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
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
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
            rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}
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

        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Please choose gender!" }]}>
          <Select placeholder="Choose gender">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Note" name="note">
          <Input.TextArea placeholder="Enter note: (e.g. VIP)" rows={4} />
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

export default AddCustomer;
