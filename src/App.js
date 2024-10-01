import "./App.css";
import AdminLayout from "./layouts/AdminLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/admin/home/Home";
import Products from "./pages/admin/products/Products";
import ProductCreate from "./pages/admin/product-create/ProductCreate";
import Orders from "./pages/admin/orders/Orders";
import UserHome from "./pages/user/user-home/UserHome";
import UserProducts from "./pages/user/user-products/UserProducts";
import Cart from "./components/user/cart/Cart";
import UserProfile from "./pages/user/user-profile/UserProfile";
import { CartProvider } from "./hooks/useCartContext";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Home />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/product-create" element={<ProductCreate />} />
            <Route
              path="/admin/product-edit/:productId"
              element={<ProductCreate />}
            />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/" element={<UserHome />} />
            <Route path="/products" element={<UserProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
