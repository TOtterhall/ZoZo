import Navbar from "../Navbar/Navbar";
import Products from "../Product/Product";

export default function Shop() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="produktlist">
          <Products />
        </div>
      </div>
    </div>
  );
}
