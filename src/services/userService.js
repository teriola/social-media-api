const bcrypt = require('bcrypt');
const User = require('../models/User');
const { sendError } = require('../utils/sendError');
const { signToken } = require('../utils/user');

// Login
exports.login = async ({ email, password }) => {
  // Validate
  const user = await User.findOne({ email }).lean();
  if (!user) {
    sendError('Wrong username or password', 401);
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    sendError('Wrong username or password', 401);
  }

  // Sign jwt token for security and return it
  const token = await signToken(user);
  return token;
};

// Register
exports.register = async ({
  firstName,
  lastName,
  email,
  password
}) => {
  // TODO compare password with repeatPassword

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  // Save user in db
  await user.save();

  // Sign jwt token for security
  const token = await signToken(user);

  // Send response
  return token;
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(200).json([]);
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
}

// Login
exports.login = async ({
  email,
  password,
}) => {
  // Get user from db
  const user = await User.findOne({ email }).lean();

  // Validate
  if (!user) {
    sendError('Wrong username or password', 401);
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    sendError('Wrong username or password', 401);
  }

  // Sign jwt token for security and return it
  const token = await signToken(user);
  return token;
};

// Logout
exports.logout = async (req, res) => {
  res.status(204).json({});
};

// Get a user
exports.getUserById = async (id) => {
  // Find user and validate
  const user = await User.findById(id).lean();
  if (!user) {
    sendError('User not found', 404);
  }

  // Return response
  return user;
};

// Get all users
exports.getAllUsers = async () => {
  const users = await User.find();
  if (!users) {
    return [];
  }
  return users;
};
