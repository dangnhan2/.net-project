import { Col, Divider, Form, Input, InputNumber, Modal, Row } from "antd";

const SubAddIngredient = (props) => {
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

  const onChange = (value) => {
    console.log("changed", value);
  };

  const onChangePrice = (value) => {
    console.log("changed", value);
  };
  return (
    <Modal
      title="Add New Type"
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
        </Row>
      </Form>
    </Modal>
  );
};
export default SubAddIngredient;
