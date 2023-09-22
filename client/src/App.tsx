import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Confirmation from "../src/components/Confirmation/Confirmation";
import UserProvider from "../context/usercontext";
import OrderProvider from "../context/orderContext";
import ProductProvider from "../context/productcontext";
import CartProvider from "../context/cartcontext";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Shop from "./components/Shop/Shop";
import Cart from "./components/Cart/Cart";
import Order from "./components/Orders/Orders";
export default function App() {
  return (
    <OrderProvider>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Shop />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/confirmation" element={<Confirmation />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </OrderProvider>
  );
}
