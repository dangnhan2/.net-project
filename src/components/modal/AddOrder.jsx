import {
  App,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import OrderList from "../table/subtable/OrderList";
import { addOrder, getAllCustomer, getAllTables } from "../../api/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/Context";
const AddOrder = (props) => {
  const [form] = Form.useForm();
  const { message, notification } = App.useApp();
  const { dishesOrder, setDishesOrder } = useContext(UserContext);

  const [tables, setTables] = useState([]);
  const [customers, setCustomers] = useState([]);
  const { modalAdd, setModalAdd, getOrders } = props;
  console.log(customers);

  const onFinish = async (values) => {
    const { customerID, tableID, status, total } = values;
    let res = await addOrder(
      tableID,
      customerID,
      status,
      Number(total),
      dishesOrder
    );

    if (res && res.statusCode === 201) {
      message.success(res.message);
      setModalAdd(false);
      getOrders();
      setDishesOrder([]);
      form.resetFields();
    } else {
      const errorMessage = Object.values(res).flat();
      notification.error({
        message: "Action Failed",
        description: errorMessage,
      });
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setDishesOrder([]);
    setModalAdd(false);
  };

  useEffect(() => {
    getTables();
    getCustomers();

    if (dishesOrder) {
      let totalAmount = dishesOrder
        .reduce((total, dish) => {
          return total + dish.totalAmount;
        }, 0)
        .toFixed(2);

      form.setFieldsValue({
        total: totalAmount,
      });
    }
  }, [dishesOrder]);

  const getTables = async () => {
    let res = await getAllTables();
    console.log(res);

    if (res && res.statusCode === 200) {
      setTables(res.data);
    }
  };

  const getCustomers = async () => {
    let res = await getAllCustomer();
    if (res && res.statusCode === 200) {
      setCustomers(res.data);
    }
  };

  return (
    <Modal
      title="Add New Order"
      open={modalAdd}
      onOk={() => {
        form.submit();
      }}
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
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item
              label="Customer"
              name="customerID"
              rules={[
                {
                  required: true,
                  message: "Please input customer's name!",
                },
              ]}
            >
              <Select placeholder="Choose table">
                {customers.map((customer) => {
                  return (
                    <Select.Option value={customer.id}>
                      {customer.fullName}
                    </Select.Option>
                  );
                })}
                ;
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Table"
              name="tableID"
              rules={[
                {
                  required: true,
                  message: "Please choose table!",
                },
              ]}
            >
              <Select placeholder="Choose table">
                {tables.map((table) => {
                  return table.status === 2 ? (
                    <Select.Option value={table.id}>
                      {table.number}
                    </Select.Option>
                  ) : (
                    ""
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please choose status!",
                },
              ]}
            >
              <Select placeholder="Choose role">
                <Select.Option value={0}>Pending</Select.Option>
                <Select.Option value={1}>Completed</Select.Option>
                <Select.Option value={2}>Rejected</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Total"
              name="total"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <OrderList></OrderList>
    </Modal>
  );
};
export default AddOrder;
