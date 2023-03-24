const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const User = require("../models/User");

// Register new user
// POST /users
// Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, surname, email, password, repeatPassword } = req.body;
  if (!name || !surname || !email || !password || !repeatPassword) {
    res.status(400);
    throw new Error('All fields are required');
  }
  if (password !== repeatPassword) {
    res.status(400);
    throw new Error('Passwords must match');
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const salt = bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, 10);

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
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Loign user
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
      surname: user.surname,
      profilePicture: user.profilePicture,
    });
  } else {
    res.status(400);
    throw new Error('Ivalid user data');
  }
});

// Update post
// PUT /posts/:id
// Private
const updatePost = asyncHandler(async (req, res) => {

});

// // Delete post
// // DELETE /posts/:id
// // Private
// const deletePost = asyncHandler(async (req, res) => {

// });

module.exports = {
  registerUser,
  loginUser,
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
