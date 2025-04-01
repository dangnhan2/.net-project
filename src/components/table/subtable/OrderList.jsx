import { Button, Popconfirm, Table, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import SubAddOrder from "../../modal/submodal/SubAddOrder";
import { UserContext } from "../../../context/Context";

const OrderList = () => {
  const [openSubModal, setOpenSubModal] = useState(false);
  const { dishesOrder, setDishesOrder } = useContext(UserContext);

  const confirm = (record) => {
    setDishesOrder(dishesOrder.filter((item) => item.dishId !== record.dishId));
  };

  const cancel = (e) => {
    // console.log(e);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "dishId",
      key: "dishId",
    },
    {
      title: "Dish",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Action",
      dataIndex: "action",

      render: (value, record, index) => (
        <>
          <div style={{ display: "flex", gap: "5px" }}>
            <Popconfirm
              title="Delete dish"
              description="Do you want to delete this dish ?"
              placement="bottomRight"
              okText="Yes"
              cancelText="No"
              onConfirm={() => confirm(record)}
              onCancel={cancel}
            >
              <Button>
                <FaRegTrashAlt style={{ color: "#F38177" }} />
              </Button>
            </Popconfirm>
          </div>
        </>
      ),
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
        dataSource={dishesOrder}
        title={render}
        pagination={false}
      />
      <SubAddOrder
        openSubModal={openSubModal}
        setOpenSubModal={setOpenSubModal}
      ></SubAddOrder>
    </>
  );
};
export default OrderList;
