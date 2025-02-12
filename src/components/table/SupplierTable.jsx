import { Button, Space, Table, Tag, Input } from "antd";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import UpdateSupplier from "../modal/UpdateSupplier";
import { useState } from "react";
import AddSupplier from "../modal/AddSupplier";
const { Search } = Input;
const SupplierTable = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [dataRecord, setDataRecord] = useState();

  const handleUpdate = (record) => {
    // console.log(record);
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
      title: "NAME",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "PHONE NO",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "REPRESENTATVIE",
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
            <Button>
              <FaRegTrashAlt style={{ color: "#F38177" }} />
            </Button>
          </div>
        </>
      ),
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
  ];
  const data = [
    {
      id: "01",
      name: "John Doe",
      phone: "0123456789",
      address: "New York No. 1 Lake Park",
      representative: "John Doe",
    },
    {
      id: "02",
      name: "John Doe",
      phone: "0123456789",
      address: "New York No. 1 Lake Park",
      representative: "John Doe",
    },
    {
      id: "02",
      name: "John Doe",
      phone: "0123456789",
      address: "New York No. 1 Lake Park",
      representative: "John Doe",
    },
    {
      id: "03",
      name: "John Doe",
      phone: "0123456789",
      address: "New York No. 1 Lake Park",
      representative: "John Doe",
    },
    // {
    //   key: "1",
    //   name: "John Brown",
    //   age: 32,
    //   address: "New York No. 1 Lake Park",
    //   tags: ["nice", "developer"],
    // },
    // {
    //   key: "2",
    //   name: "Jim Green",
    //   age: 42,
    //   address: "London No. 1 Lake Park",
    //   tags: ["loser"],
    // },
    // {
    //   key: "3",
    //   name: "Joe Black",
    //   age: 32,
    //   address: "Sydney No. 1 Lake Park",
    //   tags: ["cool", "teacher"],
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
        <h2>Supplier</h2>
        <div>
          <Search placeholder="Search" allowClear style={{ width: 500 }} />
        </div>
        <Button type="primary" onClick={() => setModalAdd(true)}>
          <FaPlus /> Add new
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
        pagination={{
          position: ["bottomCenter"],
        }}
      />
      <AddSupplier modalAdd={modalAdd} setModalAdd={setModalAdd}></AddSupplier>
      <UpdateSupplier
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
      ></UpdateSupplier>
    </>
  );
};

export default SupplierTable;
