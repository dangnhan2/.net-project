import { App, Button, Input, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import AddCustomer from "../modal/AddCustomer";
import UpdateCustomer from "../modal/UpdateCustomer";
import { deleteCustomer, getAllCustomer } from "../../api/api";
const { Search } = Input;

const CustomerTable = () => {
  const { message, notification } = App.useApp();
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [dataRecord, setDataRecord] = useState();
  const [dataCustomer, setDataCustomer] = useState([]);
  const handleUpdate = (record) => {
    // console.log(record);
    setModalUpdate(true);
    setDataRecord(record);
  };

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    let data = await getAllCustomer();
    if (data) {
      setDataCustomer(data.data);
      console.log(data);
    }
  };

  const confirm = async (record, e) => {
    let res = await deleteCustomer(record.id);
    console.log(res);
    if (res) {
      message.success(res.message);
      getCustomer();
    } else {
      notification.error({
        message: "Có lỗi đã xảy ra",
        description: "Xóa người dùng thất bại",
        duration: 3,
      });
    }
  };
  const cancel = (e) => {
    // console.log(e);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
              title="Xóa người dùng"
              description="Bạn có muốn xóa người dùng này ?"
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
        <h2>Customer</h2>
        <div>
          <Search placeholder="Search" allowClear style={{ width: 500 }} />
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
        dataSource={dataCustomer}
        title={render}
        pagination={{
          position: ["bottomCenter"],
        }}
      />

      <AddCustomer
        modalAdd={modalAdd}
        setModalAdd={setModalAdd}
        getCustomer={getCustomer}
      ></AddCustomer>
      <UpdateCustomer
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
        getCustomer={getCustomer}
      ></UpdateCustomer>
    </>
  );
};

export default CustomerTable;
