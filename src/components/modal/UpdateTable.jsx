import { Divider, Form, Input, InputNumber, Modal, Select, App } from "antd";
import { useEffect, useState } from "react";
import { updateTable } from "../../api/api";

const UpdateTable = (props) => {
  const [form] = Form.useForm();
  const { message, notification } = App.useApp();
  const { modalUpdate, setModalUpdate, dataRecord, getTables } = props;
  const [statusTable, setStatusTable] = useState();

  const onFinish = async (values) => {
    const { id, number, capacity, location, status } = values;
    let res = await updateTable(id, number, capacity, location, statusTable);
    if (res) {
      message.success("Cập nhật thành công");
      getTables();
      setModalUpdate(false);
    } else {
      const errorMessage = Object.values(res).flat();
      notification.error({
        message: "Action Failed",
        description: errorMessage,
        duration: 3,
      });
    }
  };

  const handleCancel = () => {
    setModalUpdate(false);
  };

  const handleStatus = (e) => {
    setStatusTable(e);
  };

  useEffect(() => {
    if (dataRecord) {
      let tag;
      if (dataRecord.status === 0) {
        tag = "On hold";
      } else if (dataRecord.status === 1) {
        tag = "Unavaliable";
      } else if (dataRecord.status === 2) {
        tag = "Using";
      } else if (dataRecord.status === 3) {
        tag = "Empty";
      }

      form.setFieldsValue({
        id: dataRecord.id,
        number: dataRecord.number,
        capacity: dataRecord.capacity,
        location: dataRecord.location,
        status: tag,
      });
    }
  }, [dataRecord]);

  return (
    <Modal
      title="Edit Table"
      open={modalUpdate}
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
          <Form.Item hidden label="Id" name="id" style={{ flex: 1 }}>
            <Input />
          </Form.Item>

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
export default UpdateTable;
