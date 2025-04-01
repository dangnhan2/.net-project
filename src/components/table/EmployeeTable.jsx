import { Button, Space, Table, Tag, Input, Popconfirm, App } from "antd";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddEmployee from "../modal/AddEmployee";
import UpdateEmployee from "../modal/UpdateEmployee";
import { deleteEmployee, getAllEmployee } from "../../api/api";
import EmployeeView from "../modal/view/EmployeeView";
const { Search } = Input;

const EmployeeTable = () => {
  const { message, notification } = App.useApp();
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [dataRecord, setDataRecord] = useState();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    let res = await getAllEmployee();

    if (res) {
      setEmployees(res);
    }
  };
  const handleUpdate = (record) => {
    setModalUpdate(true);
    setDataRecord(record);
  };

  const confirm = async (record, e) => {
    let res = await deleteEmployee(record.id);
    console.log(res);

    if (res) {
      message.success(res.message);
      getEmployees();
    } else {
      notification.error({
        message: "Action failed",
        description: "Xóa nhà cung cấp thất bại",
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
      render: (text, record) => (
        <a onClick={() => (setModalView(true), setDataRecord(record))}>
          {text}
        </a>
      ),
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          <Tag
            color={
              status === 0 ? "purple" : status === 1 ? "orange" : "default"
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
            {status === 0 ? "Working" : status === 1 ? "Lay-off" : "Unknown"}
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
              title="Delete Employee"
              description="Do you want to delete this employee ?"
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
        <h2>Employee</h2>
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
        dataSource={employees}
        title={render}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
      <AddEmployee
        modalAdd={modalAdd}
        setModalAdd={setModalAdd}
        getEmployees={getEmployees}
      ></AddEmployee>
      <UpdateEmployee
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
        getEmployees={getEmployees}
      ></UpdateEmployee>
      <EmployeeView
        modalView={modalView}
        setModalView={setModalView}
        dataRecord={dataRecord}
      ></EmployeeView>
    </>
  );
};
export default EmployeeTable;
