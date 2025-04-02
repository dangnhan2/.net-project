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
  // console.log(dataRecord);

  console.log(handleUnit);
  console.log(handleSupplier);

  const onFinish = async (values) => {
    const { id, name, quantity, description, price, supplier, unitType } =
      values;
    // console.log(values);

    // let data = {
    //   supplier,
    //   unitType,
    // };

    // let parseSupplier = JSON.parse(data.supplier);
    // let parseUnit = JSON.parse(data.unitType);
    // let unitID;
    // let unitName;
    // let supplierObj = [];

    // if (typeof supplier === "string" && typeof unitType === "string") {
    //   supplierObj.push(handleSupplier);
    //   (unitID = handleUnit.id), (unitName = handleUnit.type);
    // } else {
    //   supplierObj.push({
    //     supplierId: parseSupplier.id,
    //     supName: parseSupplier.name,
    //     phoneNo: parseSupplier.phoneNo,
    //     address: parseSupplier.address,
    //     email: parseSupplier.email,
    //   });
    //   (unitID = parseUnit.id), (unitName = parseUnit.name);
    // }

    let supplierObj = [];
    let unitID;
    let unitName;

    // Safe JSON parsing
    let parseSupplier, parseUnit;
    try {
      parseSupplier = supplier ? JSON.parse(supplier) : null;
    } catch (error) {
      parseSupplier = null;
    }

    try {
      parseUnit = unitType ? JSON.parse(unitType) : null;
    } catch (error) {
      parseUnit = null;
    }

    if (parseSupplier && parseUnit) {
      supplierObj.push({
        supplierId: parseSupplier.supplierID,
        supName: parseSupplier.supName,
        phoneNo: parseSupplier.phoneNo,
        address: parseSupplier.address,
        email: parseSupplier.email,
      });
      unitID = parseUnit.id;
      unitName = parseUnit.name;
    } else {
      supplierObj.push(handleSupplier);
      unitID = handleUnit?.id;
      unitName = handleUnit?.name;
    }

    console.log(
      id,
      name,
      quantity,
      description,
      price,
      unitID,
      unitName,
      supplierObj
    );

    let res = await updateIngredient(
      id,
      name,
      quantity,
      description,
      price,
      unitID,
      unitName,
      supplierObj
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
        supplier: {
          key: dataRecord.supplierName[0].supplierId,
          label: dataRecord.supplierName[0].supName,
        }, // Store as JSON string for Select component
        quantity: dataRecord.quantity,
        price: dataRecord.price,
        unitType: JSON.stringify({
          id: dataRecord.unitID,
          name: dataRecord.unitType,
        }), // Store as JSON string
        description: dataRecord.description,
      });

      setHandleSupplier(dataRecord.supplierName[0]);
      setHandleUnit({ id: dataRecord.unitID, name: dataRecord.unitType });
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
                // name="supplier"
                onChange={(value) => setHandleSupplier(value)}
              >
                {suppliers &&
                  suppliers.map((supplier) => (
                    <Select.Option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </Select.Option>
                  ))}
              </Select>
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
                onChange={(value) => setHandleUnit(JSON.parse(value))}
              >
                {units &&
                  units.map((unit) => (
                    <Select.Option key={unit.id} value={JSON.stringify(unit)}>
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
