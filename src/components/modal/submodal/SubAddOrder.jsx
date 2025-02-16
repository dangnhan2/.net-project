import { Col, Divider, Form, Input, InputNumber, Modal, Row } from "antd";

const SubAddOrder = (props) => {
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
      title="Dish"
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
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input price!",
                },
              ]}
            >
              <InputNumber
                min={1}
                defaultValue={1}
                onChange={onChangePrice}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  //   message: "Please input your address!",
                },
              ]}
            >
              <InputNumber min={1} defaultValue={1} onChange={onChange} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default SubAddOrder;
