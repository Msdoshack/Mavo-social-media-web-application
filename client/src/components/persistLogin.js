import { Children, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = ({ children }) => {
  const [isLoading, setIsloading] = useState(true);
  const refresh = useRefreshToken();
  const { currentUser } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    };

    !currentUser?.accessToken ? verifyRefreshToken() : setIsloading(false);
  }, []);

  return <div>{isLoading ? <p>Loading...</p> : children}</div>;
};

export default PersistLogin;
