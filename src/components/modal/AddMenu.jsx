import { Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import MenuList from "../table/subtable/MenuList";
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
      title="Add New Menu"
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
              name="Name"
              rules={[
                {
                  required: true,
                  message: "Please input menu's name!",
                },
              ]}
            >
              <Input placeholder="Enter name" />
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
export default AddMenu;
