import { Button, Table, Input, Tag } from "antd";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddOrder from "../modal/AddOrder";
import UpdateOrder from "../modal/UpdateOrder";
import { getAllOrders } from "../../api/api";
import dayjs from "dayjs";
import OrderView from "../modal/view/OrderView";
const { Search } = Input;

const OrderTable = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [dataSort, setSort] = useState("status=DESC");
  const [dataSearch, setDataSearch] = useState();
  const [orders, setOrders] = useState();
  const [dataRecord, setDataRecord] = useState();

  const handleUpdate = (record) => {
    console.log(record);
    setModalUpdate(true);
    setDataRecord(record);
  };

  const handleSearch = (e) => {
    setDataSearch(e.target.value);
  };

  useEffect(() => {
    getOrders();
  }, [dataSearch, dataSort]);

  const getOrders = async () => {
    let query = dataSort;

    if (dataSearch) {
      query = `name=${dataSearch}&${dataSort}`;
    }

    let res = await getAllOrders(query);
    if (res && res.statusCode === 200) {
      setOrders(res.data);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(sorter);
    let query = "";
    if (sorter && sorter !== undefined) {
      query =
        sorter.order == "ascend"
          ? `${sorter.field}=ASC`
          : `${sorter.field}=DESC`;
    }
    setSort(query);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <a onClick={() => (setModalView(true), setDataRecord(record))}>
          {text}
        </a>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
      sorter: true,
    },
    {
      title: "Table",
      dataIndex: "tableNumber",
      key: "tableNumber",
    },
    {
      title: "Price",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Booking Time",
      dataIndex: "bookingTime",
      key: "bookingTime",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          <Tag
            color={
              status === 0
                ? "orange"
                : status === 1
                ? "green"
                : status === 2
                ? "red"
                : "default"
            }
            style={{
              fontWeight: "bold",
              width: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {status === 0
              ? "Pending"
              : status === 1
              ? "Completed"
              : status === 2
              ? "Rejected"
              : "Billed"}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",

      render: (value, record, index) => (
        <>
          {record.status === 0 || record.status === 1 || record.status === 2 ? (
            <div style={{ display: "flex", gap: "5px" }}>
              <Button onClick={() => handleUpdate(record)}>
                <FaPencilAlt style={{ color: "#646465" }} />
              </Button>
            </div>
          ) : (
            ""
          )}
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
        <h2>Order</h2>
        <div>
          <Search
            value={dataSearch}
            placeholder="Search"
            allowClear
            style={{ width: 500 }}
            onChange={handleSearch}
          />
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
        dataSource={orders}
        onChange={handleTableChange}
        title={render}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
      <AddOrder
        modalAdd={modalAdd}
        setModalAdd={setModalAdd}
        getOrders={getOrders}
      ></AddOrder>

      <UpdateOrder
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
        getOrders={getOrders}
      ></UpdateOrder>

      <OrderView
        modalView={modalView}
        setModalView={setModalView}
        dataRecord={dataRecord}
      ></OrderView>
    </>
  );
};
export default OrderTable;
