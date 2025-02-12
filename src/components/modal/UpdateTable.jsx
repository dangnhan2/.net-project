import { Divider, Form, Input, InputNumber, Modal, Select } from "antd";
import { useEffect } from "react";

const UpdateTable = (props) => {
  const [form] = Form.useForm();
  const { modalUpdate, setModalUpdate, dataRecord } = props;
  console.log(dataRecord);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleOk = () => {
    setModalUpdate(false);
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
      title="Update Table"
      open={modalUpdate}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
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
export default UpdateTable;
