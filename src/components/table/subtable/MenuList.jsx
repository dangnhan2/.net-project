import { Button, Popconfirm, Table, Tag } from "antd";
import { useContext, useState } from "react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import SubAddMenu2 from "../../modal/submodal/SubAddMenu2";
import { UserContext } from "../../../context/Context";

const MenuList = () => {
  const [openSubModal, setOpenSubModal] = useState(false);
  const { dishes, setDishes } = useContext(UserContext);

  console.log(dishes);

  const confirm = (record, e) => {
    setDishes(dishes.filter((item) => item.id !== record.id));
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
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (_, record) => {
        console.log(record);

        <img
          src={`${import.meta.env.VITE_IMAGE_URL}images/${record.imgUrl}`}
          alt={record.name}
          style={{ height: "20%", width: "15%" }}
        />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Action",
      dataIndex: "action",

      render: (value, record, index) => (
        <>
          <div style={{ display: "flex", gap: "5px" }}>
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
        dataSource={dishes}
        title={render}
        pagination={false}
      />
      <SubAddMenu2
        openSubModal={openSubModal}
        setOpenSubModal={setOpenSubModal}
      ></SubAddMenu2>
    </>
  );
};
export default MenuList;
