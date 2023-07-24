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
import PersistLogin from "./components/persistLogin";
import Layout from "./components/Layout";

function App() {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();

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
        // <QueryClientProvider client={queryClient}>
        <PersistLogin children={Layout}>
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        </PersistLogin>

        // </QueryClientProvider>
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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
