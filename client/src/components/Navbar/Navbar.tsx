import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "react-bootstrap";
import "./Navbar.css";
function navbar() {
  return (
    <Navbar bg="light" expand="lg" className="navBar">
      <Container>
        <Navbar.Brand href="#home">ZOZO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Hem</Nav.Link>
            <Nav.Link href="#link">Om oss</Nav.Link>
            <NavDropdown title="Produkter" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Halsband</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Koppel</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Canicross</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Gott</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Button className="loggInBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
        </Button>
        <Button className="cartBtn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </Button>
      </Container>
    </Navbar>
  );
}

export default navbar;
// import Register from "../Register/Register";
// import Login from "../Login/Login";
// export default function Navbar() {
//   //cart som är hårdkodad här men som kommer att ligga i localhost
//   //Kommer behöva skapa en cart som vi sedan mapar ut i server
//   //   const cart = [
//   //     {
//   //       product: "price_7575956575",
//   //       quantity: 2,
//   //     },
//   //     {
//   //       product: "price_7579908096575",
//   //       quantity: 1,
//   //     },
//   //   ];
//   //Vi ska använda cookies så vi får titta på vite.config filen...? För inloggningen.
//   async function handlePayment() {
//     const response = await fetch(
//       "http://localhost:3400/create-checkout-session",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(""),
//       }
//     );
//     if (!response.ok) {
//       return;
//     }
//     //Stripe har en function som heter redirect men behövs egentligen inte.
//     const { url } = await response.json();
//     window.location = url;
//   }
//   return (
//     //LOGGA OCH LOGGA IN + VARUKORG TILL HÖGER
//     <div>
//       <div>ZOZO</div>
//       <div>
//         <div>
//           <Login />
//         </div>

//         <div>
//           <Register />
//         </div>

//         <button onClick={handlePayment}>GÅ TILL KASSAN</button>
//       </div>
//     </div>
//   );
// }
