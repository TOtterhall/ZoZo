import { useState } from "react";

export default function Loggin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Vi ska använda cookies så vi får titta på vite.config filen...? För inloggningen.
  async function handleLogin() {
    const userData = { username, password };
    console.log("Users before update:", userData);
    const response = await fetch("http://localhost:3400/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      console.log("Detta gick inte att logga in du");
      return;
    }
    //Stripe har en function som heter redirect men behövs egentligen inte.
    const { url } = await response.json();
    window.location = url;
  }

  return (
    //LOGGA OCH LOGGA IN + VARUKORG TILL HÖGER
    <div>
      <div>
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>LOGGA IN</button>
      </div>
    </div>
  );
}
