import { Link } from "react-router-dom";
import { useUserContext } from "../../../context/usercontext";

//BOOTSTRAP
// import Container from "react-bootstrap/Container";

// import Form from "react-bootstrap/Form";

export default function Login() {
  const { username, setUsername, password, setPassword, login, isLoggedIn } =
    useUserContext();
  const handleLogin = async () => {
    if (username && password) {
      login();
      if (!login) {
        alert("Fel användarnamn eller lösenord");
      } else {
        console.log("Du är inloggad.");
        console.log(username);
      }
    }
  };

  return (
    <div>
      <div>
        {isLoggedIn ? (
          <Link to="/" className="loggInBtn"></Link>
        ) : (
          <form>
            <input
              type="username"
              placeholder="Användarnamn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>LOGGA IN</button>

            <Link to="/register" className="loggInBtn">
              REGISTRERA
            </Link>
            <Link to="/" className="loggInBtn">
              Tillbaka till shoppen...
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
