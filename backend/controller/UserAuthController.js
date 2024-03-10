const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create token
const createToken = (id) => {
  return jwt.sign({ id }, "token", { expiresIn: "1h" });
};

// create user
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

// login post
const loginPost = async (request, response) => {
  const { username, password } = request.body;
  try {
    const user = await UserModel.findOne({ username });
    console.log(user.username, user.password);
    if (user) {
      const auth = bcrypt.compare(password, user.password);
      if (auth) {
        const token = await createToken(user._id);
        if (token) {
          const cookie = response.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
          });
          console.log(cookie);
        }
        console.log(token);

        return response.status(200).json({
          message: "Usr found",
          data: { username: user.username },
          cookie: response.cookie,
        });
      } else {
        return response.status(404).json({
          message: "invalid credential",
        });
      }
    } else {
      return response.status(404).json({
        message: "user not found",
      });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      return response.status(400).json({
        message: "error",
        error: error.message,
      });
    }
  }
};

module.exports = { userCreate, loginPost };
