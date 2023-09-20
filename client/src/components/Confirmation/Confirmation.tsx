import { useState, useEffect } from "react";

export default function Confirmation() {
  const [isPaymentVerified, setIsPaymentVerified] = useState(false); // Initiera tillståndet som false

  const verifyPayment = async () => {
    try {
      const sessionId = localStorage.getItem("session-id");
      const response = await fetch("http://localhost:3040/verify-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });
      const { verified } = await response.json();
      if (verified) {
        setIsPaymentVerified(true);
        localStorage.removeItem("session-id");
        //Spara till en lista...?
      } else {
        setIsPaymentVerified(false);
      }
    } catch (error) {
      console.error("Fel vid verifiering av betalning:");
      setIsPaymentVerified(false);
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);

  return isPaymentVerified ? (
    <div>Tack för ditt köp!</div>
  ) : (
    <div>Något gick fel med betalningen...</div>
  );
}
