import Loggin from "../Loggin/Loggin";

export default function Navbar() {
  //cart som är hårdkodad här men som kommer att ligga i localhost
  //Kommer behöva skapa en cart som vi sedan mapar ut i server
  //   const cart = [
  //     {
  //       product: "price_7575956575",
  //       quantity: 2,
  //     },
  //     {
  //       product: "price_7579908096575",
  //       quantity: 1,
  //     },
  //   ];
  //Vi ska använda cookies så vi får titta på vite.config filen...? För inloggningen.
  async function handlePayment() {
    const response = await fetch(
      "http://localhost:3400/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(""),
      }
    );
    if (!response.ok) {
      return;
    }
    //Stripe har en function som heter redirect men behövs egentligen inte.
    const { url } = await response.json();
    window.location = url;
  }
  return (
    //LOGGA OCH LOGGA IN + VARUKORG TILL HÖGER
    <div>
      <div>ZOZO</div>
      <div>
        <Loggin></Loggin>
        <button onClick={handlePayment}>GÅ TILL KASSAN</button>
      </div>
    </div>
  );
}
