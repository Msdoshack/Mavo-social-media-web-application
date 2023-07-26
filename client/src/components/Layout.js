import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Rightbar from "./rightbar/Rightbar";
import Leftbar from "./leftbar/Leftbar";
import Navbar from "./navbar/Navbar";
import { darkModeContext } from "../context/darkModeContext";

const Layout = () => {
  const { darkMode } = useContext(darkModeContext);

  return (
    // <QueryClientProvider client={queryClient}>
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Leftbar />

        <div style={{ flex: 6 }}>
          <Outlet />
        </div>

        <Rightbar />
      </div>
    </div>
    /*  <ReactQueryDevtools /> */
    // </QueryClientProvider>
  );
};

export default Layout;
