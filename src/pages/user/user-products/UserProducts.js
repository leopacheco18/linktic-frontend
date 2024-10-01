import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductsService from "../../../services/ProductsService";
import CategoryCard from "../../../components/user/category-card/CategoryCard";
import { Flex } from "antd";
import './UserProducts.css'
import ProductCard from "../../../components/common/ProductCard";

const UserProducts = () => {
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const productName = searchParams.get("productName");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false)

  const getProducts = async () => {
    setLoading(true)
    setProducts([]);
    let queryParam = `?status=true${
      categoryId ? `&categoryId=${categoryId}` : ""
    }${productName ? `&name=${productName}` : ""}`;
    const products = await ProductsService.getAll(queryParam);
    setProducts(products);
    setLoading(false)
  };

  const getCategories = async () => {
    const categories = await ProductsService.getCategories();
    setCategories(categories);
  };

  useEffect(() => {
    if(categoryId){
        localStorage.setItem('category_id', categoryId)
    }else{
        localStorage.removeItem('category_id')
    }

    if(productName){
        localStorage.setItem('product_name', productName)
    }else{
        localStorage.removeItem('product_name')
    }

    getCategories();
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, productName]);

  return (
    <div>
      <Flex gap={'1rem'}>
        {categories.map((item, index) => (
          <CategoryCard
            category={item.name}
            key={index}
            to={`/products?categoryId=${item.category_id}`}
            className={'category-all-products-container'}
            subclassName={`category-card-all-products ${item.category_id === categoryId && 'category-card-all-products-active'}`}
          />
        ))}
      </Flex>

      {products.length === 0 && loading === false && <div className="mt-4 text-left">
        <p>Aun no hay productos...</p></div>}

      <Flex wrap={"wrap"}>
        {products.map((item, index) => (
          <ProductCard
            key={index}
            product={item}
          />
        ))}
      </Flex>
    </div>
  );
};

export default UserProducts;
