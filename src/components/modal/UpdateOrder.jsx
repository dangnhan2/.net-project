import { Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import OrderList from "../table/subtable/OrderList";
const UpdateOrder = (props) => {
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
      title="Edit Order"
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
              label="Customer"
              name="customer"
              rules={[
                {
                  required: true,
                  message: "Please input customer's name!",
                },
              ]}
            >
              <Input />
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
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[30, 30]}>
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
          <Col span={12}>
            <Form.Item
              label="Status"
              name="tag"
              rules={[
                {
                  required: true,
                  //   message: "Please input your address!",
                },
              ]}
            >
              <Select>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="rejected">Rejected</Select.Option>
                <Select.Option value="completed">Completed</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <OrderList></OrderList>
    </Modal>
  );
};
export default UpdateOrder;
