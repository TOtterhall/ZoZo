import { useUserContext } from "../../../context/usercontext";

export default function Register() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    register, // Här får du tillgång till register-funktionen från context
  } = useUserContext();

  const handleRegister = async () => {
    // Använd funktionen register() från context för att registrera användaren
    await register();

    // Resten av din kod för att hantera registrering
  };

  return (
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
        <button onClick={handleRegister}>REGISTRERA</button>
        <p>
          Hej
          <br />
          {username}
        </p>
      </div>
    </div>
  );
}
