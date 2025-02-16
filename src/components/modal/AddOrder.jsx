import { Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import OrderList from "../table/subtable/OrderList";
const AddOrder = (props) => {
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
              label="Customer"
              name="customer"
              rules={[
                {
                  required: true,
                  message: "Please input customer's name!",
                },
              ]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Table"
              name="table"
              rules={[
                {
                  required: true,
                  message: "Please input table!",
                },
              ]}
            >
              <Input placeholder="Enter table" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label="Total"
              name="total"
              rules={[
                {
                  required: true,
                  //   message: "Please input your address!",
                },
              ]}
            >
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <OrderList></OrderList>
    </Modal>
  );
};
export default AddOrder;
