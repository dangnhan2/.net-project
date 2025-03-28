import { Button, Space, Table, Tag, Input, Popconfirm, App } from "antd";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import UpdateSupplier from "../modal/UpdateSupplier";
import { useEffect, useState } from "react";
import AddSupplier from "../modal/AddSupplier";
import { deleteSupplier, getAllSuppliers } from "../../api/api";
const { Search } = Input;
const SupplierTable = () => {
  const { message, notification } = App.useApp();
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [dataRecord, setDataRecord] = useState();
  const [dataSuppliers, setDataSuppliers] = useState();
  const [sort, setSort] = useState("name=DESC");
  const [name, setName] = useState();

  console.log(sort);

  const handleUpdate = (record) => {
    setModalUpdate(true);
    setDataRecord(record);
  };

  const handleSearch = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    getSuppliers();
  }, [name, sort]);

  const getSuppliers = async () => {
    let query = sort;

    if (name) {
      query = `supplierName=${name}&${sort}`;
    }

    let res = await getAllSuppliers(query);
    if (res) {
      setDataSuppliers(res.data);
    }
  };

  const confirm = async (record, e) => {
    let res = await deleteSupplier(record.id);
    if (res) {
      message.success(res.message);
      getSuppliers();
    } else {
      notification.error({
        message: "Có lỗi đã xảy ra",
        description: "Xóa nhà cung cấp thất bại",
        duration: 3,
      });
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
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
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
      title: "Representative",
      dataIndex: "representative",
      key: "representative",
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
              title="Delete Supplier"
              description="Do you want to delete this supplier ?"
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
        <h2>Supplier</h2>
        <div>
          <Search
            placeholder="Search"
            allowClear
            style={{ width: 500 }}
            value={name}
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
        dataSource={dataSuppliers}
        title={render}
        onChange={handleTableChange}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
      <AddSupplier
        modalAdd={modalAdd}
        setModalAdd={setModalAdd}
        getSuppliers={getSuppliers}
      ></AddSupplier>
      <UpdateSupplier
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
        getSuppliers={getSuppliers}
      ></UpdateSupplier>
    </>
  );
};

export default SupplierTable;
