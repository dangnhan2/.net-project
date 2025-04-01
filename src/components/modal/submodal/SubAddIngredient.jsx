import { App, Col, Divider, Form, Input, Modal, Row } from "antd";
import { addUnit } from "../../../api/api";

const SubAddIngredient = (props) => {
  const { message, notification } = App.useApp();
  const [form] = Form.useForm();
  const { openSubModal, setOpenSubModal, getUnits } = props;

  const onFinish = async (values) => {
    const { name } = values;
    let res = await addUnit(name);
    console.log(res);

    if (res && res.statusCode === 201) {
      form.resetFields();
      setOpenSubModal(false);
      getUnits();
      message.success(res.message);
    } else {
      var errorMessage = Object.values(res.message).flat();
      notification.error({
        message: "Action Failed",
        description: errorMessage,
        duration: 3,
      });
    }
  };

  const handleCancel = () => {
    setOpenSubModal(false);
  };

  return (
    <Modal
      title="Add New Unit Type"
      open={openSubModal}
      onOk={() => {
        form.submit();
      }}
      onCancel={handleCancel}
      width={400}
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
        <Row>
          <Col span={24}>
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
        </Row>
      </Form>
    </Modal>
  );
};
export default SubAddIngredient;
