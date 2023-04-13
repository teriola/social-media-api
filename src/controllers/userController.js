const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/jwt');
const User = require("../models/User");



// Get user by id
// GET /users/:id
// Public
const getUserById = asyncHandler(async (req, res) => {
  const { _id, name, surname, profilePicture, coverPicture, description, followers } = await User.findById(req.params.id).populate('followers');

  res.status(200).json({
    _id,
    name,
    surname,
    profilePicture,
    coverPicture,
    description,
    followers,
  });
});

// Get followers
// GET /users/:id/followers
// Public
const getUserFollowers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate('followers', ['_id', 'name', 'surname', 'profilePicture']);
  console.log(user.followers);

  res.status(200).json(user.followers);
});

// Post followers
// POST /users/:userId/follow
// Private
const followUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    user.followers.push(req.user._id);
    user.save();

    res.status(201).json({ message: 'Followed user'});
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

// Patch user
// PATCH /users/:userId
// Private
const patchUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body);

  res.status(200).json(updatedUser);
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,

  patchUser,

  getUserById,
  getUserFollowers,
  followUser,
  getMe,
};
