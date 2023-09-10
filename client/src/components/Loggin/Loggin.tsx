import { useState } from "react";

export default function Loggin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  //Vi ska använda cookies så vi får titta på vite.config filen...? För inloggningen.
  async function handleLogin() {
    const userData = { username, password, email };
    console.log("Users before update:", userData);
    const response = await fetch("http://localhost:3040/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log("Server response:", response);
    if (!response.ok) {
      console.log("Detta gick inte att logga in du");
      return;
    }
    // Stripe har en function som heter redirect men behövs egentligen inte.
    if (response.ok) {
      const { url } = await response.json();
      if (url) {
        window.location = url;
      } else {
        console.error("Ingen giltig url");
      }
    } else {
      console.log("Detta gick inte att logga in du");
    }
  }
  console.log(`Hej${username}`);
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
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>LOGGA IN</button>
        <p>
          Hej
          <br />
          {username}
        </p>
      </div>
    </div>
  );
}
