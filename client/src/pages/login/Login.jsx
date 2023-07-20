import "./login.scss";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [err, setErr] = useState("");

  const [input, setInput] = useState({
    user: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(input);
      navigate("/");
    } catch (error) {
      setErr(error.response.data);
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
              onChange={handleChange}
            />
            <input
              required
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
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
