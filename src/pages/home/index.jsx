import React from "react";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { Layout, Menu, Button, Space } from "antd";

import Routes from "./routes";

import "./index.css";
import "../../static/iconfont.css";

export const Home = () => {
  const history = useHistory();
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [showTime, setShowTime] = useState("");

  // 实时获取时间
  function formateDate(time) {
    if (!time) return "";
    let date = new Date(time);
    return (
      date.getFullYear() +
      "年" +
      (date.getMonth() + 1) +
      "月" +
      date.getDate() +
      "日 " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds()
    );
  }

  // Home组件挂载时显示时间
  useEffect(() => {
    setInterval(() => {
      const currenTime = formateDate(new Date().getTime());
      setShowTime(currenTime);
    }, 1000);
  }, []);

  // logo点击动画
  const logoOpen = () => {
    setIsHidden(false);
    setIsOpen(true);
  };
  const logoClose = function (e) {
    e.stopPropagation();
    setIsOpen(false);
  };

  // 点击菜单函数
  const change = (e) => {
    history.push(`/home/${e.key}`);
  };
  return (
    <Layout className="homeBack">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" onClick={logoOpen}>
          <div className="logo-top">
            <i className="iconfont">&#xe62d;</i>
            <span>&nbsp;物流运输行业</span>
          </div>
          <div
            className={isOpen ? "down-logo-open" : "down-logo-close"}
            onClick={logoClose}
            hidden={isHidden}
          ></div>
        </div>
        <Menu
          theme="dark"
          // style={{ background: "rgb(31,42,61)" }}
          mode="inline"
          defaultSelectedKeys={["basic"]}
          onClick={change}
          items={[
            {
              key: "basic",
              label: "企业基本信息",
            },
            {
              key: "manage",
              label: "企业经营情况",
            },
            {
              key: "relevant",
              label: "企业相关问题",
            },
            {
              key: "solve",
              label: "解决方案及成本",
            },
            {
              key: "success",
              label: "成功案例",
            },
            {
              key: "detail",
              label: "详细介绍",
            },
            {
              key: "sign",
              label: "合同签订",
            },
          ]}
        />
        <div className="trigger" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <div className="head-left">{showTime}</div>
          <div className="head-right">
            <div className="head-right-img"></div>
            <div className="head-right-text">
              {/* 这里的具体信息要用参数实时获取 */}
              <div className="head-right-text-tittle">20230834</div>
              <div>张峰管理员</div>
            </div>
          </div>
        </Header>
        <Space
        style={{width:'99%',marginTop:'5px',justifyContent:"flex-end"}}>
          <Button className="saveBtn" type="primary" style={{borderRadius:'5px'}} size="small">保存</Button>
          <Button className="editBtn" style={{borderRadius:'5px'}} size="small">修改</Button>
        </Space>
        <Content
          className="site-layout-background"
          style={{
            margin: "5px 16px 0px 16px",
            padding: 0,
          }}
        >
          <Switch>
            {Routes.map((item) => (
              <Route path={item.path} component={item.component} />
            ))}
            <Redirect to="/home/basic" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};
