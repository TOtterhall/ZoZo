import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/components/Home/Home";
import Confirmation from "../src/components/Confirmation/Confirmation";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}
