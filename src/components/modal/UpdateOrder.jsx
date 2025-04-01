import { App, Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { getAllCustomer, getAllTables, updateOrder } from "../../api/api";
import { UserContext } from "../../context/Context";
import OrderListView from "../table/subtable/OrderListView";

const UpdateOrder = (props) => {
  const [form] = Form.useForm();
  const { message, notification } = App.useApp();
  const { dishesOrder, setDishesOrder } = useContext(UserContext);
  const { modalUpdate, setModalUpdate, dataRecord, getOrders } = props;
  const [tables, setTables] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [statusChanging, setStatus] = useState();

  console.log(statusChanging);

  const onFinish = async (values) => {
    const { id, customerID, tableID, total } = values;

    let res = await updateOrder(id, statusChanging);

    if (res && res.statusCode === 200) {
      message.success(res.message);
      setModalUpdate(false);
      getOrders();
    } else {
      let message = Object.values(res.message).flat();
      notification.error({
        message: "Action failed",
        description: message,
        duration: 3,
      });
    }
    console.log("Success:", values);
  };

  const handleCancel = () => {
    setModalUpdate(false);
  };

  const handleStatus = (e) => {
    setStatus(e);
  };

  useEffect(() => {
    if (dataRecord) {
      let status = "";
      status =
        dataRecord?.status === 0
          ? (status = "Pending")
          : dataRecord?.status === 1
          ? (status = "Completed")
          : (status = "Rejected");
      form.setFieldsValue({
        id: dataRecord?.id,
        customerID: dataRecord?.customerID,
        tableID: dataRecord?.tableNumber,
        status: status,
        total: dataRecord?.total,
      });

      setDishesOrder(dataRecord?.orderDishes);
    }
  }, [dataRecord]);

  return (
    <Modal
      title="Update Order"
      open={modalUpdate}
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
        <Form.Item
          hidden
          label="Id"
          name="id"
          rules={[
            {
              required: true,
              message: "Please input customer's name!",
            },
          ]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Row gutter={[30, 30]}>
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
              <Input readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Table"
              name="tableID"
              rules={[
                {
                  required: true,
                  message: "Please input table!",
                },
              ]}
            >
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[30, 30]}>
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
              <Select
                placeholder="Choose status"
                value={statusChanging}
                onChange={handleStatus}
              >
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
              <Input readOnly />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <OrderListView></OrderListView>
    </Modal>
  );
};
export default UpdateOrder;
