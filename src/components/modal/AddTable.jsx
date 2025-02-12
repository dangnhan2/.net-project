import { Divider, Form, Input, InputNumber, Modal, Select } from "antd";
const AddTable = (props) => {
  const { modalAdd, setModalAdd } = props;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleOk = () => {
    setModalAdd(false);
  };

  const handleCancel = () => {
    setModalAdd(false);
  };

  const onChange = (value) => {
    // console.log("changed", value);
  };
  return (
    <Modal
      title="New Table"
      open={modalAdd}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
    >
      <Divider></Divider>
      <Form
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
          label="Number"
          name="number"
          rules={[
            {
              required: true,
              message: "Please input number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Capacity"
          name="capacity"
          rules={[
            {
              required: true,
              message: "Please input capacity!",
            },
          ]}
        >
          <InputNumber
            min={1}
            defaultValue={1}
            onChange={onChange}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[
            {
              required: true,
              message: "Please select location!",
            },
          ]}
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
          rules={[
            {
              required: true,
              message: "Please select status!",
            },
          ]}
        >
          <Select>
            <Select.Option value="Empty">Empty</Select.Option>
            <Select.Option value="Using">Using</Select.Option>
            <Select.Option value="Unavaliable">Unavaliable</Select.Option>
            <Select.Option value="On hold">On hold</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddTable;
