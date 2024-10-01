import React, { useState } from "react";
import "./Cart.css";
import { useCartContext } from "../../../hooks/useCartContext";
import {
  Button,
  Col,
  Flex,
  Image,
  InputNumber,
  Row,
  message,
} from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import OrdersService from "../../../services/OrdersService";

const Cart = () => {
  const { getTotalProducts, cart, changeQuantity, removeFromCart, emptyCart } =
    useCartContext();

  const [messageApi, contextHolder] = message.useMessage();
  const [blockBtn, setBlockBtn] = useState(false);
  const navigate = useNavigate();

  const generateOrder = async () => {
    const body = {
      total: cart.reduce((acc, item) => acc + +item.price * +item.quantity, 0),
      buyerId: 1,
      orderProducts: cart.map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
      })),
    };
    setBlockBtn(true);

    try {
      await OrdersService.create(body);
      messageApi.open({
        type: "success",
        content: "Orden creada satisfactoriamente!",
        duration: 2,
      });
      setTimeout(() => {
        emptyCart();
        navigate("/products");
      }, 2250);
    } catch (error) {
      setBlockBtn(false);
      messageApi.open({
        type: "error",
        content: "Algo salio mal",
      });
    }
  };

  return (
    <div>
      {contextHolder}
      <h2> Carrito de compras ({getTotalProducts()} productos)</h2>

      <br />
      <Row>
        <Col className="text-left" md={14}>
          <h4>Producto</h4>
        </Col>
        <Col className="text-left" md={3}>
          <h4>Precio</h4>
        </Col>
        <Col className="text-center" md={3}>
          <h4>Cantidad</h4>
        </Col>
        <Col className="text-right" md={4}>
          <h4>Total</h4>
        </Col>
        <Col md={24}>
          <hr />
        </Col>

        {cart.map((item, index) => (
          <React.Fragment key={index}>
            <Col className="text-left " md={14}>
              <Flex gap={"20px"}>
                <Image src={item.url_image} alt="product" width={"15%"} />
                <div className="vertically-center" style={{ width: "75%" }}>
                  <div>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <p>Cantidad: {item.quantityAvailible}</p>
                  </div>
                </div>
              </Flex>
            </Col>
            <Col className="vertically-center" md={3}>
              <p>$ {(+item.price).toFixed(2)}</p>
            </Col>
            <Col
              className="text-center vertically-center justify-center"
              md={3}
            >
              <h6>
                <InputNumber
                  value={+item.quantity}
                  step={1}
                  min={1}
                  max={+item.quantityAvailible}
                  onChange={(e) => changeQuantity(item.product_id, e)}
                ></InputNumber>
              </h6>
            </Col>
            <Col className="text-right vertically-center justify-end" md={3}>
              <p>
                <b>$ {(+item.price * +item.quantity).toFixed(2)} </b>
              </p>
            </Col>

            <Col className="text-right vertically-center justify-end" md={1}>
              <CloseCircleFilled
                onClick={() => removeFromCart(item.product_id)}
                style={{ cursor: "pointer" }}
              />
            </Col>
            <Col md={24}>
              <hr />
            </Col>
          </React.Fragment>
        ))}

        <Col md={18}></Col>
        <Col md={6}>
          <div>
            <Flex justify="space-between">
              <h2>Total</h2>
              <p>
                $
                {cart.reduce(
                  (acc, item) => acc + +item.price * +item.quantity,
                  0
                ).toFixed(2)}
              </p>
            </Flex>
            <hr />
          </div>
          <Button
            block
            disabled={cart.length === 0 || blockBtn}
            onClick={generateOrder}
          >
            Generar Orden
          </Button>
          <br />
          <br />
          {cart.length === 0 && (
            <Link to={"/products"}>
              <Button block>Ver productos</Button>
            </Link>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
