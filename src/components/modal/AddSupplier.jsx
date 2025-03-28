import { Divider, Form, Input, Modal, App } from "antd";
import { addSupplier } from "../../api/api";

const AddSupplier = (props) => {
  const { message, notification } = App.useApp();
  const [form] = Form.useForm();
  const { modalAdd, setModalAdd, getSuppliers } = props;

  const onFinish = async (values) => {
    const { name, phoneNo, email, address, representative } = values;
    let res = await addSupplier(name, phoneNo, address, representative, email);
    console.log(res);

    if (res && res.statusCode === 201) {
      message.success(res.message);
      getSuppliers();
      setModalAdd(false);
      form.resetFields();
    } else {
      const errorMessage = Object.values(res).flat();
      notification.error({
        message: "Action Failed",
        description: errorMessage,
        duration: 3,
      });
    }
  };

  const handleCancel = () => {
    setModalAdd(false);
  };
  return (
    <Modal
      title="Add New Supplier"
      open={modalAdd}
      onCancel={handleCancel}
      onOk={() => {
        form.submit();
      }}
      width={600}
    >
      <Divider />
      <Form
        form={form}
        name="supplierForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter supplier's name!" },
            ]}
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

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Representative"
            name="representative"
            rules={[
              { required: true, message: "Please enter a representative!" },
            ]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Enter representative" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
export default AddSupplier;
