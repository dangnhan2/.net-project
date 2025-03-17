import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import SubAddMenu2 from "./submodal/SubAddMenu2";
const { TextArea } = Input;

const UpdateMenu = (props) => {
  const [form] = Form.useForm();
  const { modalUpdate, setModalUpdate, dataRecord } = props;
  const [openSubModalUpdate, setOpenSubModalUpdate] = useState(false);
  const [data, setData] = useState();
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

  useEffect(() => {
    if (dataRecord) {
      form.setFieldsValue({
        name: dataRecord.menu,
        tags: dataRecord.tags[0],
        description: dataRecord.description,
      });

      setData(dataRecord.menuList);
    }
  }, [dataRecord]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "DISH",
      dataIndex: "dish",
      key: "dish",
    },
    {
      title: "DISCOUNT",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Action",
      dataIndex: "action",

      render: (value, record, index) => (
        <>
          <div style={{ display: "flex", gap: "5px" }}>
            <Button>
              <FaRegTrashAlt style={{ color: "#F38177" }} />
            </Button>
          </div>
        </>
      ),
    },
  ];

  const render = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Menu's Dish List</h2>
        <Button type="primary" onClick={() => setOpenSubModalUpdate(true)}>
          <FaPlus /> Add new
        </Button>
      </div>
    );
  };
  return (
    <>
      <Modal
        title="Update Menu"
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
          <Row gutter={[30, 30]}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input  name!",
                  },
                ]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="tags"
                rules={[
                  {
                    required: true,
                    message: "Please choose the status!",
                  },
                ]}
              >
                <Select placeholder="Choose the status">
                  <Select.Option value="staff">Active</Select.Option>
                  <Select.Option value="manage">In-Active</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: false,
                    //   message: "Please input your address!",
                  },
                ]}
              >
                <TextArea rows={4} placeholder="" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          columns={columns}
          dataSource={data}
          title={render}
          // pagination={{
          //   position: ["bottomCenter"],
          // }}
        />
      </Modal>

      <SubAddMenu2
        openSubModalUpdate={openSubModalUpdate}
        setOpenSubModalUpdate={setOpenSubModalUpdate}
      ></SubAddMenu2>
    </>
  );
};
export default UpdateMenu;
