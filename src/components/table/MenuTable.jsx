import { Button, Table, Tag, Input } from "antd";
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
    const menuList = [
      { id: "01", dish: "American Coffee", discount: "0.2" },
      { id: "02", dish: "American Coffee", discount: "0.2" },
    ];
    record.menuList = menuList;
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
      title: "MENU",
      dataIndex: "menu",
      key: "menu",
    },
    {
      title: "STATUS",
      dataIndex: "tags",
      key: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color;
            if (tag === "Active") {
              color = "success";
            }
            if (tag === "In-Active") {
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
      title: "DESCRIPTION",
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
    {
      id: "01",
      menu: "Tet Festival",
      tags: ["Active"],
      description:
        "Tet Festival is a festival that takes place in Tet, the Chinese New Year's Festival.",
    },
    {
      id: "02",
      menu: "Winter Season",
      tags: ["In-Active"],
      description:
        "Winter Season is a season of cold and snow in China, with temperatures dropping to -40°C (-40°F) during the winter months.",
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
