const db = require("../config/connect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const {
    firstName,
    surname,
    username,
    DOB,
    sex,
    email,
    password,
    country,
    state,
    city,
    bio,
  } = req.body;

  if (
    !firstName ||
    !surname ||
    !username ||
    !DOB ||
    !email ||
    !password ||
    !sex ||
    !country ||
    !state ||
    !city ||
    !bio
  ) {
    return res.status(400).send("all field are required");
  }

  const duplicateEmail = "SELECT * FROM users WHERE email = ?";

  db.query(duplicateEmail, email, (err, data) => {
    if (err) {
      return res.status(400).json(err);
    }
    if (data.length) {
      return res.status(409).send("email already in use");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const q =
      "INSERT INTO users(first_name,surname,username,DOB,sex,email,password,country,state,city,bio)VALUE(?)";

    const titleCase = (name) => {
      return name.charAt(0).toLocaleUpperCase() + name.slice(1);
    };

    const values = [
      titleCase(firstName),
      titleCase(surname),
      titleCase(username),
      DOB,
      titleCase(sex),
      email,
      hashedPassword,
      country,
      state,
      titleCase(city),
      bio,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      console.log(data);
      res.status(201).json("registration successfull");
    });
  });
};

const login = (req, res) => {
  if (!req.body.user || !req.body.password) {
    return res.status(403).send("all fields are required");
  }

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, req.body.user, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    }
    if (!data.length) {
      return res.status(404).send("user does not exist");
    }
    const match = bcrypt.compareSync(req.body.password, data[0].password);

    if (!match) {
      return res.status(400).send("username or password");
    }

    const token = jwt.sign(
      { id: data[0].id, username: data[0].username },
      "secret"
    );

    const { password, ...others } = data[0];

    res
      .cookie("jwt", token, {
        httpOnly: true,
        samesite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(others);
  });
};

const logout = (req, res) => {
  res
    .clearCookie("jwt", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("successfull");
};

module.exports = { register, login, logout };
