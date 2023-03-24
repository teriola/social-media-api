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
  if (password !== rePassword) {
    res.status(400);
    throw new Error('Passwords must match');
  }
  const userExists = await User.findOne({ email });
  console.log(userExists);
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

// Get user
// GET /users/:id
// Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, surname, profilePicture } = await User.findById(req.user.id);

  res.status(200).json({
    _id,
    name,
    surname,
    profilePicture,
  });
});

// // Delete post
// // DELETE /posts/:id
// // Private
// const deletePost = asyncHandler(async (req, res) => {

// });

module.exports = {
  registerUser,
  loginUser,
  getMe,
};

// router.get('/user/:id', handleResponse(postService.getPostsByUser));
// router.get('/bookmark/:id', handleResponse(postService.getBookmarksByUser));
// router.get('/:id', validateUtility({ idValidator: true }, 'Post'), handleResponse(postService.getPostById));



// router.get('/', handleResponse(userService.getAllUsers));
// router.post('/login', handleResponse(userService.login));
// router.post('/register', handleResponse(userService.register));
// router.get('/logout', validateUtility({ tokenValidador: true }), userService.logout);
// router.get('/:id/bookmarks', handleResponse(userService.getUserBookmarks));
// router.get('/:id/friends', handleResponse(userService.getUserFriends));
// router.get('/:id',
//   validateUtility({ tokenValidador: true, idValidator: true }, 'User'),
//   handleResponse(userService.getUserById));

// module.exports = router;
