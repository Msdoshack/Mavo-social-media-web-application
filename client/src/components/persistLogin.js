import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Layout from "./Layout";

const PersistLogin = () => {
  const [isLoading, setIsloading] = useState(true);
  const refresh = useRefreshToken();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        navigate("/login");
      } finally {
        setIsloading(false);
      }
    };
    !currentUser?.accessToken ? verifyRefreshToken() : setIsloading(false);
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Layout />}</>;
};

export default PersistLogin;
