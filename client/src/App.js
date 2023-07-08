import "./App.css";
import "./style.scss";

/* PAGES AND COMPONENTS */
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import SingleStory from "./pages/singleStory/SingleStory";
import Chat from "./pages/chat/Chat";
import Inbox from "./pages/inbox/Inbox";
import SinglePost from "./pages/singlePost/SinglePost";
import Relationship from "./components/relationship/Relationship";

/* ///////////////////////////////////////////////////// */

import React, { useContext } from "react";
import { darkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

function App() {
  const { darkMode } = useContext(darkModeContext);
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
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
        <ReactQueryDevtools />
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser?.id) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/post/:id",
          element: <SinglePost />,
        },

        {
          path: "/story/:id",
          element: <SingleStory />,
        },
        {
          path: "/inbox/:id",
          element: <Inbox />,
        },

        {
          path: "/chat/:conversationId",
          element: <Chat />,
        },
      ],
    },

    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
