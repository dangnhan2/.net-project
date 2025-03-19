import { Divider, Form, Input, InputNumber, Modal, Select, Button } from "antd";
import { useEffect } from "react";

const UpdateTable = (props) => {
  const [form] = Form.useForm();
  const { modalUpdate, setModalUpdate, dataRecord } = props;
  console.log(dataRecord);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleCancel = () => {
    setModalUpdate(false);
  };

  const onChange = (value) => {
    // console.log("changed", value);
  };

  useEffect(() => {
    if (dataRecord) {
      form.setFieldsValue({
        id: dataRecord.id,
        number: dataRecord.number,
        capacity: dataRecord.capacity,
        location: dataRecord.location,
        tag: dataRecord.tags[0],
      });
    }
  }, [dataRecord]);
  return (
    <Modal
      title="Edit Table"
      open={modalUpdate}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Divider />
      <Form
        name="tableForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Number"
            name="number"
            rules={[{ required: true, message: "Please enter table's number!" }]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Enter number" />
          </Form.Item>

          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: "Please enter table's capacity!" }]}
            style={{ flex: 1 }}
          >
            <InputNumber
            min={1}
            defaultValue={1}
            onChange={onChange}
            style={{ width: "100%" }}
          />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please select table's location!!" }]}
            style={{ flex: 1 }}
          >
            <Select>
            <Select.Option value="A">Floor A</Select.Option>
            <Select.Option value="B">Floor B</Select.Option>
            <Select.Option value="C">Floor C</Select.Option>
          </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="tag"
            rules={[{ required: true, message: "Please select a status!" }]}
            style={{ flex: 1 }}
          >
            <Select>
            <Select.Option value="Empty">Empty</Select.Option>
            <Select.Option value="Using">Using</Select.Option>
            <Select.Option value="Unavaliable">Unavaliable</Select.Option>
            <Select.Option value="On hold">On hold</Select.Option>
          </Select>
          </Form.Item>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button onClick={handleCancel} style={{ backgroundColor: "red", color: "white" }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
export default UpdateTable;
