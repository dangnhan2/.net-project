import {
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Row,
  Col,
  Button,
} from "antd";
import { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";

const AddIngredient = (props) => {
  const { modalAdd, setModalAdd } = props;

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleCancel = () => {
    setModalAdd(false);
  };

  const onChange = (value) => {
    // console.log("changed", value);
  };
  return (
    <Modal
      title="Import Ingredient"
      open={modalAdd}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Divider />
      <Form
        name="ingredientForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter ingredient's name!" }]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Supplier"
            name="supplier"
            rules={[{ required: true, message: "Please choose ingredient's supplier!" }]}
            style={{ flex: 1 }}
          >
            <Select>
            <Select.Option value="Kaiser Corporation">Kaiser Corporation</Select.Option>
            <Select.Option value="Abydos School">Abydos School</Select.Option>
            <Select.Option value="Angel 24">Angel 24</Select.Option>
            <Select.Option value="SCHALE">SCHALE</Select.Option>
          </Select>
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please enter ingredient's quantity!" }]}
            style={{ flex: 1 }}
          >
            <InputNumber
                min={1}
                defaultValue={1}
                onChange={onChange}
                style={{ width: "100%" }}
              />
          </Form.Item>

          <Form.Item
            label="Price"
            name="Price"
            rules={[{ required: true, message: "Please select a status!" }]}
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
            label="Unit Type"
            name="Unit Type"
            rules={[{ required: true, message: "Please choose ingredient's unit type!" }]}
            style={{ flex: 1 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Select style={{ width: "230px" }}>
            <Select.Option value="kg">kg</Select.Option>
            <Select.Option value="l">l</Select.Option>
            <Select.Option value="gram">gram</Select.Option>
            <Select.Option value="box">box</Select.Option>
          </Select>
          <Button type="primary" onClick={() => setOpenSubModal(true)} icon={<PlusCircleOutlined />} />
        </div>
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

export default AddIngredient;
