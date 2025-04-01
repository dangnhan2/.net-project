import { App, Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { updateEmployee } from "../../api/api";
const UpdateEmployee = (props) => {
  const { message, notification } = App.useApp();
  const [form] = Form.useForm();
  const { modalUpdate, setModalUpdate, dataRecord, getEmployees } = props;
  const [statusEmp, setStatusEmp] = useState();
  const [genderEmp, setGenderEmp] = useState();

  const handleStatus = (e) => {
    setStatusEmp(e);
  };

  const handleGender = (e) => {
    setGenderEmp(e);
  };
  const onFinish = async (values) => {
    const { id, fullName, phoneNo, email, address, role } = values;
    let res = await updateEmployee(
      id,
      fullName,
      phoneNo,
      email,
      address,
      genderEmp,
      statusEmp,
      role
    );

    if (res) {
      message.success("Action Succeed");
      setModalUpdate(false);
      getEmployees();
    }
    console.log(values);
  };

  const handleCancel = () => {
    setModalUpdate(false);
  };

  useEffect(() => {
    let status = "";
    let gender = "";
    if (dataRecord) {
      if (dataRecord.status === 0) status = "Working";
      if (dataRecord.status === 1) status = "Lay-off";

      if (dataRecord.gender === 0) gender = "Male";
      if (dataRecord.gender === 1) gender = "Female";
      if (dataRecord.gender === 2) gender = "Other";

      form.setFieldsValue({
        id: dataRecord.id,
        fullName: dataRecord.fullName,
        phoneNo: dataRecord.phoneNo,
        email: dataRecord.email,
        address: dataRecord.address,
        role: dataRecord.role,
        gender: gender,
        status: status,
      });
    }
  }, [dataRecord]);
  return (
    <Modal
      title="Update Employee"
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
              message: "Please input your phone fullname!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Row gutter={[30, 30]}>
          <Col span={12}>
            <Form.Item
              label="Full name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input full name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phoneNo"
              rules={[
                {
                  required: true,
                  message: "Please input phone number!",
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
                  message: "Please input email!",
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
                  message: "Please input address!",
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
              <Select
                placeholder="Choose status"
                value={statusEmp}
                onChange={handleStatus}
              >
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
              <Select
                placeholder="Choose gender"
                value={genderEmp}
                onChange={handleGender}
              >
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

export default UpdateEmployee;
