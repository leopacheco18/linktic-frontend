import React, { useEffect, useState } from "react";
import "./Orders.css";
import OrdersService from "../../../services/OrdersService";
import { Button, Flex, Table } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../../hooks/useCartContext";

const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index'
    },
    {
      title: 'Total',
      render: (_, { total }) => (
        <>
          {(+total).toFixed(2)}
        </>
      )
    },
    {
      title: 'Comprador',
      render: (_, { buyer }) => (
        <>
          {buyer.email}
        </>
      ),
    },
    {
      title: 'Cantidad de productos',
      render: (_, { orderProducts }) => (
        <>
          {orderProducts.reduce((acc, item) => acc + item.quantity, 0)}
        </>
      ),
    },
  ];

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    setOrders([]);
    const orders = await OrdersService.getAll();
    setOrders(orders.map((item, index) => ({...item, index: (index + 1)})));
  };

  const navigate = useNavigate();
  const { isAdmin, checkLogged } = useCartContext();
  const checkAdmin = async () => {
    const admin = await isAdmin();
    if (!admin) {
      localStorage.removeItem("token");
      checkLogged();
      navigate("/");
    }
  };

  useEffect(() => {
    getOrders();
    checkAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Flex align="center">
        <Link to={'/admin'}>
        <Button icon={<RollbackOutlined />}>Atras</Button></Link>
        <h2 className="w-100">Ordenes</h2>
      </Flex>
      <hr />
      <Table columns={columns} dataSource={orders} bordered />
    </>
  );
};

export default Orders;
