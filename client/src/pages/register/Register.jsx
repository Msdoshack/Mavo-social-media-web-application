import "./register.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { countries } from "../../assets/datafile/countries";

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    surname: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    sex: "",
    city: "",
    DOB: "",
    bio: "",
  });

  const [country, setCountry] = useState("--Country--");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");

  const [err, setErr] = useState("");

  const changeCountry = (e) => {
    setCountry(e.target.value);

    if (e.target.value !== "") {
      setStates(
        countries?.find((country) => country?.name === e.target.value).states
      );
    } else {
      setStates(["--State--"]);
    }
  };

  const changeState = (e) => {
    setState(e.target.value);
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3700/auth/register", {
        ...inputs,
        country,
        state,
      });
      console.log(response?.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  console.log(inputs);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Mavo</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
            molestias reprehenderit quidem adipisci libero pariatur repellat
            optio?
          </p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>

          <form autoComplete="off" onSubmit={handleRegister}>
            <label htmlFor="firstName">First Name</label>
            <input
              autoComplete="off"
              type="text"
              placeholder="First name"
              id="firstName"
              name="firstName"
              onChange={handleChange}
            />

            <label htmlFor="surname">Surname</label>
            <input
              id="surname"
              autoComplete="off"
              type="text"
              placeholder="Surname"
              name="surname"
              onChange={handleChange}
              required={true}
            />

            <label htmlFor="username">Username</label>
            <input
              id="username"
              autoComplete="off"
              type="text"
              placeholder="a unique display name"
              name="username"
              onChange={handleChange}
              required={true}
            />

            <label htmlFor="DOB">DOB</label>
            <input type="date" name="DOB" onChange={handleChange} />

            <label htmlFor="sex">Sex</label>
            <select name="sex" id="sex" onChange={handleChange} required={true}>
              <option>--Sex--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="e.g xyz@mail.com"
              name="email"
              id="email"
              onChange={handleChange}
              autoComplete="off"
              required={true}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              autoComplete="off"
              required={true}
            />

            <label htmlFor="confirmPassword">confirm password</label>
            <input
              type="confirmPassword"
              placeholder="Re-type your Password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              required={true}
            />

            <label htmlFor="country">Country</label>
            <select
              name="country"
              id="country"
              onChange={changeCountry}
              required={true}
            >
              <option value="">--Country--</option>
              {countries?.map((country) => (
                <option value={country.name} key={country.name}>
                  {country.name}
                </option>
              ))}
            </select>

            <label htmlFor="state">State</label>
            <select
              name="state"
              id="state"
              required={true}
              onChange={changeState}
            >
              <option value="">--states--</option>
              {states?.map((states, index) => (
                <option value={states} key={index}>
                  {states}
                </option>
              ))}
            </select>

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              placeholder="city name"
              name="city"
              required={true}
              onChange={handleChange}
            />

            <label htmlFor="bio">Bio</label>
            <textarea
              placeholder="write a short description about yourself"
              id="bio"
              name="bio"
              required={true}
              onChange={handleChange}
            />
            <button type="submit">Register</button>
            <p
              style={{
                backgroundColor: "red",
                color: "white",
                textAlign: "center",
              }}
            >
              {err}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
