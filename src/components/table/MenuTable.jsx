import { Button, Input, Table, Tag } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import AddMenu from "../modal/AddMenu";
import UpdateMenu from "../modal/UpdateMenu";
const { Search } = Input;

const MenuTable = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [dataRecord, setDataRecord] = useState();

  const handleUpdate = (record) => {
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
      title: "Menu Name",
      dataIndex: "menuname",
      key: "menuname",
    },
    {
      title: "Status",
      dataIndex: "tags",
      key: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color;
            if (tag === "Active") {
              color = "green";
            }
            if (tag === "Inactive") {
              color = "red";
            }
            return (
              <Tag
                color={color}
                key={tag}
                style={{
                  fontWeight: "bold",
                  width: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
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
      title: "Description",
      dataIndex: "description",
      key: "description",
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
    { key: "1", id: "01", menuname: "Tet Festival", tags: ["Active"], description: "" },
    { key: "2", id: "02", menuname: "Winter Season", tags: ["Inactive"], description: "" },
    { key: "3", id: "03", menuname: "Summer Season", tags: ["Inactive"], description: "" },
    { key: "4", id: "04", menuname: "Autumn Season", tags: ["Inactive"], description: "" },
    { key: "5", id: "05", menuname: "Spring Season", tags: ["Active"], description: "" },
    { key: "6", id: "06", menuname: "Christmas Eve", tags: ["Inactive"], description: "" },
  ];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Menu</h2>
        <Search placeholder="Search" allowClear style={{ width: 500 }} />
        <Button type="primary" onClick={() => setModalAdd(true)}>
          <FaPlus /> Add
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["bottomCenter"] }}
      />
      <AddMenu modalAdd={modalAdd} setModalAdd={setModalAdd}></AddMenu>
      <UpdateMenu
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
      ></UpdateMenu>
    </>
  );
};

export default MenuTable;
