import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [err, setErr] = useState("");

  const login = async (input) => {
    try {
      const response = await axios.post(
        "http://localhost:3700/auth/login",
        input,
        {
          withCredentials: true,
        }
      );

      setCurrentUser(response.data);
    } catch (err) {
      setErr(err.response.data);
    }
  };
  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(currentUser));
  // }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, err }}>
      {children}
    </AuthContext.Provider>
  );
};
