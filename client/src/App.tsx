import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Shop/Shop";
import Confirmation from "../src/components/Confirmation/Confirmation";
import UserProvider from "../context/usercontext";
export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
