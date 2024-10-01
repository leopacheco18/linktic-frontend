import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../hooks/useCartContext";

const ProductCard = ({ product, isAdmin }) => {

  const { addToCart } = useCartContext();

  return (
    <div className="product-card-container">
      <Card
        hoverable
        style={{
          width: "100%",
          borderRadius: "0",
          position: "relative",
        }}
        cover={<img style={{objectFit: 'contain', height: '100%'}} alt="example" src={product.url_image} />}
      >
        <div className="product-card-category">{product.category.name}</div>
        <Meta
          style={{ textAlign: "left" }}
          title={product.name}
          description={
            <>
              $ {product.price} <br /> Cantidad: {product.quantity}
            </>
          }
        />
        <br />
        {isAdmin && <Link to={`/admin/product-edit/${product.product_id}`}><Button>Editar</Button></Link>}


        {!isAdmin && <Button block onClick={() => addToCart(product)} disabled={+product.quantity === 0}>Agregar al carrito</Button>}
      </Card>
    </div>
  );
};

export default ProductCard;
