import { Divider, Form, Input, Modal, Button } from "antd";

const AddSupplier = (props) => {
  const { modalAdd, setModalAdd } = props;

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleCancel = () => {
    setModalAdd(false);
  };
  return (
    <Modal
      title="Add New Supplier"
      open={modalAdd}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Divider />
      <Form
        name="supplierForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter supplier's name!" }]}
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

        <div style={{ display: "flex", gap: "16px" }}>
        <Form.Item
            label="Representative"
            name="representative"
            rules={[{ required: true, message: "Please enter a representative!" }]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Enter representative" />
          </Form.Item>
        </div>

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
export default AddSupplier;
