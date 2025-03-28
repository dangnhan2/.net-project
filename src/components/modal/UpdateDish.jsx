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
  Button,
  App,
} from "antd";
import { useEffect, useState } from "react";
import { updateDish } from "../../api/api";
const UpdateDish = (props) => {
  const [form] = Form.useForm();
  const { modalUpdate, setModalUpdate, dataRecord, getDishes } = props;
  const { message, notification } = App.useApp();
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  console.log(dataRecord);
  console.log(fileList);

  const onFinish = async (values) => {
    const { id, name, category, price, description } = values;
    let res = await updateDish(
      id,
      name,
      category,
      price,
      description,
      fileList[0].originFileObj
    );
    if (res && res.statusCode === 200) {
      message.success(res.message);
      getDishes();
      setModalUpdate(false);
    } else {
      notification.error({
        message: "Action Failed",
        description: res.message,
        duration: 3,
      });
    }
  };

  const handleCancel = () => {
    setModalUpdate(false);
  };

  useEffect(() => {
    if (dataRecord) {
      const thumbnail = {
        uid: uuidv4(),
        name: dataRecord?.dish,
        status: "done",
        url: `${import.meta.env.VITE_IMAGE_URL}images/${dataRecord.imageUrl}`,
      };

      form.setFieldsValue({
        image: thumbnail,
        id: dataRecord.id,
        name: dataRecord.name,
        price: dataRecord.price,
        category: dataRecord.category,
        description: dataRecord.description,
      });
      setFileList([thumbnail]);
    }
  }, [dataRecord]);

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

  const customRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  return (
    <Modal
      title="Edit Dish"
      open={modalUpdate}
      onCancel={handleCancel}
      onOk={() => {
        form.submit();
      }}
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
        <Form.Item hidden label="Id" name="id">
          <Input />
        </Form.Item>
        <Row gutter={[30, 30]}>
          <Col span={12}>
            <Form.Item label="Image">
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
              label="Dish"
              name="name"
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
                  message: "Please input your price!",
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
        <Form.Item label="Note" name="description">
          <Input.TextArea placeholder="Enter note: (e.g. VIP)" rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateDish;
