const asyncHandler = require("express-async-handler");
const userAuth = require("../../models/userAuthModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register a user
const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    res.status(400);
    throw new Error("all field is required");
  }
  //check if user is already exist
  const userExist =
    (await userAuth.findOne({ email })) || (await userAuth.findOne({ phone }));
  if (userExist) {
    res.status(400);
    throw new Error("user already exists");
  }

  //password hassing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await userAuth.create({
    name,
    email,
    password: hashedPassword,
    phone,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateJwt(user.id),
    });
  } else {
    res.status(400);
    throw new Error("data is Invalid");
  }
});

//login route
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check all field filled or not by user
  if (!email || !password) {
    res.status(400);
    throw new Error("email and password is required");
  }

  //check user exist or not if exist then compare password
  const user = await userAuth.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateJwt(user.id),
    });
  } else {
    res.status(400);
    throw new Error("invalid Crediatial");
  }
});

const getMe = asyncHandler(async (req, res) => {
  //   res.send("you are on me route");
  res.json(req.user);
});

//generate token by jwt

const generateJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "5d" });
};

module.exports = {
  register,
  login,
  getMe,
};
