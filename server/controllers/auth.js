const db = require("../config/connect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

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
      return res.status(500).json(err);
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
      res.status(201).json("registration successfull");
    });
  });
};

const login = (req, res) => {
  if (!req.body.user || !req.body.password) {
    return res.status(403).send("all fields are required");
  }

  try {
    const q = "SELECT * FROM users WHERE ? in (email,username)";
    db.query(q, req.body.user, (err, data) => {
      if (err) {
        return res.sendStatus(404);
      }
      if (!data.length) {
        return res.status(404).send("user does not exist");
      }

      const match = bcrypt.compareSync(req.body.password, data[0].password);

      if (match) {
        const refreshToken = jwt.sign(
          { id: data[0].id, username: data[0].username },
          process.env.REFRESH_TOKEN,
          {
            expiresIn: "1d",
          }
        );

        const accessToken = jwt.sign(
          { id: data[0].id },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "10m",
          }
        );

        const { password, ...others } = data[0];

        const saveRefreshToken = "UPDATE users SET refreshToken =? WHERE id =?";

        db.query(saveRefreshToken, [refreshToken, data[0].id], (err) => {
          if (err) return res.sendStatus(400);

          // Update successful, now set the cookie and send the response
          res.cookie("jwt", refreshToken, {
            httpOnly: true,
            samesite: "none",
            maxAge: /* 24 * 60 *  */ 60 * 1000,
          });

          res.status(200).json({ ...others, accessToken });
        });
      } else {
        res.status(404).json("incorrect password or username");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  const cookies = req.cookies;
  if (!req.cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  const q = "SELECT * FROM users WHERE refreshToken = ?";
  db.query(q, refreshToken, (err, data) => {
    if (!data.length) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.sendStatus(204);
    }

    // delete refreshtoken from database
    const q = "UPDATE users SET refreshToken = null WHERE id=?";

    db.query(q, data[0].id, (err) => {
      if (err) return res.sendStatus(500);

      res
        .clearCookie("jwt", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .json("successfull");
    });
  });
};

module.exports = { register, login, logout };
