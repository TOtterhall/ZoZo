import { IProduct, useProductContext } from "../../../context/productcontext";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
// import { useCart } from "../../../context/cartcontext";
import "./Product.css";
import { useEffect } from "react";

export default function Products() {
  const { products, getSpecificProduct, getAllProducts, prices, getPrices } =
    useProductContext();

  useEffect(() => {
    getAllProducts();
    getPrices();
  }, [getAllProducts, getPrices]);

  const getProductPrice = (product: IProduct) => {
    const productPrice = prices.find(
      (price) => price.id === product.default_price
    );

    if (productPrice) {
      // Extrahera unit_amount från prisobjektet
      const unitAmount = productPrice.unit_amount;

      return <div>Pris: {unitAmount / 100} SEK</div>; // Dela med 100 om unit_amount är i cent (exempelvis 28900 för 289 SEK)
    } else {
      return <div>Pris saknas</div>;
    }
  };

  const handleAddToCart = async (id: string) => {
    await getSpecificProduct(id);
    console.log(`Din vara med ${id} ligger nu i varukorgen`);
  };

  return (
    <>
      <Container className="productList">
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
                  onClick={() => handleAddToCart(product.id)}
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
