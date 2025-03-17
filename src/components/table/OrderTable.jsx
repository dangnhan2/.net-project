import { Button, Space, Table, Input, Tag } from "antd";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import AddOrder from "../modal/AddOrder";
import UpdateOrder from "../modal/UpdateOrder";
const { Search } = Input;
const OrderTable = () => {
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
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Table",
      dataIndex: "table",
      key: "table",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Booking Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "tags",
      key: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color;
            if (tag === "Completed") {
              color = "success";
            }
            if (tag === "Pending") {
              color = "warning";
            }
            if (tag === "Rejected") {
              color = "red";
            }
            return (
              <Tag
                color={color}
                key={tag}
                style={{
                  fontWeight: "bold",
                }}
              >
                {tag}
              </Tag>
            );
          })}
        </>
      ),
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
      customer: "Johan",
      table: "A02",
      price: "$20",
      time: "12:53 PM",
      tags: ["Completed"],
    },
    {
      id: "02",
      customer: "Han",
      table: "A03",
      price: "$20",
      time: "10:53 PM",
      tags: ["Pending"],
    },
    {
      id: "03",
      customer: "Sponge Bob",
      table: "A04",
      price: "$20",
      time: "12:55 AM",
      tags: ["Rejected"],
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
        <h2>Order</h2>
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
      <AddOrder modalAdd={modalAdd} setModalAdd={setModalAdd}></AddOrder>
      <UpdateOrder
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
      ></UpdateOrder>
    </>
  );
};
export default OrderTable;
