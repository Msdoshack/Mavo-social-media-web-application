import useAuth from "./useAuth";
import { baseUrl } from "../config/axios";

const useRefreshToken = () => {
  const { setCurrentUser } = useAuth();

  const refresh = async () => {
    const response = await baseUrl.get("/refreshtoken", {
      withCredentials: true,
    });
    setCurrentUser((prev) => {
      return { ...prev, accessToken: response.accessToken };
    });

    return response.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
