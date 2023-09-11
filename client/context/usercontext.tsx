import { PropsWithChildren, createContext, useContext, useState } from "react";

interface IUserContext {
  //   isLoggedIn: boolean;
  username: string;
  password: string;
  email: string;
  // userId: string;
  //   setUserId: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;

  // login: () => void;
  register: () => void;
}

const defaultValues = {
  //   isLoggedIn: false,
  username: "",
  password: "",
  email: "",
  // setUserId: () => {},
  setUsername: () => {},
  setPassword: () => {},
  setEmail: () => {},
  register: () => {},

  // userId: "",

  // setUserId: () => {},
  // login: () => {},
};

const UserContext = createContext<IUserContext>(defaultValues);
// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(UserContext);
const UserProvider = ({ children }: PropsWithChildren) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //   const [userId, setUserId] = useState("");

  // BÖRJA HÄR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // const login = async () => {
  //  setIsLoggedIn(true);
  // };

  const register = async () => {
    const userData = { username, password, email };
    console.log("Users before update:", userData);
    const response = await fetch("http://localhost:3040/users/register", {
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
  };

  return (
    <UserContext.Provider
      value={{
        // isLoggedIn: false, // Du kan sätta detta här om det är alltid false vid start
        username,
        setUsername,
        password,
        setPassword,
        email,
        setEmail,
        // userId,
        // setUserId,
        register,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
