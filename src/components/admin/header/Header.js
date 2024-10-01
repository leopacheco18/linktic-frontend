import React from "react";
import "./Header.css";
import logo from "../../../assets/img/logo-linktic.svg";
import { Button, Divider } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Divider className="divider">
        <Link to={"/admin"}>
          <img src={logo} alt="logo-linktic" />
        </Link>
      </Divider>
      <Link to={'/'}><Button className="btn-header-admin" size="small">Volver</Button></Link>
    </>
  );
};

export default Header;
