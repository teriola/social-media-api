const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");
const User = require("../models/User");

// Get posts
// GET /posts
// Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate('_owner', ['_id', 'firstName', 'lastName', 'profilePicture']);
  res.status(200).json(posts);
});

// Get posts for user
// GET /posts/user/:userId
// Public
const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ _owner: req.params.userId }).populate('_owner', ['_id', 'firstName', 'lastName', 'profilePicture']);
  console.log(posts);
  res.status(200).json(posts);
});

// Get post
// GET /posts/:id
// Public
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.status(200).json(post);
});

// Set post
// POST /posts
// Private
const setPost = asyncHandler(async (req, res) => {
  const { text, picture } = req.body;
  if (!text || !picture) {
    res.status(400);
    throw new Error('All fields are required');
  }
  const post = await Post.create({
    text,
    picture,
    _owner: req.user._id,
  });

  const user = await User.findById(req.user._id);
  user.posts.push(post);

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
  getPost,
  getUserPosts,
  setPost,
  updatePost,
  deletePost,
};

// router.get('/user/:id', handleResponse(postService.getPostsByUser));
// router.get('/bookmark/:id', handleResponse(postService.getBookmarksByUser));
// router.get('/:id', validateUtility({ idValidator: true }, 'Post'), handleResponse(postService.getPostById));
