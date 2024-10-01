import { Col, Layout, Row } from "antd";
import { Content, Header as HeaderAntd } from "antd/es/layout/layout";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/user/header/Header";

const MainLayout = () => {
  return (
    <Layout>
        <HeaderAntd className="layout-header">
          <Header />
        </HeaderAntd>
        <Content>
          <Row>
            <Col md={18} offset={3} xs={18}>
              <div className="layout-content">
                <Outlet />
              </div>
            </Col>
          </Row>
        </Content>
    </Layout>
  );
};

export default MainLayout;
