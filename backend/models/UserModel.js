const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const user = mongoose.model("user", UserModel);

module.exports = user;
