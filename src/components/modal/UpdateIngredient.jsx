import {
  App,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { getAllSuppliers, getAllUnits, updateIngredient } from "../../api/api";

const UpdateIngredient = (props) => {
  const [form] = Form.useForm();
  const { message, notification } = App.useApp();
  const { modalUpdate, setModalUpdate, dataRecord, getIngredients } = props;
  console.log(dataRecord);

  const [units, setUnits] = useState([]);
  const [suppliers, setSuppliers] = useState();
  const [handleUnit, setHandleUnit] = useState();
  const [handleSupplier, setHandleSupplier] = useState();

  // console.log(handleUnit);
  // console.log(handleSupplier);
  console.log("Suppliers in Select:", suppliers);
  const onFinish = async (values) => {
    const { id, name, quantity, description, price, supplier, unitType } =
      values;

    const selectedSuppliers = suppliers
      .filter(
        (s) => values.supplier.includes(s.value) // Dùng tên thay vì ID
      )
      .map((s) => s.object);

    // Safe JSON parsing
    let supplierObjs = selectedSuppliers.map((s) => {
      return {
        supplierId: s.id,
        supName: s.name,
        phoneNo: s.phoneNo,
        address: s.address,
        email: s.email,
      };
    });

    let res = await updateIngredient(
      id,
      name,
      quantity,
      description,
      price,
      handleUnit.id,
      handleUnit.name,
      supplierObjs
    );

    if (res && res.statusCode === 200) {
      message.success(res.message);
      form.resetFields();
      setModalUpdate(false);
      getIngredients();
    } else {
      let errorMessage = Object.values(res.message).flat();
      notification.error({
        message: "Action Failed",
        description: errorMessage,
        duration: 3,
      });
    }
  };

  const handleCancel = () => {
    setModalUpdate(false);
  };

  useEffect(() => {
    getSuppliers();
    getUnits();
  }, []);

  const getSuppliers = async () => {
    let res = await getAllSuppliers();
    if (res && res.statusCode === 200) {
      const formattedSuppliers = res.data.map((supplier) => ({
        value: supplier.id, // ID dùng trong Select
        label: supplier.name,
        object: supplier, // Giữ nguyên object để dùng sau
      }));
      setSuppliers(formattedSuppliers);
    }
  };

  const getUnits = async () => {
    let res = await getAllUnits();
    if (res && res.statusCode === 200) {
      setUnits(res.data);
    }
  };

  useEffect(() => {
    if (dataRecord) {
      form.setFieldsValue({
        id: dataRecord.id,
        name: dataRecord.name,
        quantity: dataRecord.quantity,
        price: dataRecord.price,
        description: dataRecord.description, // Default to empty string if no description
        supplier: dataRecord.supplierName.map((s) => s.supName), // Pre-select suppliers by their ID
        unitType: dataRecord.unitID, // Pre-select the unit by unitID
      });
      const selectedUnit = units.find((unit) => unit.id === dataRecord.unitID);
      setHandleUnit(selectedUnit);
      setSuppliers(dataRecord.supplierName);
    }
  }, [dataRecord, units]);

  return (
    <Modal
      title="Update Ingredient"
      open={modalUpdate}
      onOk={() => {
        form.submit();
      }}
      onCancel={handleCancel}
      width={700}
    >
      <Divider />
      <Form
        form={form}
        name="ingredientForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Id" name="id" hidden>
          <Input />
        </Form.Item>

        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter ingredient's name!" },
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
                options={suppliers}
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
              name="unitType"
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
                  const selectedUnit = units.find((unit) => unit.id === value);
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
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              style={{ flex: 1 }}
            >
              <Input.TextArea placeholder="Description: " rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default UpdateIngredient;
