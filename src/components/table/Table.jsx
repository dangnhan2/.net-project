import { Button, Space, Table, Tag, Input, Popconfirm, App } from "antd";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import AddTable from "../modal/AddTable";
import UpdateTable from "../modal/UpdateTable";
import { useEffect, useState } from "react";
import { deleteTable, getAllTables } from "../../api/api";
import TableView from "../modal/view/TableView";
const { Search } = Input;
const T_Table = () => {
  const { message, notification } = App.useApp();
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [dataRecord, setDataRecord] = useState();
  const [dataTable, setDataTable] = useState();
  const [dataSearch, setDataSearch] = useState();
  const [sort, setSort] = useState("capacity=DESC");
  console.log(sort);

  const handleUpdate = (record) => {
    setModalUpdate(true);
    setDataRecord(record);
  };

  const handleSearch = (e) => {
    setDataSearch(e.target.value);
  };

  useEffect(() => {
    getTables();
  }, [dataSearch, sort]);

  const getTables = async () => {
    let query = sort;

    if (dataSearch) {
      query = `tableNumber=${dataSearch}&${sort}`;
    }

    let res = await getAllTables(query);
    if (res) {
      setDataTable(res.data);
    }
  };

  const confirm = async (record, e) => {
    let res = await deleteTable(record.id);
    if (res) {
      message.success(res.message);
      getTables();
    }
  };

  const cancel = (e) => {
    // console.log(e);
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
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      sorter: true,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      render: (status) => (
        <>
          <Tag
            color={
              status === 0
                ? "purple"
                : status === 1
                ? "orange"
                : status === 2
                ? "green"
                : status === 3
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
              ? "On hold"
              : status === 1
              ? "Unavaliable"
              : status === 2
              ? "Using"
              : status === 3
              ? "Empty"
              : "Unknown"}
          </Tag>
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
            <Popconfirm
              title="Delete table"
              description="Do you want to delete this table ?"
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
        <h2>Table</h2>
        <div>
          <Search
            placeholder="Search"
            allowClear
            style={{ width: 500 }}
            value={dataSearch}
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
        dataSource={dataTable}
        title={render}
        onChange={handleTableChange}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
      <AddTable
        modalAdd={modalAdd}
        setModalAdd={setModalAdd}
        getTables={getTables}
      ></AddTable>
      <UpdateTable
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
        getTables={getTables}
      ></UpdateTable>
      <TableView
        modalView={modalView}
        setModalView={setModalView}
        dataRecord={dataRecord}
      ></TableView>
    </>
  );
};
export default T_Table;
