import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ category, to, className, subclassName }) => {
  const [path, setPath] = useState(to);

  useEffect(() => {
    let path = to;
    if (localStorage.getItem("product_name")) {
      path = path + `&productName=${localStorage.getItem("product_name")}`;
    }
    if (subclassName && subclassName.includes("active")) {
      path = "/products";
      if (localStorage.getItem("product_name")) {
        path = path + `?productName=${localStorage.getItem("product_name")}`;
      }
    }
    setPath(path)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subclassName, localStorage.getItem("product_name")]);

  return (
    <div className={`category-card-container ${className}`}>
      <Link to={path}>
        <div className={`category-card ${subclassName}`}>{category}</div>
      </Link>
    </div>
  );
};

export default CategoryCard;
