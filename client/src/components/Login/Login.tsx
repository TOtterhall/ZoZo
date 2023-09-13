import { useState } from "react";
import { useUserContext } from "../../../context/usercontext";

export default function Login() {
  const { username, setUsername, password, setPassword, register, login } =
    useUserContext();

  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async () => {
    await register();
    setIsRegistered(true);
  };

  const handleLogin = async () => {
    if (isRegistered) {
      await login();
    } else {
      handleRegister();
      setIsRegistered(false);
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
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>LOGGA IN</button>
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
