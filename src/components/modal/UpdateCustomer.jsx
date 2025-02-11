import { Divider, Form, Input, Modal } from "antd";
import { useEffect } from "react";

const UpdateCustomer = (props) => {
  const [form] = Form.useForm();
  const { modalUpdate, setModalUpdate, dataRecord } = props;
  console.log(dataRecord);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleOk = () => {
    setModalUpdate(false);
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
      title="Update Customer"
      open={modalUpdate}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
    >
      <Divider></Divider>
      <Form
        form={form}
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
          hidden
          label="Id"
          name="id"
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
export default UpdateCustomer;
