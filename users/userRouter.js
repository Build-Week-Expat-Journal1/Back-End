const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("./usersModel");
const restrict = require("../middleware/restrict");
const jwt = require("jsonwebtoken");
const validateUser = require("../middleware/verifyUser");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const newUser = await Users.AddUser({
      username,

      password: await bcrypt.hash(password, 10),
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.getUserByUserName(username).first();

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    const payload = {
      userId: user.id,
      username: user.username,
    };

    const token = generateToken(user);
    const userInfo = { id: user.id, username: user.username };
    res.status(200).json({
      message: `Welcome ${user.username}!`,
      userInfo,
      token,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/update/:id", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const id = req.params.id;

    const newUser = await Users.updateUser(id, {
      username,

      password: await bcrypt.hash(password, 10),
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Users.deleteUser(id);
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options); // this method is synchronous
}

module.exports = router;
