import { Button, Space, Table, Input, App, Popconfirm } from "antd";
import { FaPencilAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddDish from "../modal/AddDish";
import UpdateDish from "../modal/UpdateDish";
import { deleteDish, getAllDishes } from "../../api/api";
const { Search } = Input;
const DishTable = () => {
  const { message, notification } = App.useApp();
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [dataRecord, setDataRecord] = useState();
  const [dataDishes, setDataDishes] = useState();
  const handleUpdate = (record) => {
    console.log(record);
    setModalUpdate(true);
    setDataRecord(record);
  };

  useEffect(() => {
    getDishes();
  }, []);

  const getDishes = async () => {
    let res = await getAllDishes();
    if (res) {
      setDataDishes(res);
    }
  };

  const confirm = async (record, e) => {
    let res = await deleteDish(record.id);
    if (res) {
      message.success("Xóa món ăn thành công");
      getDishes();
    } else {
      notification.error({
        message: "Có lỗi đã xảy ra",
        description: "Xóa món ăn thất bại",
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
      title: "Image",
      dataIndex: " imageUrl",
      width: 400,
      render: (_, record) => (
        <img
          src={`${import.meta.env.VITE_IMAGE_URL}images/${record.imageUrl}`}
          alt={record.dish}
          style={{ height: "10%", width: "15%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
              title="Xóa món ăn"
              description="Bạn có muốn xóa món ăn này ?"
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
        <h2>Dish</h2>
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
        dataSource={dataDishes}
        title={render}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
      <AddDish
        modalAdd={modalAdd}
        setModalAdd={setModalAdd}
        getDishes={getDishes}
      ></AddDish>
      <UpdateDish
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
        getDishes={getDishes}
      ></UpdateDish>
    </>
  );
};
export default DishTable;
