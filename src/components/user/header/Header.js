import React, { useState } from "react";
import "./Header.css";
import logo from "../../../assets/img/logo-linktic.svg";
import { Button, Divider, Flex, Form, Input, message, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useCartContext } from "../../../hooks/useCartContext";
import AuthService from "../../../services/AuthService";
const { Search } = Input;

const Header = () => {
  const navigate = useNavigate();
  const { getTotalProducts, isLogged, checkLogged } = useCartContext();

  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const showModal = () => {
    setShowLogin(true);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const search = (value) => {
    const categoryId = localStorage.getItem("category_id");
    let path = "";
    if (value) {
      path = `/products?productName=${value}${
        categoryId ? `&categoryId=${categoryId}` : ""
      }`;
    } else {
      path = `/products${categoryId ? `?categoryId=${categoryId}` : ""}`;
    }
    navigate(path);
  };
  const login = (values) => {
    loginRequest(values.email, values.password);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const register = async (values) => {
    await AuthService.register(values);
    loginRequest(values.email, values.password);
  };

  const loginRequest = async (email, password) => {
    try {
      const response = await AuthService.login({ email, password });
      localStorage.setItem("token", response.access_token);
      handleCancel();
      checkLogged();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Credenciales incorrectas",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Modal
        title={showLogin ? "Iniciar sesion" : "Registrarse"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {showLogin && (
          <Form
            name="basic"
            onFinish={login}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Correo"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu correo!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Clave"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu clave!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Flex gap={"20px"} justify="end">
              <Form.Item className="text-right">
                <Button htmlType="button" onClick={() => setShowLogin(false)}>
                  Registrate
                </Button>
              </Form.Item>
              <Form.Item className="text-right">
                <Button type="primary" htmlType="submit">
                  Iniciar sesion
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        )}

        {!showLogin && (
          <Form
            name="basic"
            onFinish={register}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Correo"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu correo!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Clave"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu clave!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirmar Clave"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Por favor confirma tu calve!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Las claves no coinciden!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Flex gap={"20px"} justify="end">
              <Form.Item className="text-right">
                <Button htmlType="button" onClick={() => setShowLogin(true)}>
                  Inicia Sesión
                </Button>
              </Form.Item>
              <Form.Item className="text-right">
                <Button type="primary" htmlType="submit">
                  Registrate
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        )}
      </Modal>
      <Divider className="divider-user">
        <Link to={"/"}>
          <img src={logo} alt="logo-linktic" />
        </Link>
      </Divider>

      <Flex
        justify="center"
        align="center"
        gap={"20px"}
        style={{ marginBottom: "10px", padding: "0 10px" }}
      >
        {isLogged ? (
          <Link to={"/profile"}>
            <Button className="cart-btn">
              <UserOutlined />
            </Button>
          </Link>
        ) : (
          <Button className="cart-btn" onClick={showModal}>
            <LoginOutlined />
          </Button>
        )}
        <Search
          placeholder="Buscar..."
          onSearch={search}
          className="user-search"
        />
        <Link to={"/cart"}>
          <Button className="cart-btn">
            <div className="cart-btn-badge">{getTotalProducts()}</div>
            <ShoppingCartOutlined />
          </Button>
        </Link>
      </Flex>
    </>
  );
};

export default Header;
