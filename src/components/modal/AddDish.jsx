import { PlusOutlined } from "@ant-design/icons";
import {
  App,
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
} from "antd";
import { useState } from "react";
import { addDish } from "../../api/api";

const AddDish = (props) => {
  const { message, notification } = App.useApp();
  const [form] = Form.useForm();
  const { modalAdd, setModalAdd, getDishes } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  console.log(fileList[0]);

  const onFinish = async (values) => {
    const { name, category, price, description } = values;
    let res = await addDish(
      name,
      category,
      price,
      description,
      fileList[0].originFileObj
    );

    console.log(res);

    if (res && res.statusCode === 201) {
      setFileList([]);
      message.success(res.message);
      getDishes();
      setModalAdd(false);
    } else {
      var errorMessage = Object.values(res.message).flat();
      notification.error({
        message: "Action Failed",
        description: errorMessage,
        duration: 3,
      });
    }
    console.log(values);
  };

  const handleCancel = () => {
    setModalAdd(false);
    form.resetFields();
    setFileList([]);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

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

  const customRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  return (
    <Modal
      title="Add New Dish"
      open={modalAdd}
      onCancel={handleCancel}
      onOk={() => {
        form.submit();
      }}
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
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={[30, 30]}>
          <Col span={12}>
            <Form.Item
              label="Image"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Upload
                customRequest={customRequest}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                maxCount={1}
                multiple={false}
              >
                {fileList.length >= 2 ? null : uploadButton}
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
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please enter dish's price!",
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
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
        <Form.Item label="Note" name="description">
          <Input.TextArea placeholder="Enter note: (e.g. VIP)" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddDish;
