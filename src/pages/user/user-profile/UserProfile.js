import React, { useEffect, useState } from "react";
import OrdersService from "../../../services/OrdersService";
import { Button, Flex, Table } from "antd";
import { useCartContext } from "../../../hooks/useCartContext";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";

const columns = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Total",
    render: (_, { total }) => <>{(+total).toFixed(2)}</>,
  },
  {
    title: "Comprador",
    render: (_, { buyer }) => <>{buyer.email}</>,
  },
  {
    title: "Cantidad de productos",
    render: (_, { orderProducts }) => (
      <>{orderProducts.reduce((acc, item) => acc + item.quantity, 0)}</>
    ),
  },
];

const UserProfile = () => {
  const [orders, setOrders] = useState([]);
  const { checkLogged, isAdmin } = useCartContext();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState();

  const getOrders = async () => {
    setOrders([]);
    const orders = await OrdersService.filter();
    setOrders(orders.map((item, index) => ({ ...item, index: index + 1 })));
  };

  const checkAdmin = async () => {
    try {
        setAdmin(await isAdmin());
    } catch (error) {}
  };

  useEffect(() => {
    getOrders();
    checkAdmin();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    checkLogged();
    navigate("/");
  };

  return (
    <>
      <Flex align="center">
        <h2 className="w-100">Mis Ordenes</h2>
      </Flex>
      <Flex
      gap={'20px'}
      justify="center"
      align="center"
      wrap={'wrap'}>
      <Button onClick={logout}>Cerrar sesión</Button>
      {admin && <Link to={'/admin'}><Button>Administrador</Button></Link>}
      </Flex>
      <hr />
      <Table columns={columns} dataSource={orders} bordered />
    </>
  );
};

export default UserProfile;
