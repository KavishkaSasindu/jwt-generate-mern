const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, "token", { expiresIn: "1h" });
};

const userCreate = async (request, response) => {
  const { username, password } = request.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
      username,
      password: hashedPassword,
    });

    if (user) {
      const token = createToken(user._id);
      response.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      return response.status(201).json({
        message: "user created",
        cookie: token,
      });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      return response.status(400).json({
        message: "error",
        error: error,
      });
    }
  }
};

module.exports = { userCreate };
