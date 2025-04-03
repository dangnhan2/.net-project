import { App, Button, Input, Popconfirm, Table, Tag } from "antd";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import AddMenu from "../modal/AddMenu";
import { useContext, useEffect, useState } from "react";
import UpdateMenu from "../modal/UpdateMenu";
import { deleteMenu, getAllMenus } from "../../api/api";
import { UserContext } from "../../context/Context";
import MenuView from "../modal/view/MenuView";
const { Search } = Input;
const MenuTable = () => {
  const { message, notification } = App.useApp();
  const { setDishes } = useContext(UserContext);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [dataRecord, setDataRecord] = useState();
  const [dataSearch, setDataSearch] = useState();
  const [dataMenu, setDataMenu] = useState();
  const [dataSort, setSort] = useState(`status=DESC`);

  const handleUpdate = (record) => {
    console.log(record);
    setModalUpdate(true);
    setDataRecord(record);
    setDishes(record.dishes);
  };

  const handleSearch = (e) => {
    setDataSearch(e.target.value);
  };

  useEffect(() => {
    getMenus();
  }, [dataSearch, dataSort]);

  const getMenus = async () => {
    let query = dataSort;

    if (dataSearch) {
      query = `name=${dataSearch}&${dataSort}`;
    }

    let res = await getAllMenus(query);
    console.log(res);
    if (res && res.statusCode === 200) {
      setDataMenu(res.data);
    }
  };

  const confirm = async (record, e) => {
    let res = await deleteMenu(record.id);
    if (res && res.statusCode === 200) {
      message.success(res.message);
      getMenus();
    }
  };

  const cancel = (e) => {
    // console.log(e);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    let query = "";
    if (sorter && sorter !== undefined) {
      query =
        sorter.order == "ascend"
          ? `?${sorter.field}=ASC`
          : `?${sorter.field}=DESC`;
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
      title: "Menu",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
      render: (status) => (
        <>
          <Tag
            color={status === 0 ? "red" : status === 1 ? "green" : "default"}
            style={{
              fontWeight: "bold",
              width: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {status === 0 ? "Inactive" : status === 1 ? "Active" : "Unknown"}
          </Tag>
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
            <Popconfirm
              title="Delete menu"
              description="Do you want to delete this menu ?"
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
        <h2>Menu</h2>
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
        dataSource={dataMenu}
        title={render}
        onChange={handleTableChange}
        pagination={{
          position: ["bottomCenter"],
        }}
      />

      <AddMenu
        modalAdd={modalAdd}
        setModalAdd={setModalAdd}
        getMenus={getMenus}
      ></AddMenu>

      <UpdateMenu
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
        getMenus={getMenus}
      ></UpdateMenu>

      <MenuView
        modalView={modalView}
        setModalView={setModalView}
        dataRecord={dataRecord}
      ></MenuView>
    </>
  );
};
export default MenuTable;
