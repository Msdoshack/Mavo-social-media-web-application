import { useEffect } from "react";
import { baseUrlPrivate } from "../config/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosInterceptors = () => {
  const refresh = useRefreshToken();
  const { currentUser } = useAuth();

  useEffect(() => {
    const requestIntercept = baseUrlPrivate.interceptors.request.use(
      (config) => {
        if (!config?.headers["Authorization"]) {
          config.headers[
            "Authorization"
          ] = `Bearer ${currentUser?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = baseUrlPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return baseUrlPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      baseUrlPrivate.interceptors.request.eject(requestIntercept);
      baseUrlPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [currentUser, refresh]);

  return baseUrlPrivate;
};

export default useAxiosInterceptors;
