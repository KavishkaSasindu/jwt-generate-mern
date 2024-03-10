const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./routes/Routes");
const cors = require("cors");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/jwt")
  .then(() => {
    console.log("MongoDb is connected");
    app.listen(PORT, () => {
      console.log("Server running...");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(router);
