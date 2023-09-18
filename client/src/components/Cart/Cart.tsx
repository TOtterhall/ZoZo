import { useCartContext } from "../../../context/cartcontext";
// import { useUserContext } from "../../../context/usercontext"; // Importera användarkontext

export default function Cart() {
  const { cart } = useCartContext();

  //   const { isLoggedIn } = useUserContext();

  async function handlePayment() {
    try {
      console.log(cart);
      const line_items = cart.map((cartItem) => ({
        price_data: cartItem.default_price,
        quantity: 1,

        // price_data: {
        //   currency: "sek",
        //   product_data: {
        //     name: cartItem.price_data.product_data.name,
        //     description: cartItem.price_data.product_data.description,
        //   },
        //   unit_amount: cartItem.price_data.unit_amount,
        // },
        // quantity: 1,
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
      console.log(line_items);
      if (!response.ok) {
        // Hantera fel om det behövs
        console.error("Något gick fel vid skapandet av sessionen.");
        return;
      }

      const { url } = await response.json();
      window.location = url;
    } catch (error) {
      console.log("error i cart");
      // Hantera eventuella fel här
      alert("Det gick inte att slutföra betalningen.");
    }
    // if (isLoggedIn) {
    //   // Kontrollera om användaren är inloggad
    //   console.log("Du har klickat på gå till betalning");
    //   // Här kan du anropa din betalningsfunktion eller navigera till betalningssidan.
    // } else {
    //   // Användaren är inte inloggad, visa ett meddelande eller navigera till inloggningssidan
    //   alert("Du måste logga in för att kunna lägga en beställning");
    //   console.log("Du måste vara inloggad för att gå till betalning.");
    //   // Du kan här navigera användaren till inloggningssidan eller visa ett meddelande om inloggning.
    // }
    console.log("Klickat på GÅ till kassan");
  }

  return (
    <div>
      <div>
        <h2>Varukorg</h2>
        {cart.length === 0 ? (
          <p>Din varukorg är tom.</p>
        ) : (
          <div>
            {cart.map((cartItem) => (
              <div key={cartItem.id}>
                <p>Id: {cartItem.id}</p>
                <p>{cartItem.default_price}</p>
                <p>{cartItem.quantity}</p>
                <p>Antal: {cartItem.quantity}</p>
              </div>
            ))}
            <button onClick={handlePayment}>GÅ TILL KASSAN</button>
          </div>
        )}
      </div>
    </div>
  );
}