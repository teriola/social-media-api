const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/jwt');
const User = require("../models/User");

// Register new user
// POST /users
// Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password, rePassword } = req.body;
  if (!name || !surname || !email || !password || !rePassword) {
    res.status(400);
    throw new Error('All fields are required');
  }
  if (password.length < 6){
    res.status(400);
    throw new Error('Password is too short');
  }
  if (password !== rePassword) {
    res.status(400);
    throw new Error('Passwords must match');
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  // Payload
  const user = await User.create({
    name,
    surname,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      accessToken: await signToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Login user
// POST /users/login
// Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Payload
    res.json({
      _id: user.id,
      name: user.name,
      accessToken: await signToken(user._id),
      surname: user.surname,
      profilePicture: user.profilePicture,
    });
  } else {
    res.status(400);
    throw new Error('Ivalid user data');
  }
});

// Logout user
// GET /users/logout
// Private
const logoutUser = asyncHandler(async (req, res) => {
  res.status(204).json({});
});

// Get user by id
// GET /users/:id
// Public
const getUserById = asyncHandler(async (req, res) => {
  const { _id, name, surname, profilePicture, coverPicture, description } = await User.findById(req.params.id);

  res.status(200).json({
    _id,
    name,
    surname,
    profilePicture,
    coverPicture,
    description,
  });
});

// Get friends
// GET /users/:id/friends
// Public
const getUserFriends = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate('friends');

  res.status(200).json(user.friends);
});

// Get user
// GET /users/me
// Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, surname, profilePicture } = await User.findById(req.user._id);

  res.status(200).json({
    _id,
    name,
    surname,
    profilePicture,
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,

  getUserById,
  getUserFriends,
  getMe,
};
