//SE TILL ATT MAN HAMNAR PÅ /REGISTRERA SIDAN...OCH INTE SHOP

import { useState } from "react";
import { useUserContext } from "../../../context/usercontext";
import { Link } from "react-router-dom";

export default function Register() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    register,
  } = useUserContext();

  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async () => {
    await register();

    setIsRegistered(true);
  };

  return (
    <div>
      <div>
        {isRegistered ? (
          <Link to="/login" className="regBtn"></Link>
        ) : (
          <div>
            <input
              type="new-user-name"
              placeholder="Användarnamn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="new-epost"
              placeholder="E-post"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="new-password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button onClick={handleRegister}>REGISTRERA</button>
          </div>
        )}
      </div>
    </div>
  );
}
