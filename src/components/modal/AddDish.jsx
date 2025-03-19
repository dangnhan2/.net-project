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
} from "antd";
import { useState } from "react";
import { addDish } from "../../api/api";

const AddDish = (props) => {
  const [form] = Form.useForm();
  const { modalAdd, setModalAdd, getDishes } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  console.log(fileList[0].File);

  const onFinish = async (values) => {
    const { Name, Category, Price, Description } = values;
    let res = await addDish(
      Name,
      Category,
      Price,
      Description,
      fileList[0].File
    );
    if (res) {
      message.success(res);
      getDishes();
      setModalAdd(false);
    } else {
      notification.error({
        message: "Có lỗi đã xảy ra",
        description: "Thêm món ăn thất bại",
        duration: 3,
      });
    }
    console.log(values);
  };

  const handleCancel = () => {
    setModalAdd(false);
    form.resetFields();
  };

  // console.log(fileList);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // const onChange = (value) => {
  //   // console.log("changed", value);
  // };

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
      onOk={() => form.submit()}
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
                // beforeUpload={(file) => {
                //   console.log(file);
                //   const isJPG =
                //     file.type === "image/jpeg" || file.type === "image/png";
                //   if (!isJPG) {
                //     message.error("You can only upload JPG or PNG file!");
                //     return false;
                //   } else {
                //     return file.name;
                //   }
                // }}
                maxCount={1}
                multiple="false"
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
              name="Name"
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
                // onChange={onChange}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Category"
              name="Category"
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
        <Form.Item label="Note" name="Description">
          <Input.TextArea placeholder="Enter note: (e.g. VIP)" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddDish;
