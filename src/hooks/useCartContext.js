import React, { createContext, useContext, useEffect, useState } from "react";
import AuthService from "../services/AuthService";

// Creamos el contexto para el carrito
const CartContext = createContext();

// Este será el proveedor que envolverá toda tu aplicación
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
    checkLogged();
  }, []);

  const checkLogged = () => {
    if(localStorage.getItem('token')){
      setIsLogged(true);
    }else{
      setIsLogged(false);
    }
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const emptyCart = () => {
    setCart([])
  }

  const isAdmin = async () => {
    try {
      await AuthService.checkAdmin();
      return true;
    } catch (error) {
      return false;
    }
  }

  const addToCart = (product) => {
    const productToAdd = {
      ...product,
      quantityAvailible: product.quantity,
      quantity: 1,
    };
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.product_id === productToAdd.product_id
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.product_id === productToAdd.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, productToAdd];
      }
    });
  };

  const getTotalProducts = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };


  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product_id !== productId)
    );
  };

  const changeQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCart = () => cart;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        changeQuantity,
        getCart,
        getTotalProducts,
        emptyCart,
        isLogged,
        checkLogged,
        isAdmin
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para acceder al contexto del carrito
export const useCartContext = () => useContext(CartContext);
