const bcrypt = require('bcrypt');
const User = require('../models/User');
const { sendError } = require('../utils/util');
const { signToken, createPayload } = require('../utils/user');

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).lean();
  if (!user) {
    sendError('Wrong username or password', 401);
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    sendError('Wrong username or password', 401);
  }

  const token = await signToken(user);
  return createPayload(user, token);
};
exports.register = async ({
  firstName,
  lastName,
  email,
  password,
  repeatPassword,
}) => {
  if (password.length < 6) {
    sendError('Password should be at least 6 characters');
  }
  if (password !== repeatPassword) {
    sendError('Passwords must match', 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await user.save();
  const token = await signToken(user);
  return createPayload(user, token);
};
exports.logout = async (req, res) => {
  res.status(204).json({});
};
exports.getUserById = async (id) => {
  const user = await User.findById(id).lean();
  return createPayload(user);
};
exports.getAllUsers = async () => {
  const users = await User.find();
  return users.map(user => createPayload(user));
};
exports.getUserBookmarks = async (userId) => {
  const user = await User.findById(userId).populate('bookmarks');
  return user.bookmarks;
};
exports.getUserFriends = async (userId) => {
  const user = await User.findById(userId).populate('friends');
  return user.friends;
}
