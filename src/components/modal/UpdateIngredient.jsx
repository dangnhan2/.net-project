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
  const [units, setUnits] = useState([]);
  const [suppliers, setSuppliers] = useState();
  const [handleUnit, setHandleUnit] = useState();
  const [handleSupplier, setHandleSupplier] = useState();

  const onFinish = async (values) => {
    const { id, name, quantity, description, price } = values;

    if (!handleUnit) {
      notification.error({
        message: "Unit Type is required!",
        duration: 2,
      });
      return;
    }

    if (!handleSupplier) {
      notification.error({
        message: "Supplier Type is required!",
        duration: 2,
      });
      return;
    }

    let unitType = handleUnit.name;
    let unitID = handleUnit.id;

    let supplierObj = [
      {
        supplierId: handleSupplier.id,
        supName: handleSupplier.name,
        phoneNo: handleSupplier.phoneNo,
        address: handleSupplier.address,
        email: handleSupplier.email,
      },
    ];

    let res = await updateIngredient(
      id,
      name,
      quantity,
      description,
      price,
      unitID,
      unitType,
      supplierObj
    );

    console.log(res);

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
      setSuppliers(res.data);
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
        supplier: dataRecord.supplierName[0].supName,
        quantity: dataRecord.quantity,
        price: dataRecord.price,
        unitType: dataRecord.unitType,
        description: dataRecord.description,
      });
    }
  }, [dataRecord]);

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

        <div style={{ display: "flex", gap: "16px" }}>
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
              name="supplier"
              onChange={(value, option) => {
                setHandleSupplier(option.supplierData); // Lưu object supplier trực tiếp vào state
              }}
            >
              {suppliers &&
                suppliers.map((supplier) => (
                  <Select.Option
                    key={supplier.id}
                    value={supplier.id}
                    supplierData={supplier}
                  >
                    {supplier.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
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

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please select a status!" }]}
            style={{ flex: 1 }}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
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
              name="unit"
              onChange={(value, option) => {
                setHandleUnit(option.unitData); // Lưu object unit trực tiếp vào state
              }}
            >
              {units &&
                units.map((unit) => (
                  <Select.Option key={unit.id} value={unit.id} unitData={unit}>
                    {unit.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item label="Description" name="description" style={{ flex: 1 }}>
          <Input.TextArea placeholder="Description: " rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default UpdateIngredient;
