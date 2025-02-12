import { Button, Space, Table, Tag, Input } from "antd";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import AddEmployee from "../modal/AddEmployee";
import UpdateEmployee from "../modal/UpdateEmployee";
const { Search } = Input;
const EmployeeTable = () => {
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
      title: "ROLE",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "STATUS",
      dataIndex: "tags",
      key: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color;
            if (tag === "Working") {
              color = "purple";
            }
            if (tag === "Lay-off") {
              color = "warning";
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
      fullname: "Sponge Bob",
      phone: "0123456789",
      role: "Staff",
      tags: ["Working"],
    },
    {
      id: "02",
      fullname: "Steve",
      phone: "0123456789",
      role: "Staff",
      tags: ["Working"],
    },
    {
      id: "03",
      fullname: "Squarepant",
      phone: "0123456789",
      role: "Staff",
      tags: ["Lay-off"],
    },
    {
      id: "04",
      fullname: "SeiBob",
      phone: "0123456789",
      role: "Manage",
      tags: ["Working"],
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
      <AddEmployee modalAdd={modalAdd} setModalAdd={setModalAdd}></AddEmployee>
      <UpdateEmployee
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
      ></UpdateEmployee>
    </>
  );
};
export default EmployeeTable;
