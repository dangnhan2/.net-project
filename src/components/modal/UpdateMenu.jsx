import { App, Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import MenuList from "../table/subtable/MenuList";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/Context";
import { updateMenu } from "../../api/api";
const UpdateMenu = (props) => {
  const [form] = Form.useForm();
  const { dishes, setDishes } = useContext(UserContext);
  const { modalUpdate, setModalUpdate, dataRecord, getMenus } = props;
  const [openSubModal, setOpenSubModal] = useState();
  const { message, notification } = App.useApp();

  const onFinish = async (values) => {
    const { id, name, status, description } = values;
    let res = await updateMenu(id, name, status, description, dishes);
    if (res && res.statusCode == 200) {
      message.success("Cập nhật thành công");
      setDishes([]);
      setModalUpdate(false);
      getMenus();
    } else {
      const errorMessage = Object.values(res).flat();
      notification.error({
        message: "Action Failed",
        description: errorMessage,
        duration: 3,
      });
    }
    // console.log("Success:", values);
  };

  const handleCancel = () => {
    setDishes([]);
    setModalUpdate(false);
  };

  useEffect(() => {
    if (dataRecord) {
      form.setFieldsValue({
        id: dataRecord.id,
        name: dataRecord.name,
        status: dataRecord.status,
        description: dataRecord.description,
      });
    }
  }, [dataRecord]);

  return (
    <Modal
      title="Add New Menu"
      open={modalUpdate}
      onOk={() => {
        form.submit();
      }}
      onCancel={handleCancel}
      width={700}
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
        <Form.Item hidden label="Id" name="id">
          <Input readOnly />
        </Form.Item>
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
                  message: "Please input table!",
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
                  //   message: "Please input your address!",
                },
              ]}
            >
              <Input.TextArea placeholder="Enter note: (e.g. VIP)" rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <MenuList
        openSubModal={openSubModal}
        setOpenSubModal={setOpenSubModal}
      ></MenuList>
    </Modal>
  );
};
export default UpdateMenu;
