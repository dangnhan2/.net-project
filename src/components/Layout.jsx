import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
const { Header, Sider, Content } = Layout;
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaTableCells } from "react-icons/fa6";
import { GiKnifeFork, GiThreeLeaves } from "react-icons/gi";
import { BiFoodMenu } from "react-icons/bi";
import { GoListOrdered } from "react-icons/go";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdDashboard, MdOutlineGroups2 } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
const items = [
  {
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
    key: "0",
  },
  {
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Đăng xuất
      </a>
    ),
    key: "1",
  },
];
const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            backgroundColor: "#FFFFFF",
            lineHeight: "64px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "20px", color: "#6E9CFB" }}>Mado</h1>
          <h1 style={{ fontSize: "20px" }}>Coffee</h1>
        </div>
        <Menu
          style={{
            height: "100%",
          }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "0",
              icon: <MdDashboard />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to="/customer">Customer</Link>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <Link to="/supplier">Supplier</Link>,
            },
            {
              key: "3",
              icon: <FaTableCells />,
              label: <Link to="/table">Table</Link>,
            },

            {
              key: "4",
              icon: <GiThreeLeaves />,
              label: <Link to="/ingredients">Ingredient</Link>,
            },

            {
              key: "5",
              icon: <GiKnifeFork />,
              label: <Link to="/dish">Dish</Link>,
            },

            {
              key: "6",
              icon: <BiFoodMenu />,
              label: <Link to="/menu">Menu</Link>,
            },

            {
              key: "7",
              icon: <GoListOrdered />,
              label: <Link to="/order">Order</Link>,
            },

            {
              key: "8",
              icon: <FaMoneyBillAlt />,
              label: <Link to="/bill">Bill</Link>,
            },

            {
              key: "9",
              icon: <MdOutlineGroups2 />,
              label: <Link to="/employee">Employee</Link>,
            },

            {
              key: "10",
              icon: <SlCalender />,
              label: <Link>Shift</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </div>
          <div style={{ marginRight: "100px" }}>
            <Dropdown
              menu={{
                items,
              }}
            >
              <div
                onClick={(e) => e.preventDefault()}
                style={{ cursor: "pointer" }}
              >
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  <span>Admin</span>
                  <DownOutlined style={{ color: "#58595A" }} />
                </Space>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            backgroundColor: "#F5F6FA",
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
