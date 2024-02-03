const jwt = require("jsonwebtoken");
const userModel = require("../../models/user");
require("dotenv").config();

async function authenticateJwtToken(req, res, next) {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = req.headers.authorization || req.headers.Authorization;
  if (!token) return res.unauthorized({});
  jwt.verify(token, secretKey, async (err, user) => {
    if (err) {
      return res.invalid({ msg: "User is forbidden to access resource" });
    }
    if (user && user.email) {
      const userDetails = await userModel.findOne({
        query: { email: user.email },
        projection: { _id: 1 },
      });
      if (userDetails && userDetails._id) {
        user.userId = userDetails._id;
      } else {
        return res.invalid({ msg: "User not found" });
      }
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateJwtToken;
