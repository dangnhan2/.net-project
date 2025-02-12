import { Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import { useEffect } from "react";
const UpdateEmployee = (props) => {
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
        fullname: dataRecord.fullname,
        phone: dataRecord.phone,
        role: dataRecord.role,
        tag: dataRecord.tags[0],
      });
    }
  }, [dataRecord]);
  return (
    <Modal
      title="Update Employee"
      open={modalUpdate}
      onOk={handleOk}
      onCancel={handleCancel}
      width={700}
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
        <Row gutter={[30, 30]}>
          <Col span={12}>
            <Form.Item
              label="Full name"
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Please input your full name!",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
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
              <Input placeholder="Enter phone no" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Select placeholder="Choose role">
                <Select.Option value="staff">Staff</Select.Option>
                <Select.Option value="manage">Manage</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Status"
              name="tag"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Select placeholder="Choose status">
                <Select.Option value="working">Working</Select.Option>
                <Select.Option value="lay-off">Lay-off</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default UpdateEmployee;
