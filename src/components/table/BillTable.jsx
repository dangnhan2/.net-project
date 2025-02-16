import { Button, Table } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";

const BillTable = () => {
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
      title: "CUSTOMER",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "TABLE",
      dataIndex: "table",
      key: "table",
    },
    {
      title: "CREATED TIME",
      dataIndex: "created_time",
      key: "created_time",
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
    },
  ];
  const data = [
    {
      id: "01",
      customer: "Johan",
      table: "A02",
      created_time: "2022-01-01 10:00 PM",
      total: "$10",
    },
    {
      id: "02",
      customer: "Han",
      table: "A03",
      created_time: "2022-01-01 10:00 PM",
      total: "$10",
    },
    {
      id: "03",
      customer: "Sponge Bob",
      table: "A05",
      created_time: "2022-01-01 10:00 PM",
      total: "$10",
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
        <h2>Bill</h2>
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
      {/* <AddDish modalAdd={modalAdd} setModalAdd={setModalAdd}></AddDish>
      <UpdateDish
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
      ></UpdateDish> */}
    </>
  );
};
export default BillTable;
