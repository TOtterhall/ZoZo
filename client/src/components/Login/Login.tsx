import { Link } from "react-router-dom";
import { useUserContext } from "../../../context/usercontext";

export default function Login() {
  const { username, setUsername, password, setPassword, login, isLoggedIn } =
    useUserContext();

  const handleLogin = async () => {
    if (username && password) {
      login();
    } else {
      alert("Du måste registrera dig förs");
    }
  };

  return (
    <div>
      <div>
        {isLoggedIn ? (
          <Link to="/" className="loggInBtn"></Link>
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

            <Link to="/register" className="loggInBtn">
              REGISTRERA
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
