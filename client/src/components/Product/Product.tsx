import { IProduct, useProductContext } from "../../../context/productcontext";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import "./Product.css";
import { useEffect } from "react";
import { useCartContext } from "../../../context/cartcontext";

export default function Products() {
  const { products, getSpecificProduct, getAllProducts, prices, getPrices } =
    useProductContext();
  const { addToCart } = useCartContext();
  useEffect(() => {
    getAllProducts();
    getPrices();
  }, [getAllProducts, getPrices]);

  const getProductPrice = (product: IProduct) => {
    const productPrice = prices.find(
      (price) => price.id === product.default_price
    );

    if (productPrice) {
      const unitAmount = productPrice.unit_amount;

      return <div>Pris: {unitAmount / 100} SEK</div>;
    } else {
      return <div>Pris saknas</div>;
    }
  };

  const handleAddToCart = async (product: IProduct) => {
    await getSpecificProduct(product.id);

    addToCart(product);
    const existingCart = localStorage.getItem("cart");

    const cart = existingCart ? JSON.parse(existingCart) : [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <>
      <Container className="productList">
        <br />
        <br />
        <Col md={2}>
          <Card className="cards">
            {products.map((product) => (
              <Card.Body key={product.id} className="productCard">
                <Card.Img src={product.images} alt={product.images}></Card.Img>
                <Card.Title>{product.name}</Card.Title>

                {getProductPrice(product)}

                <Card.Text>{product.description}</Card.Text>

                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(product)}
                >
                  {" "}
                  Köp nu
                </Button>
              </Card.Body>
            ))}
          </Card>
        </Col>
      </Container>
    </>
  );
}
