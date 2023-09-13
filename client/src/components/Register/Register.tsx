//SE TILL ATT MAN HAMNAR PÅ /REGISTRERA SIDAN...OCH INTE SHOP

import { useState } from "react";
import { useUserContext } from "../../../context/usercontext";

export default function Register() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    register,
    login,
  } = useUserContext();

  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async () => {
    await register();
    setIsRegistered(true);
  };

  const handleLogin = () => {
    if (isRegistered) {
      login();
    } else {
      //Vad VILL jag göra annars?
      alert("Du måste registrera dig först.");
    }
  };

  return (
    <div>
      <div>
        {isRegistered ? (
          <button onClick={handleLogin}>LOGGA IN</button>
        ) : (
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
            <button onClick={handleRegister}>REGISTRERA</button>
          </div>
        )}
        <p>
          Hej
          <br />
          {username}
        </p>
      </div>
    </div>
  );
}
