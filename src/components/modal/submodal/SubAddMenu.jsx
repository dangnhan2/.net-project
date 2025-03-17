import { Col, Divider, Form, Input, Modal, Row } from "antd";

const SubAddMenu = (props) => {
  const { openSubModal, setOpenSubModal } = props;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleOk = () => {
    setOpenSubModal(false);
  };

  const handleCancel = () => {
    setOpenSubModal(false);
  };

  return (
    <Modal
      title="Add dish to menu"
      open={openSubModal}
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
                  message: "Please input name!",
                },
              ]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Please input discount!",
                },
              ]}
            >
              <Input placeholder="Enter discount" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default SubAddMenu;
