import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
  Button
} from "antd";
import { useState } from "react";

const AddDish = (props) => {
  const { modalAdd, setModalAdd } = props;
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleCancel = () => {
    setModalAdd(false);
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const onChange = (value) => {
    // console.log("changed", value);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <Modal
      title="Add New Dish"
      open={modalAdd}
      onCancel={handleCancel}
      footer={null}
      width={700}
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
        <Row gutter={[30, 30]}>
          <Col span={12}>
            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please choose an image!",
                },
              ]}
            >
              <Upload
                // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter dish's name!",
                },
              ]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item
              label="Price"
              name="Price"
              rules={[
                {
                  required: true,
                  message: "Please enter dish's price!",
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
          </Col>
          <Col span={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please select category!",
                },
              ]}
            >
              <Select placeholder="Choose category">
                <Select.Option value="coffee">Coffee</Select.Option>
                <Select.Option value="dessert">Dessert</Select.Option>
                <Select.Option value="drink">Drink</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Note" name="note">
          <Input.TextArea placeholder="Enter note: (e.g. VIP)" rows={4} />
        </Form.Item>
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
export default AddDish;
