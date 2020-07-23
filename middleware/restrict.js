const jwt = require("jsonwebtoken");

function restrict() {
  return async (req, res, next) => {
    const authError = {
      message: "Invalid credentials",
    };

    try {
      const token = req.headers.token;

      if (!token) {
        return res.status(401).json(authError3);
      }

      jwt.verify(token, "some ssecret", (err, decoded) => {
        return res.status(401).json(authError);
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
