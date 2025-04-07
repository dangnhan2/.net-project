import { App, Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import MenuList from "../table/subtable/MenuList";
import { useContext } from "react";
import { UserContext } from "../../context/Context";
import { addMenu } from "../../api/api";

const AddMenu = (props) => {
  const { dishes, setDishes } = useContext(UserContext);
  console.log(dishes);

  const [form] = Form.useForm();

  const { modalAdd, setModalAdd, getMenus } = props;
  const { message, notification } = App.useApp();

  const onFinish = async (values) => {
    const { name, status, description } = values;
    let res = await addMenu(name, status, description, dishes);
    if (res && res.statusCode === 201) {
      message.success(res.message);
      setDishes([]);
      setModalAdd(false);
      getMenus();
      form.resetFields();
    } else {
      const errorMessage = Object.values(res).flat();
      notification.error({
        message: "Action Failed",
        description: errorMessage,
        duration: 3,
      });
    }
    console.log("Success:", values);
  };

  const handleCancel = () => {
    form.resetFields();
    setDishes([]);
    setModalAdd(false);
  };

  return (
    <Modal
      title="Add New Menu"
      open={modalAdd}
      onOk={() => {
        form.submit();
      }}
      onCancel={handleCancel}
      width={800}
      form={() => {
        form.submit();
      }}
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
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input menu!",
                },
              ]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
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
              <Select>
                <Select.Option value={0}>Inactive</Select.Option>
                <Select.Option value={1}>Active</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input description!",
                },
              ]}
            >
              <Input.TextArea placeholder="Enter note: (e.g. VIP)" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <MenuList></MenuList>
    </Modal>
  );
};
export default AddMenu;
