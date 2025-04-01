import { App, Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import { addEmployee } from "../../api/api";
const AddEmployee = (props) => {
  const [form] = Form.useForm();
  const { message, notification } = App.useApp();
  const { modalAdd, setModalAdd, getEmployees } = props;
  const onFinish = async (values) => {
    const { fullName, phoneNo, email, address, gender, status, role } = values;
    let res = await addEmployee(
      fullName,
      phoneNo,
      email,
      address,
      gender,
      status,
      role
    );
    if (res) {
      message.success("Action Succeed");
      setModalAdd(false);
      getEmployees();
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setModalAdd(false);
  };

  return (
    <Modal
      title="New Employee"
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
        <Row gutter={[30, 30]}>
          <Col span={12}>
            <Form.Item
              label="Full name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your full name!",
                },
              ]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phoneNo"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input placeholder="Enter phone " />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please choose role!",
                },
              ]}
            >
              <Select placeholder="Choose role">
                <Select.Option value="STAFF">Staff</Select.Option>
                <Select.Option value="MANAGER">Manager</Select.Option>
                <Select.Option value="ADMIN">Admin</Select.Option>
              </Select>
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
              <Select placeholder="Choose status">
                <Select.Option value={0}>Working</Select.Option>
                <Select.Option value={1}>Lay-off</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Please choose gender!",
                },
              ]}
            >
              <Select placeholder="Choose gender">
                <Select.Option value={0}>Male</Select.Option>
                <Select.Option value={1}>Female</Select.Option>
                <Select.Option value={2}>Other</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default AddEmployee;
