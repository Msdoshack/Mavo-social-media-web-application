import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  /*   JSON.parse(localStorage.getItem("user")) || null */

  // const login = async (input) => {
  //   const response = await axios.post(
  //     "http://localhost:3700/auth/login",
  //     input,
  //     {
  //       withCredentials: true,
  //     }
  //   );
  //   setCurrentUser(response.data);
  // };

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(currentUser));
  // }, [currentUser]);

  return (
    <AuthContext.Provider value={{ setCurrentUser, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
