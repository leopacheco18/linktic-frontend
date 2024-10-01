import React, { useEffect } from "react";
import "./Home.css";
import { Flex } from "antd";
import Option from "../../../components/admin/option/Option";
import Products from "../../../assets/img/products.jpg";
import Orders from "../../../assets/img/orders.jpg";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../../hooks/useCartContext";

const Home = () => {
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
    checkAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Flex
      justify="center"
      align="center"
      gap={"25px"}
      className="option-container"
    >
      <Option to={"/admin/products"} text={"Productos"} image={Products} />
      <Option to={"/admin/orders"} text={"Ordenes"} image={Orders} />
    </Flex>
  );
};

export default Home;
