import { Divider, Form, Input, Modal, Button } from "antd";
import { useEffect } from "react";
const UpdateSupplier = (props) => {
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
        name: dataRecord.name,
        phone: dataRecord.phone,
        address: dataRecord.address,
        representative: dataRecord.representative,
      });
    }
  }, [dataRecord]);

  return (
    <Modal
      title="Edit Supplier"
      open={modalUpdate}
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

        <div style={{ display: "flex", gap: "16px" }}>
        <Form.Item
            label="Representative"
            name="representative"
            rules={[{ required: true, message: "Please enter a representative!" }]}
            style={{ flex: 1 }}
          >
            <Input />
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
export default UpdateSupplier;
