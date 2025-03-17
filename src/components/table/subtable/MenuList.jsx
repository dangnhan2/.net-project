import { Button, Table, Tag } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import SubAddMenu from "../../modal/submodal/SubAddMenu";

const MenuList = () => {
  const [openSubModal, setOpenSubModal] = useState(false);

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
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Dish Name",
      dataIndex: "dishname",
      key: "dishname",
    },
    {
      title: "Discount",
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
  const data = [
    // {
    //   id: "01",
    //   customer: "Johan",
    //   table: "A02",
    //   price: "$20",
    //   time: "12:53 PM",
    //   tags: ["Completed"],
    // },
    // {
    //   id: "02",
    //   customer: "Han",
    //   table: "A03",
    //   price: "$20",
    //   time: "10:53 PM",
    //   tags: ["Pending"],
    // },
    // {
    //   id: "03",
    //   customer: "Sponge Bob",
    //   table: "A04",
    //   price: "$20",
    //   time: "12:55 AM",
    //   tags: ["Rejected"],
    // },
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
