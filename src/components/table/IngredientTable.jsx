import { Button, Space, Table, Tag, Input } from "antd";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddIngredient from "../modal/AddIngredient";
import UpdateIngredient from "../modal/UpdateIngredient";
import { getAllIngredients } from "../../api/api";
const { Search } = Input;
const IngredientTable = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [dataRecord, setDataRecord] = useState();
  const [ingredients, setIngredients] = useState();
  const [sort, setSort] = useState("price=DESC");
  const [search, setSearch] = useState();

  const handleUpdate = (record) => {
    setModalUpdate(true);
    setDataRecord(record);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    let query = "";
    if (sorter && sorter !== undefined) {
      query =
        sorter.order == "ascend"
          ? `${sorter.field}=ASC`
          : `${sorter.field}=DESC`;
    }
    setSort(query);
  };

  useEffect(() => {
    getIngredients();
  }, [search, sort]);

  const getIngredients = async () => {
    let query = sort;

    if (search) {
      query = `ingredientName=${search}&${sort}`;
    }

    let res = await getAllIngredients(query);
    if (res && res.statusCode === 200) {
      setIngredients(res.data);
    }
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
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit Type",
      dataIndex: "unitType",
      key: "unitType",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: true,
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
        <h2>Ingredient</h2>
        <div>
          <Search
            placeholder="Search"
            allowClear
            style={{ width: 500 }}
            value={search}
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
        dataSource={ingredients}
        title={render}
        onChange={handleTableChange}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
      <AddIngredient
        modalAdd={modalAdd}
        setModalAdd={setModalAdd}
        getIngredients={getIngredients}
      ></AddIngredient>

      <UpdateIngredient
        modalUpdate={modalUpdate}
        setModalUpdate={setModalUpdate}
        dataRecord={dataRecord}
        getIngredients={getIngredients}
      ></UpdateIngredient>
    </>
  );
};

export default IngredientTable;
