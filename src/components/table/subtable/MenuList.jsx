import { Button, Table } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import SubAddMenu from "../../modal/submodal/SubAddMenu";

const MenuList = () => {
  const [openSubModal, setOpenSubModal] = useState(false);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "DISH",
      dataIndex: "dish",
      key: "dish",
    },
    {
      title: "DISCOUNT",
      dataIndex: "discount",
      key: "discount",
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
  const data = [];
  const render = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Menu's Dish List</h2>

        <Button type="primary" onClick={() => setOpenSubModal(true)}>
          <FaPlus /> Add dish to menu
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
        // pagination={{
        //   position: ["bottomCenter"],
        // }}
      />
      <SubAddMenu
        openSubModal={openSubModal}
        setOpenSubModal={setOpenSubModal}
      ></SubAddMenu>
    </>
  );
};
export default MenuList;
