const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

// Get posts
// GET /posts
// Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate('_owner', ['_id', 'firstName', 'lastName', 'profilePicture']);
  console.log(posts);
  res.status(200).json(posts);
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