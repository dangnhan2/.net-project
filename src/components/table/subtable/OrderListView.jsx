import { useContext, useState } from "react";
import { UserContext } from "../../../context/Context";
import { Table } from "antd";

const OrderListView = (props) => {
  const { dishes } = props;

  const columns = [
    {
      title: "ID",
      dataIndex: "dishID",
      key: "dishID",
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
      </div>
    );
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={dishes}
        title={render}
        pagination={false}
      />
    </>
  );
};

export default OrderListView;
