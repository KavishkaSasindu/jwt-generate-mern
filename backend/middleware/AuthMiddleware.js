const jwt = require("jsonwebtoken");

const authMiddleware = (request, response, next) => {
  const token = request.cookies.jwt;

  if (token) {
    const verify = jwt.verify(token, "token", (error, decoded) => {
      if (error) {
        console.log(error.message);
        return response.status(404).json({
          message: "error",
        });
      } else {
        console.log(decoded);
        return response.status(200).json({
          message: "login success",
          data: decoded,
        });
      }
    });
  } else {
    response.redirect("/signIn");
  }
};

module.exports = authMiddleware;
