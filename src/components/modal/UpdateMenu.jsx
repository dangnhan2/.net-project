import { Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import MenuList from "../table/subtable/MenuList";
const UpdateMenu = (props) => {
  const [form] = Form.useForm();
  const { modalUpdate, setModalUpdate, dataRecord } = props;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleOk = () => {
    setModalUpdate(false);
  };

  const handleCancel = () => {
    setModalUpdate(false);
  };
  return (
    <Modal
    title="Edit Menu"
    open={modalUpdate}
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
            name="Name"
            rules={[
              {
                required: true,
                message: "Please input menu's name!",
              },
            ]}
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please choose status" }]}>
        <Select placeholder="Choose status">
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="Inactive">Inactive</Select.Option>
        </Select>
      </Form.Item>
        </Col>
      </Row>

        <Form.Item label="Note" name="note">
        <Input.TextArea placeholder="Enter description: (e.g. Omatsuri Manbo)" rows={4} />
      </Form.Item>
        
    </Form>
    <MenuList></MenuList>
  </Modal>
  );
};
export default UpdateMenu;
