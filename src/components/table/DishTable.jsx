import { Button, Space, Table, Input } from "antd";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import coffee1 from "../../img/coffee1.jpg";
import beer from "../../img/beer.jpg";
import tea from "../../img/tea.jpg";
import AddDish from "../modal/AddDish";
import UpdateDish from "../modal/UpdateDish";
const { Search } = Input;
const DishTable = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [dataRecord, setDataRecord] = useState();

  const handleUpdate = (record) => {
    console.log(record);
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
      title: "IMAGE",
      dataIndex: "image",
      render: (_, record) => (
        <img
          src={`${record.image}`}
          alt={record.dish}
          style={{ height: "10%", width: "15%" }}
        />
      ),
    },
    {
      title: "DISH",
      dataIndex: "dish",
      key: "dish",
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
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
            <Button>
              <FaRegTrashAlt style={{ color: "#F38177" }} />
            </Button>
          </div>
        </>
      ),
    },
  ];
  const data = [
    {
      id: "01",
      image: coffee1,
      dish: "Detox",
      category: "Coffee",
      price: "$1",
    },
    {
      id: "02",
      image: tea,
      dish: "Green Tea",
      category: "Tea",
      price: "$1.5",
    },
    {
      id: "03",
      image: beer,
      dish: "Blue Berry",
      category: "Beer",
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
          <FaPlus /> Add new
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
      <AddDish modalAdd={modalAdd} setModalAdd={setModalAdd}></AddDish>
      <UpdateDish
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
      ></UpdateDish>
    </>
  );
};
export default DishTable;
