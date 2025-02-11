import { Button, Input, Table } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import AddCustomer from "../modal/AddCustomer";
import UpdateCustomer from "../modal/UpdateCustomer";
const { Search } = Input;

const UserTable = () => {
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
      title: "FULL NAME",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "PHONE NO",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
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
      key: "1",
      id: "01",
      fullname: "Mike",
      phone: "0123456789",
      address: "10 Downing Street",
    },
    {
      key: "2",
      id: "02",
      fullname: "SpongeBob",
      phone: "0123456789",
      address: "Wall Street",
    },
    {
      key: "3",
      id: "03",
      fullname: "Steve",
      phone: "0123456789",
      address: "Paramoutheast",
    },
    {
      key: "4",
      id: "04",
      fullname: "SpongeBob Squarepants",
      phone: "0123456789",
      address: "Madagascar",
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
        <h2>Customer</h2>
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

      <AddCustomer modalAdd={modalAdd} setModalAdd={setModalAdd}></AddCustomer>
      <UpdateCustomer
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
      ></UpdateCustomer>
    </>
  );
};

export default UserTable;
