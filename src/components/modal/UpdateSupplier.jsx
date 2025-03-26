import { App, Divider, Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { updateSupplier } from "../../api/api";
const UpdateSupplier = (props) => {
  const { message, notification } = App.useApp();
  const [form] = Form.useForm();
  const { modalUpdate, setModalUpdate, dataRecord, getSuppliers } = props;
  console.log(dataRecord);
  const onFinish = async (values) => {
    const { id, name, phoneNo, email, address, representative } = values;
    let res = await updateSupplier(
      id,
      name,
      phoneNo,
      address,
      representative,
      email
    );
    console.log(res);

    if (res && res.statusCode === 200) {
      message.success(res.message);
      getSuppliers();
      setModalUpdate(false);
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
    setModalUpdate(false);
  };

  useEffect(() => {
    if (dataRecord) {
      form.setFieldsValue({
        id: dataRecord.id,
        name: dataRecord.name,
        phoneNo: dataRecord.phoneNo,
        email: dataRecord.email,
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
      onOk={() => {
        form.submit();
      }}
      width={600}
    >
      <Divider />
      <Form
        name="supplierForm"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        autoComplete="off"
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Id" name="id" style={{ flex: 1 }} hidden>
            <Input />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter supplier's name!" },
            ]}
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

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Representative"
            name="representative"
            rules={[
              { required: true, message: "Please enter a representative!" },
            ]}
            style={{ flex: 1 }}
          >
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
export default UpdateSupplier;
