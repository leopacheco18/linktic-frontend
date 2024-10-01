import { Flex } from "antd";
import React, { useEffect, useState } from "react";
import ProductsService from "../../../services/ProductsService";
import CategoryCard from "../../../components/user/category-card/CategoryCard";

const UserHome = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const categories = await ProductsService.getCategories();
    setCategories(categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2 className="w-100">Categorias</h2>
      <hr />

      <Flex wrap="wrap">
        {categories.map((item, index) => (
          <CategoryCard
            category={item.name}
            key={index}
            to={`/products?categoryId=${item.category_id}`}
          />
        ))}
      </Flex>
    </>
  );
};

export default UserHome;
