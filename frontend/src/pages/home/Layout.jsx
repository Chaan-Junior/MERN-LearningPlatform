import { useState } from "react";
import Flexing from "./Flexing";
import { Link } from "react-router-dom";
import {
  TeamOutlined,
  GiftOutlined,
  SnippetsOutlined,
  HomeOutlined,
  LogoutOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Avatar, Dropdown, Input } from "antd";

import PriceChart from "./PriceChart";
import ManualData from "./ManualData";

const { Header, Content, Sider } = Layout;

const Layouts = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
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
          items={[
            {
              key: "1",
              icon: (
                <HomeOutlined
                  style={{
                    fontSize: "18px",
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                />
              ),
              label: (
                <span
                  style={{
                    fontSize: "14px",
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Link to="/admin">Home</Link>
                </span>
              ),
              style: {
                marginBottom: "10px",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&:active": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              },
            },
            {
              key: "sub1",
              icon: (
                <SnippetsOutlined
                  style={{
                    fontSize: "18px",
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                />
              ),
              label: (
                <span
                  style={{
                    fontSize: "14px",
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                >
                  Courses
                </span>
              ),
              children: [
                {
                  key: "3",
                  label: (
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#fff",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Link to="/display">View</Link>
                    </span>
                  ),
                  style: {
                    marginBottom: "10px",
                    borderRadius: "5px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:active": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  },
                },
                {
                  key: "4",
                  label: (
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#fff",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Link to="/">Create</Link>
                    </span>
                  ),
                  style: {
                    marginBottom: "10px",
                    borderRadius: "5px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:active": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  },
                },
              ],
              style: {
                marginBottom: "10px",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&:active": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              },
            },
            {
              key: "sub2",
              icon: (
                <TeamOutlined
                  style={{
                    fontSize: "18px",
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                />
              ),
              label: (
                <span
                  style={{
                    fontSize: "14px",
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                >
                  Users
                </span>
              ),
              children: [
                {
                  key: "6",
                  label: (
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#fff",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Link to="/users">View</Link>
                    </span>
                  ),
                  style: {
                    marginBottom: "10px",
                    borderRadius: "5px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:active": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  },
                },
                {
                  key: "8",
                  label: (
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#fff",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Link to="/users/create">Create</Link>
                    </span>
                  ),
                  style: {
                    marginBottom: "10px",
                    borderRadius: "5px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:active": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  },
                },
              ],
              style: {
                marginBottom: "10px",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&:active": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              },
            },
            {
              key: "9",
              icon: (
                <GiftOutlined
                  style={{
                    fontSize: "18px",
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                />
              ),
              label: (
                <span
                  style={{
                    fontSize: "14px",
                    color: "#fff",
                    transition: "all 0.3s ease",
                  }}
                >
                  Folders
                </span>
              ),
              style: {
                marginBottom: "10px",
                borderRadius: "5px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "&:active": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              },
            },
          ]}
        />
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
          <h1>SUMMARY</h1>
          <br />
          <ManualData />
          <br />
          <h1>LATEST COURSES</h1>
          <br />
          <Flexing />
          <br />
          <h1>STATISTICS</h1>
          <br />
          <PriceChart />

          <br />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Layouts;
