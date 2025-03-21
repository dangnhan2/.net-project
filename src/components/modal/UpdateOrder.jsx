import { Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";

const UpdateOrder = (props) => {
  const [form] = Form.useForm();
  const { modalUpdate, setModalUpdate, dataRecord } = props;
  const [data, setData] = useState();
  console.log(dataRecord);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleOk = () => {
    setModalUpdate(false);
  };

  const handleCancel = () => {
    setModalUpdate(false);
  };

  useEffect(() => {
    const totalOfPrice = dataRecord?.dishList.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    const total_amount = dataRecord?.dishList.map((item) => {
      return {
        id: item.id,
        dish: item.dish,
        price: `$${item.price}`,
        quantity: item.quantity,
        total_amount: `$${item.price * item.quantity}`,
      };
    });
    if (dataRecord) {
      form.setFieldsValue({
        id: dataRecord?.id,
        customer: dataRecord?.customer,
        tags: dataRecord?.tags[0],
        total: totalOfPrice,
      });

      setData(total_amount);
    }
  }, [dataRecord]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "DISH",
      dataIndex: "dish",
      key: "dish",
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "TOTAL AMOUNT",
      dataIndex: "total_amount",
      key: "total_amount",
    },
  ];

  const render = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Order's Dish List</h2>
      </div>
    );
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
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {/* <OrderList></OrderList> */}
    </Modal>
  );
};
export default UpdateOrder;
