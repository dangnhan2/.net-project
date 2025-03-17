import { Button, Space, Table, Tag, Input } from "antd";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import { useState } from "react";
import AddIngredient from "../modal/AddIngredient";
import UpdateIngredient from "../modal/UpdateIngredient";
const { Search } = Input;
const IngredientTable = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [dataRecord, setDataRecord] = useState();

  const handleUpdate = (record) => {
    // console.log(record);
    setModalUpdate(true);
    setDataRecord(record);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      dataIndex: "action",

      render: (value, record, index) => (
        <>
          <div style={{ display: "flex", gap: "5px" }}>
            <Button onClick={() => handleUpdate(record)}>
              <FaPencilAlt style={{ color: "#646465" }} />
            </Button>
          </div>
        </>
      ),
    },
  ];
  const data = [
    {
      id: "01",
      name: "Sugar",
      quantity: "10",
      type: "kg",
      price: "$1",
    },
    {
      id: "02",
      name: "Salt",
      quantity: "10",
      type: "kg",
      price: "$1.5",
    },
    {
      id: "03",
      name: "Powdered coffee",
      quantity: "10",
      type: "kg",
      price: "$2.5",
    },
    {
      id: "03",
      name: "Ice cubes",
      quantity: "10",
      type: "kg",
      price: "$2",
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
        <h2>Ingredient</h2>
        <div>
          <Search placeholder="Search" allowClear style={{ width: 500 }} />
        </div>
        <Button type="primary" onClick={() => setModalAdd(true)}>
          <FaPlus /> Add
        </Button>
      </div>
    );
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        title={render}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
      <AddIngredient
        modalAdd={modalAdd}
        setModalAdd={setModalAdd}
      ></AddIngredient>
      <UpdateIngredient
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
      ></UpdateIngredient>
    </>
  );
};

export default IngredientTable;
