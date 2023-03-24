const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// Get users
// GET /users
// Public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// Set user
// POST /users
// Public
const setPost = asyncHandler(async (req, res) => {
  const { text, picture } = req.body;
  if (!text || !picture) {
    res.status(400);
    throw new Error('All fields are required');
  }
  const post = await Post.create({
    text,
    picture,
  });

  res.status(200).json(post);
});

// Update post
// PUT /posts/:id
// Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  const updatedPost = await Post.findOneAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedPost);
});

// Delete post
// DELETE /posts/:id
// Private
const deletePost = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  const post = await Post.findById(id);
  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }
  await Post.deleteOne({ _id });

  res.status(200).json({ id });
});

module.exports = {
  getPosts,
  setPost,
  updatePost,
  deletePost,
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
