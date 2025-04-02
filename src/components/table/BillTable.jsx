import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import AddBill from "../modal/AddBill";
import dayjs from "dayjs";
import { getAllBills } from "../../api/api";

const BillTable = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    getBills();
  }, []);

  const getBills = async () => {
    let res = await getAllBills();

    if (res) {
      setData(res);
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "CUSTOMER",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "TABLE",
      dataIndex: "tableNumber",
      key: "tableNumber",
    },
    {
      title: "CREATED TIME",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
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

      <AddBill
        modalAdd={modalAdd}
        setModalAdd={setModalAdd}
        getBills={getBills}
      ></AddBill>
    </>
  );
};
export default BillTable;
