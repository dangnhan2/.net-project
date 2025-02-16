import { Button, Table, Tag } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import SubAddOrder from "../../modal/submodal/SubAddOrder";

const OrderList = () => {
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
      title: "DISH",
      dataIndex: "dish",
      key: "dish",
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "TOTAL AMOUNT",
      dataIndex: "total_amount",
      key: "total_amount",
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
        <h2>Order's Dish List</h2>

        <Button type="primary" onClick={() => setOpenSubModal(true)}>
          <FaPlus /> Add dish to order
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
      <SubAddOrder
        openSubModal={openSubModal}
        setOpenSubModal={setOpenSubModal}
      ></SubAddOrder>
    </>
  );
};
export default OrderList;
