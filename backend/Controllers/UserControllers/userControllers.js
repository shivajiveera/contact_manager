const asyncHandler = require("express-async-handler");

const User = require("../../models/userModel");

//get all user from database
const getUser = asyncHandler(async (req, res) => {
  const userGet = await User.find({ user: req.user.id });
  res.status(200).json(userGet);
});

//get single user from database
const getSingleUser = asyncHandler(async (req, res) => {
  const userGet = await User.findById(req.params.id);
  if (!userGet) {
    res.status(400);
    throw new Error(`user not avilable with id ${req.params.id}`);
  }

  if (userGet.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not autherized");
  }
  res.status(200).json(userGet);
});

// create a user in database
const setUser = asyncHandler(async (req, res) => {
  //if user not put name or email or phone number

  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("name email and phone number is required");
  }

  //setting sended data into database
  const userSet = await User.create({ user: req.user.id, name, email, phone });
  res.status(200).json(userSet);
});

//update user in database
const updateUser = asyncHandler(async (req, res) => {
  const userGet = await User.findById(req.params.id);

  if (!userGet) {
    res.status(400);
    throw new Error(`user not avilable with id ${req.params.id}`);
  }
  //checking that this user belogs to autherized user or not
  if (userGet.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not autherized");
  }

  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("updated name email and phone number is required");
  }
  const userUpdate = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(userUpdate);
});

// delete a user form database
const deleteUser = asyncHandler(async (req, res) => {
  const userGet = await User.findById(req.params.id);

  if (!userGet) {
    res.status(400);
    throw new Error(`user not avilable with id ${req.params.id}`);
  }

  //checking that this user belogs to autherized user or not
  if (userGet.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not autherized");
  }

  await userGet.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getUser,
  getSingleUser,
  setUser,
  updateUser,
  deleteUser,
};



