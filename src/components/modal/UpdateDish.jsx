import { PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
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
} from "antd";
import { useEffect, useState } from "react";
const UpdateDish = (props) => {
  const [form] = Form.useForm();
  const { modalUpdate, setModalUpdate, dataRecord } = props;
  const [fileList, setFileList] = useState([]);
  console.log(dataRecord);
  console.log(fileList);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const handleOk = () => {
    setModalUpdate(false);
  };

  const handleCancel = () => {
    setModalUpdate(false);
  };

  useEffect(() => {
    const thumbnail = {
      uid: uuidv4(),
      name: dataRecord?.dish,
      status: "done",
      url: dataRecord?.image,
    };

    if (dataRecord) {
      form.setFieldsValue({
        image: thumbnail,
        id: dataRecord.id,
        dish: dataRecord.dish,
        price: dataRecord.price,
        category: dataRecord.category,
      });
    }
    setFileList([thumbnail]);
  }, [dataRecord]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

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
      title="Update Dish"
      open={modalUpdate}
      onOk={handleOk}
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
              message: "Please input dish!",
            },
          ]}
        >
          <Input placeholder="Enter dish" />
        </Form.Item>
        <Row gutter={[30, 30]}>
          <Col span={12}>
            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please input your full name!",
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
              label="Dish"
              name="dish"
              rules={[
                {
                  required: true,
                  message: "Please input dish!",
                },
              ]}
            >
              <Input placeholder="Enter dish" />
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
                  message: "Please input your address!",
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
      </Form>
    </Modal>
  );
};
export default UpdateDish;
