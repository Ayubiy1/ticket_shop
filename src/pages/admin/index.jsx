import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { useLocalStorageState } from "ahooks";
import { TbBasketDollar } from "react-icons/tb";
import { IoTicketSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const [collapsed, setCollapsed] = useLocalStorageState("collapsed", {
    defaultValue: false,
  });
  const [menu, setMenu] = useLocalStorageState("collapsed", {
    defaultValue: "tickets",
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="h-[100vh]"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[`${menu}`]}
          items={[
            {
              key: "tickets",
              icon: <IoTicketSharp />,
              label: "Tickets",
              onClick: () => {
                navigate("tickets");
                setMenu("tickets");
              },
            },
            {
              key: "tickets-sold",
              icon: <TbBasketDollar />,
              label: "Tickets sold",
              onClick: () => {
                navigate("tickets-sold");
                setMenu("tickets-sold");
              },
            },
            {
              key: "users",
              icon: <FaUsers />,
              label: "Users",
              onClick: () => {
                navigate("users");
                setMenu("users");
              },
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
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
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
