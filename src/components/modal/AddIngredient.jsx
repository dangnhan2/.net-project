import {
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Button,
  App,
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
  // console.log(handleUnit);

  const onFinish = async (values) => {
    // console.log(values);

    const { name, quantity, description, price, supplier } = values;

    let data = {
      supplier,
    };

    let parseSupplier = JSON.parse(data.supplier);
    let parseUnit = JSON.parse(handleUnit);

    let unitType = parseUnit.name;
    let unitID = parseUnit.id;

    let supplierObj = [
      {
        supplierId: parseSupplier.id,
        supName: parseSupplier.name,
        phoneNo: parseSupplier.phoneNo,
        address: parseSupplier.address,
        email: parseSupplier.email,
      },
    ];

    let res = await addIngredient(
      name,
      quantity,
      description,
      price,
      unitID,
      unitType,
      supplierObj
    );

    if (res && res.statusCode === 201) {
      message.success(res.message);
      form.resetFields();
      setModalAdd(false);
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
    setModalAdd(false);
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
              <Select>
                {suppliers &&
                  suppliers.map((supplier) => (
                    <Select.Option
                      key={supplier.id}
                      value={JSON.stringify(supplier)}
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
              rules={[
                {
                  required: true,
                  message: "Please choose ingredient's unit type!",
                },
              ]}
              style={{ flex: 1 }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Select
                  style={{ width: "230px" }}
                  name="unit"
                  onChange={(value) => {
                    setHandleUnit(value);
                  }}
                >
                  {units &&
                    units.map((unit) => (
                      <Select.Option key={unit.id} value={JSON.stringify(unit)}>
                        {unit.name}
                      </Select.Option>
                    ))}
                </Select>
                <Button
                  type="primary"
                  onClick={() => setOpenSubModal(true)}
                  icon={<PlusCircleOutlined />}
                />
              </div>
            </Form.Item>
          </div>

          <Form.Item label="Description" name="description" style={{ flex: 1 }}>
            <Input.TextArea placeholder="Description: " rows={4} />
          </Form.Item>
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
