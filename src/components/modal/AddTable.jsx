import { Divider, Form, Input, InputNumber, Modal, Select, App } from "antd";
import { addTable } from "../../api/api";
import { useState } from "react";
const AddTable = (props) => {
  const [form] = Form.useForm();
  const { message, notification } = App.useApp();
  const { modalAdd, setModalAdd, getTables } = props;
  const [statusTable, setStatusTable] = useState();

  const onFinish = async (values) => {
    const { number, capacity, location, status } = values;
    let res = await addTable(number, capacity, location, statusTable);
    console.log(res);

    if (res && res.statusCode === 201) {
      message.success(res.message);
      setModalAdd(false);
      getTables();
      form.resetFields();
    } else {
      const errorMessage = Object.values(res).flat();
      notification.error({
        message: "Action Failed",
        description: errorMessage || errorMessage.message,
        duration: 3,
      });
    }
  };

  const handleCancel = () => {
    setModalAdd(false);
  };

  const handleStatus = (e) => {
    setStatusTable(e);
  };

  return (
    <Modal
      title="Add New Table"
      open={modalAdd}
      onCancel={handleCancel}
      onOk={() => {
        form.submit();
      }}
      width={600}
    >
      <Divider />
      <Form
        form={form}
        name="tableForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Number"
            name="number"
            rules={[
              { required: true, message: "Please enter table's number!" },
            ]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Enter number" />
          </Form.Item>

          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[
              { required: true, message: "Please enter table's capacity!" },
            ]}
            style={{ flex: 1 }}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Location"
            name="location"
            rules={[
              { required: true, message: "Please select table's location!!" },
            ]}
            style={{ flex: 1 }}
          >
            <Select>
              <Select.Option value="Floor A">Floor A</Select.Option>
              <Select.Option value="Floor B">Floor B</Select.Option>
              <Select.Option value="Floor C">Floor C</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select a status!" }]}
            style={{ flex: 1 }}
          >
            <Select value={statusTable} onChange={handleStatus}>
              <Select.Option value={3}>Empty</Select.Option>
              <Select.Option value={2}>Using</Select.Option>
              <Select.Option value={1}>Unavaliable</Select.Option>
              <Select.Option value={0}>On hold</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
export default AddTable;
