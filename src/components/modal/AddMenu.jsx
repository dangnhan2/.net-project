import { Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import MenuList from "../table/subtable/MenuList";
const { TextArea } = Input;
const AddMenu = (props) => {
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
      title="New Order"
      open={modalAdd}
      onOk={handleOk}
      onCancel={handleCancel}
      width={700}
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
        <Row gutter={[30, 30]}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input  name!",
                },
              ]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Status"
              name="tags"
              rules={[
                {
                  required: true,
                  message: "Please choose the status!",
                },
              ]}
            >
              <Select placeholder="Choose the status">
                <Select.Option value="staff">Active</Select.Option>
                <Select.Option value="manage">In-Active</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: false,
                  //   message: "Please input your address!",
                },
              ]}
            >
              <TextArea rows={4} placeholder="" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <MenuList></MenuList>
    </Modal>
  );
};

export default AddMenu;
