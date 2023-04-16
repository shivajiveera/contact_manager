const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userAuth = require("../models/userAuthModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //cheking sended auth header and is is header start with Bearer

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //geting token from auth header into variable
      token = req.headers.authorization.split(" ")[1];

      //verifing token with secret code token
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      if (!decoded) {
        res.status(400).send({ msg: "user not authorized" });
      }

      // getting user detais from jwt token and appending in req so can use this info
      req.user = await userAuth.findById(decoded.id).select("-password");
      //calling next to go to protected route

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("user not autherized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("user not autherized || no token sended");
  }
});
module.exports = { protect };
