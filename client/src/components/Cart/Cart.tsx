import { useCartContext } from "../../../context/cartcontext";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Login from "../Login/Login";
import Navbar from "../Navbar/Navbar";

export default function Cart() {
  const { cart } = useCartContext();

  async function handlePayment() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      try {
        const line_items = cart.map((cartItem) => ({
          price_data: cartItem.default_price,
          quantity: cartItem.quantity,
        }));

        const response = await fetch(
          "http://localhost:3040/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ line_items }),
          }
        );

        if (!response.ok) {
          console.error("Något gick fel vid skapandet av sessionen.");
          return;
        }
        const { url, sessionId } = await response.json();
        localStorage.setItem("session-id", sessionId);
        window.location = url;
      } catch (error) {
        alert("Det gick inte att slutföra betalningen.");
      }
    } else {
      alert("Du måste logga in för att kunna lägga en beställning");
    }
  }

  return (
    <>
      <Navbar />
      <Container>
        <h2>Varukorg</h2>
        <Col md={2}>
          {cart.length === 0 ? (
            <p>Din varukorg är tom.</p>
          ) : (
            <Card className="itemCards">
              {cart.map((cartItem) => (
                <Card.Body key={cartItem.id} className="itemBody">
                  <Card.Img src={cartItem.images} alt={cartItem.name} />
                  <Card.Title>Produkt: {cartItem.name}</Card.Title>
                  <Card.Text>Antal: {cartItem.quantity}</Card.Text>
                </Card.Body>
              ))}
            </Card>
          )}
          <Button onClick={handlePayment}>GÅ TILL KASSAN</Button>
        </Col>
        <Login />
      </Container>
    </>
  );
}
