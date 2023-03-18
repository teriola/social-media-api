const bcrypt = require('bcrypt');
const User = require('../models/User');
<<<<<<< HEAD
const {signToken}= require('../utils/auth');

// Login
exports.login = async (req, res) => {
  try {
    // Get data
    const { email, password } = req.body;

    // Validate
    const user = await User.findOne({ email }).lean();
    if (!user) {
      throw Error({ message: 'Wrong username or password', code: 401 })
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw Error({ message: 'Wrong username or password', code: 401 });
    }

    // Sign jwt token for security
    const token = await signToken(user);

    // Send response
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json(err);
  }
};
=======
const { sendError } = require('../utils/sendError');
const { signToken } = require('../utils/user');
>>>>>>> a65fda7 (fix errors and add error handling)

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

<<<<<<< HEAD
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
=======
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
>>>>>>> a65fda7 (fix errors and add error handling)
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    sendError('Wrong username or password', 401);
  }

  // Sign jwt token for security and return it
  const token = await signToken(user);
  return token;
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
<<<<<<< HEAD
=======

// Get all users
exports.getAllUsers = async () => {
  const users = await User.find();
  if (!users) {
    return [];
  }
  return users;
};
>>>>>>> a65fda7 (fix errors and add error handling)
