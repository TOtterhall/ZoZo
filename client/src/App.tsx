import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Container } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Confirmation from "../src/components/Confirmation/Confirmation";
import UserProvider from "../context/usercontext";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Shop from "./components/Shop/Shop";
export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
