import useAuth from "./useAuth";
import { baseUrl, baseUrlPrivate } from "../config/axios";

const useRefreshToken = () => {
  const { setCurrentUser, currentUser } = useAuth();

  const refresh = async () => {
    const response = await baseUrlPrivate.get("/refreshtoken", {
      withCredentials: true,
    });
    setCurrentUser((prev) => {
      return { ...response.data };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
