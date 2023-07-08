import "./login.scss";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    user: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const { login, err } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      login(input);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [input]);
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
              type="text"
              placeholder="username"
              name="user"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <button onClick={handleLogin}>Login</button>
            <p style={{ backgroundColor: "lightgray", color: "red" }}>{err}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
