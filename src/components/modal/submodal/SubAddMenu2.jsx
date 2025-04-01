import { App, Col, Divider, Form, Modal, Row, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { getAllDishes } from "../../../api/api";
import { InputNumber } from "antd";
import { UserContext } from "../../../context/Context";
const SubAddMenu2 = (props) => {
  const { dishes, setDishes } = useContext(UserContext);

  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { openSubModal, setOpenSubModal } = props;
  const [data, setData] = useState();

  const onFinish = (values) => {
    const { name, discount } = values;
    let data = {
      name,
      discount,
    };

    let parseName = JSON.parse(data.name);
    var dish = {
      id: parseName.id,
      imgUrl: parseName.imageUrl,
      name: parseName.name,
      discount: discount,
      price: parseName.price - parseName.price * discount,
    };

    setDishes([...dishes, dish]);
    setOpenSubModal(false);
    message.success("Action Succeed");
    form.resetFields();
  };

  useEffect(() => {
    getDishes();
  }, []);

  const getDishes = async () => {
    let res = await getAllDishes();
    if (res && res.statusCode === 200) {
      setData(res.data);
    }
  };

  const handleCancel = () => {
    setOpenSubModal(false);
    form.resetFields();
  };

  return (
    <Modal
      title="Add dish to menu"
      open={openSubModal}
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
              <Select>
                {data &&
                  data.map((dish) => (
                    <Select.Option key={dish.id} value={JSON.stringify(dish)}>
                      {dish.name}
                    </Select.Option>
                  ))}
              </Select>
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
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default SubAddMenu2;
