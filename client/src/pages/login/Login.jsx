import "./login.scss";

import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { baseUrl, baseUrlPrivate } from "../../config/axios";

const Login = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  const [err, setErr] = useState("");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [input, setInput] = useState({
    user: "",
    password: "",
  });
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setInput({ ...input, [e.target.name]: e.target.value });
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await baseUrlPrivate.post(
        "http://localhost:3700/api/auth/login",
        JSON.stringify({ user, password }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
          withCredentials: true,
        }
      );

      setCurrentUser(response?.data);
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErr("No server response");
      }
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Mavo</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
            molestias reprehenderit quidem adipisci libero pariatur repellat
            optio
          </p>
          <span>Dont you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              required
              type="text"
              placeholder="username"
              name="user"
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p style={{ color: "red" }}>{err}</p>
            <p className="register-redirect">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
