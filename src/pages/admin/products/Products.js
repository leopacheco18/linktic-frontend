import React, { useEffect, useState } from "react";
import "./Products.css";
import ProductsService from "../../../services/ProductsService";
import { Button, Col, Flex, Row } from "antd";
import ProductCard from "../../../components/common/ProductCard";
import { PlusCircleOutlined, RollbackOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../../hooks/useCartContext";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setProducts([]);
    const products = await ProductsService.getAll();
    setProducts(products);
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
    getProducts();
    checkAdmin();
  }, []);

  return (
    <>
      <Flex align="center">
        <Link to={"/admin"}>
          <Button icon={<RollbackOutlined />}>Atras</Button>
        </Link>
        <h2 className="w-100">Productos</h2>
        <Link to={"/admin/product-create"}>
          <Button icon={<PlusCircleOutlined />}>Crear</Button>
        </Link>
      </Flex>
      <hr />
      <Flex wrap={"wrap"}>
        {products.map((item, index) => (
          <ProductCard key={index} product={item} isAdmin={true} />
        ))}
      </Flex>
    </>
  );
};

export default Products;
