import { Divider, Form, Input, Select, Button, Modal, App } from "antd";
import { useEffect, useState } from "react";
import { updateCustomer } from "../../api/api";

const UpdateCustomer = (props) => {
  const { message, notification } = App.useApp();
  const [form] = Form.useForm();
  const { modalUpdate, setModalUpdate, dataRecord, getCustomer } = props;
  const [gender, setGender] = useState();

  console.log(dataRecord);

  const onFinish = async (values) => {
    const { fullName, phoneNo, email, address, gender, notes } = values;
    let res = await updateCustomer(
      fullName,
      phoneNo,
      email,
      address,
      gender,
      notes
    );
    if (res) {
      message.success(res.message);
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
    form.resetFields();
  };

  useEffect(() => {
    if (dataRecord) {
      if (dataRecord.gender === 0) setGender("Male");
      if (dataRecord.gender === 1) setGender("Female");
      if (dataRecord.gender === 2) setGender("Other");

      form.setFieldsValue({
        id: dataRecord.id,
        fullName: dataRecord.fullName,
        phoneNo: dataRecord.phoneNo,
        email: dataRecord.email,
        address: dataRecord.address,
        gender: gender,
        note: dataRecord.note,
      });
    }
  }, [dataRecord]);

  return (
    <Modal
      title="Edit Customer"
      open={modalUpdate}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      // footer={null}
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
          name="gender"
          rules={[{ required: true, message: "Please choose gender!" }]}
        >
          <Select placeholder="Choose gender">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Note" name="note">
          <Input.TextArea />
        </Form.Item>

        {/* <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button onClick={handleCancel} style={{ backgroundColor: "red", color: "white" }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </div> */}
      </Form>
    </Modal>
  );
};
export default UpdateCustomer;
