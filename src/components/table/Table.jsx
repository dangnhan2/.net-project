import { Button, Space, Table, Tag, Input } from "antd";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import AddTable from "../modal/AddTable";
import UpdateTable from "../modal/UpdateTable";
import { useState } from "react";
const { Search } = Input;
const T_Table = () => {
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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "tags",
      key: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color;
            if (tag === "Using") {
              color = "purple";
            }
            if (tag === "On hold") {
              color = "warning";
            }
            if (tag === "Empty") {
              color = "green";
            }
            if (tag === "Unavaliable") {
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
                {tag.toUpperCase()}
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
      number: "A01",
      capacity: 10,
      location: "Floor A",
      tags: ["Using"],
    },
    {
      id: "02",
      number: "A02",
      capacity: 8,
      location: "Floor A",
      tags: ["Unavaliable"],
    },
    {
      id: "03",
      number: "A03",
      capacity: 10,
      location: "Floor B",
      tags: ["On hold"],
    },
    {
      id: "04",
      number: "A04",
      capacity: 4,
      location: "Floor B",
      tags: ["Empty"],
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
        <h2>Supplier</h2>
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
      <AddTable modalAdd={modalAdd} setModalAdd={setModalAdd}></AddTable>
      <UpdateTable
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
      ></UpdateTable>
    </>
  );
};
export default T_Table;
