import { App, Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import { addBill, getAllCustomer, getAllOrders } from "../../api/api";
import { useEffect, useState } from "react";

const AddBill = (props) => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { modalAdd, setModalAdd, getBills } = props;
  const [orders, setOrders] = useState();
  const [customers, setCustomers] = useState();
  const [allOrders, setAllOrders] = useState([]);

  console.log(customers);

  const onFinish = async (values) => {
    const { customerId, orderIds, description } = values;
    let res = await addBill(orderIds, customerId, description);
    if (res) {
      message.success("Action Succeed");
      setModalAdd(false);
      form.resetFields();
      getBills();
    }
    console.log(values);
  };

  const handleCancel = () => {
    setModalAdd(false);
    form.resetFields();
  };

  useEffect(() => {
    getOrders();
    getCustomers();
  }, []);

  const getOrders = async () => {
    let res = await getAllOrders();
    if (res && res.statusCode === 200) {
      let dataOrders = res.data
        .filter((order) => order.status === 1)
        .map((order) => {
          return {
            id: order.id,
            value: order.id,
            label: order.id,
            customerId: order.customerID,
          };
        });
      setAllOrders(dataOrders);
      setOrders(dataOrders);
    }
  };

  const getCustomers = async () => {
    let res = await getAllCustomer();
    if (res && res.statusCode === 200) {
      let dataCustomers = res.data.map((customer) => {
        return {
          value: customer.id,
          label: customer.fullName,
        };
      });
      setCustomers(dataCustomers);
    }
  };

  const handleCustomerChange = (customerId) => {
    const filteredOrders = allOrders.filter(
      (order) => order.customerId === customerId
    );
    setOrders(filteredOrders);
  };

  return (
    <Modal
      title="Add Bill"
      open={modalAdd}
      onCancel={handleCancel}
      onOk={() => {
        form.submit();
      }}
      width={600}
    >
      <Divider />
      <Form
        form={form}
        name="tableForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item
              label="Customer"
              name="customerId"
              rules={[{ required: true, message: "Please select customer!!" }]}
              style={{ flex: 1 }}
            >
              <Select options={customers} onChange={handleCustomerChange} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Order"
              name="orderIds"
              rules={[{ required: true, message: "Please select Orders!" }]}
              style={{ flex: 1 }}
            >
              <Select mode="multiple" style={{ flex: 1 }} options={orders} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please select table's location!!" },
              ]}
              style={{ flex: 1 }}
            >
              <Input.TextArea placeholder="Enter note: (e.g. VIP)" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddBill;
