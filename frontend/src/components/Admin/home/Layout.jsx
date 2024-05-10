import { useState } from "react";
import { Breadcrumb, Layout, Menu, theme, Avatar, Dropdown, Input } from "antd";
import {
  TeamOutlined,
  GiftOutlined,
  FileTextOutlined,
  HomeOutlined,
  LogoutOutlined,
  BellOutlined,
  SearchOutlined,
  DollarOutlined 
} from "@ant-design/icons";

// dynamic change in content
import ShowFirst from "./ShowFirst";
import UserList from "../user/UserList";
import AdminCourse from "../../Course/Admin/AdminCourses";
import AddCourse from "../../Course/Instructor/AddCourse";
import Payment from "../../Payment/pages/Payment";

const { Header, Content, Sider } = Layout;

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

const Layouts = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
          overflow: "auto",
          height: "100vh",
          backgroundColor: "#001529",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "200px",
          gap: "16px",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          defaultOpenKeys={["sub1"]}
          style={{
            backgroundColor: "transparent",
            width: "100%",
            maxWidth: "240px",
            textAlign: "center",
          }}
          onClick={handleMenuClick}
          selectedKeys={[selectedKey]}
        >
          {/* Menu items */}
          <Menu.Item key="1" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          
            <Menu.Item key="3" icon={<FileTextOutlined/>}>Courses</Menu.Item>
            
         

          <Menu.Item icon={<TeamOutlined/>} key="6">Users</Menu.Item>

          <Menu.Item key="7" icon={<DollarOutlined />}>
            Payment
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search..."
            style={{ width: 200 }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <BellOutlined style={{ fontSize: 20 }} />
            <Dropdown overlay={userMenu}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  style={{
                    marginRight: 30,
                    containerSize: "40px",
                    containerShape: "circle",
                    backgroundColor: "pink",
                    verticalAlign: "middle",
                  }}
                >
                  JD
                </Avatar>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "16px",
            padding: "24px",
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            fontSize: "1.5rem",
            fontFamily: "Tahoma",
            fontWeight: "bold",
            overflowY: "auto",
            height: "calc(100vh - 64px)",
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Active</Breadcrumb.Item>
            <Breadcrumb.Item>Courses</Breadcrumb.Item>
          </Breadcrumb>
          {selectedKey === "1" && <ShowFirst />}
          {selectedKey === "3" && <AdminCourse />}
          {selectedKey === "4" && <AddCourse />}
          {selectedKey === "6" && <UserList />}
          {selectedKey === "7" && <Payment />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;