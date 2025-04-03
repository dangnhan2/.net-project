import { App, Col, Divider, Form, InputNumber, Modal, Row, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/Context";
import { getAllMenus } from "../../../api/api";

const SubAddOrder = (props) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const { dishesOrder, setDishesOrder } = useContext(UserContext);
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const { openSubModal, setOpenSubModal } = props;

  const handleMenuChange = (menuId) => {
    setSelectedMenu(menuId);
    const dishes = menus.find((menu) => menu.id === menuId)?.dishes || [];
    setFilteredDishes(dishes);
  };

  const onFinish = (values) => {
    const { menu, dish, quantity } = values;
    let data = {
      menu,
      dish,
      quantity,
    };

    let parseName = JSON.parse(data.dish);
    const dishOrderItem = {
      dishId: parseName.id,
      menuId: menu,
      price: parseName.price,
      name: parseName.name,
      quantity: quantity,
      totalAmount: Number((quantity * parseName.price).toFixed(2)),
    };

    let existDish = dishesOrder.findIndex(
      (d) => d.dishId === dishOrderItem.dishId
    );
    if (existDish === -1) {
      setDishesOrder([...dishesOrder, dishOrderItem]);
    } else {
      dishesOrder[existDish].menuId = dishOrderItem.menuId;
      dishesOrder[existDish].price = dishOrderItem.price;
      dishesOrder[existDish].name = dishOrderItem.name;
      dishesOrder[existDish].quantity = dishOrderItem.quantity;
      dishesOrder[existDish].totalAmount = dishOrderItem.totalAmount;
    }

    message.success("Action Succeed");
    setOpenSubModal(false);
    form.resetFields();
  };

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    let res = await getAllMenus();
    console.log(res.data);

    if (res && res.statusCode === 200) {
      setMenus(res.data);
    }
  };

  const handleCancel = () => {
    setOpenSubModal(false);
  };

  return (
    <Modal
      title="Dish"
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
              label="Menu"
              name="menu"
              rules={[
                {
                  required: true,
                  message: "Please choose menu!",
                },
              ]}
            >
              <Select placeholder="Choose menu" onChange={handleMenuChange}>
                {menus.map((menu) => {
                  if (menu.status === 1) {
                    return (
                      <Select.Option key={menu.id} value={menu.id}>
                        {menu.name}
                      </Select.Option>
                    );
                  }
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Dish"
              name="dish"
              rules={[
                {
                  required: true,
                  message: "Please choose dish!",
                },
              ]}
            >
              <Select>
                {filteredDishes.map((dish) => (
                  <Select.Option key={dish.id} value={JSON.stringify(dish)}>
                    {dish.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Please input quantity!",
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default SubAddOrder;
