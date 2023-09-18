import Navbar from "../Navbar/Navbar";
import Products from "../Product/Product";
// import { Row, Col } from "react-bootstrap";

export default function Shop() {
  return (
    <div>
      <Navbar />
      <div>
        <h1>VÄLKOMMEN TILL MIN SHOP</h1>
        <div className="produktlist">
          <Products />
        </div>
      </div>
    </div>
  );
}
