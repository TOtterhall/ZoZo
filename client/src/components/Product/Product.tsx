import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./Product.css";
interface Product {
  id: string;
  name: string;
  description: string;
  //FÅR INTE UT PRISET, VARFÖR?
  price: string;
  images: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3040/products", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  const handleAddToCart = async () => {
    // await addToCart();
    console.log(`Din vara ligger nu i varukorgen`);
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
                <Card.Text>Pris: {product.price}</Card.Text>
                <Card.Text>Pris: {product.description}</Card.Text>
                <Button variant="primary" onClick={handleAddToCart}>
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

//   return (
//     <Card className="productCard" >
//       {products.map((product) => (
//         <div key={product.id}>
//           <img
//             className="card-img-top"
//             src={product.images}
//             alt={product.images}
//           />
//           <h2>{product.name}</h2>
//           <p>Beskrivning : {product.description} </p>
//           <p>Pris: {product.price}</p>

//           <button onClick={handleAddToCart}>Köp Nu</button>
//         </div>
//       ))}
//     </Card>
//   );
// }
