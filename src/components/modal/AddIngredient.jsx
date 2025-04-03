import {
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Button,
  App,
  Col,
  Row,
} from "antd";
import { useEffect, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { addIngredient, getAllSuppliers, getAllUnits } from "../../api/api";
import SubAddIngredient from "./submodal/SubAddIngredient";

const AddIngredient = (props) => {
  const [form] = Form.useForm();
  const { message, notification } = App.useApp();
  const { modalAdd, setModalAdd, getIngredients } = props;
  const [units, setUnits] = useState([]);
  const [suppliers, setSuppliers] = useState();
  const [handleUnit, setHandleUnit] = useState();
  const [openSubModal, setOpenSubModal] = useState(false);

  const onFinish = async (values) => {
    const { name, quantity, description, price, supplier } = values;
    console.log(values);

    const selectedSuppliers = suppliers
      .filter((s) => values.supplier.includes(s.value)) // Dùng `id` để lọc
      .map((s) => s.object); // Lấy object đầy đủ

    console.log("Selected suppliers:", selectedSuppliers);

    let supplierObjs = selectedSuppliers.map((s) => {
      return {
        supplierId: s.id,
        supName: s.name,
        phoneNo: s.phoneNo,
        address: s.address,
        email: s.email,
      };
    });

    let res = await addIngredient(
      name,
      quantity,
      description,
      price,
      handleUnit.id,
      handleUnit.name,
      supplierObjs
    );

    console.log(res);

    if (res && res.statusCode === 201) {
      message.success(res.message);
      form.resetFields();
      setModalAdd(false);
      getIngredients();
    } else {
      let errorMessage = Object.values(res).flat();
      notification.error({
        message: "Action Failed",
        description: errorMessage,
        duration: 3,
      });
    }
  };

  const handleCancel = () => {
    setModalAdd(false);
    form.resetFields();
  };

  useEffect(() => {
    getSuppliers();
    getUnits();
  }, []);

  const getSuppliers = async () => {
    let res = await getAllSuppliers();
    console.log(res);

    if (res && res.statusCode === 200) {
      const formattedSuppliers = res.data.map((supplier) => ({
        value: supplier.id, // ID dùng trong Select
        label: supplier.name,
        object: supplier, // Giữ nguyên object để dùng sau
      }));

      setSuppliers(formattedSuppliers);
      // setSuppliers(res.data);
    }
  };

  const getUnits = async () => {
    let res = await getAllUnits();
    if (res && res.statusCode === 200) {
      setUnits(res.data);
    }
  };

  return (
    <>
      <Modal
        title="Add Ingredient"
        open={modalAdd}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancel}
        width={600}
      >
        <Divider />
        <Form
          form={form}
          name="ingredientForm"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter ingredient's name!",
                  },
                ]}
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Supplier"
                name="supplier"
                rules={[
                  {
                    required: true,
                    message: "Please choose ingredient's supplier!",
                  },
                ]}
                style={{ flex: 1 }}
              >
                <Select
                  mode="multiple"
                  options={suppliers} // Đảm bảo có dữ liệu cho Select
                  onChange={(selectedIds) => {
                    form.setFieldsValue({ supplier: selectedIds }); // Cập nhật ID vào form
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Please enter ingredient's quantity!",
                  },
                ]}
                style={{ flex: 1 }}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please select a status!" }]}
                style={{ flex: 1 }}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Form.Item
                label="Unit Type"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Please choose ingredient's unit type!",
                  },
                ]}
                style={{ flex: 1 }}
              >
                <Select
                  style={{ width: "230px" }}
                  onChange={(value) => {
                    const selectedUnit = units.find(
                      (unit) => unit.id === value
                    );
                    setHandleUnit(selectedUnit);
                    form.setFieldsValue({ type: selectedUnit });
                  }}
                >
                  {units &&
                    units.map((unit) => (
                      <Select.Option key={unit.id} value={unit.id}>
                        {unit.name}
                      </Select.Option>
                    ))}
                </Select>
                <Button
                  type="primary"
                  onClick={() => setOpenSubModal(true)}
                  icon={<PlusCircleOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Form.Item
              label="Description"
              name="description"
              style={{ flex: 1 }}
            >
              <Input.TextArea placeholder="Description: " rows={4} />
            </Form.Item>
          </Row>
        </Form>
      </Modal>

      <SubAddIngredient
        openSubModal={openSubModal}
        setOpenSubModal={setOpenSubModal}
        getUnits={getUnits}
      ></SubAddIngredient>
    </>
  );
};

export default AddIngredient;
