const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");
const User = require("../models/User");

// Get posts
// GET /posts
// Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate('_owner', ['_id', 'name', 'surname', 'profilePicture']);
  res.status(200).json(posts);
});

// Get posts for user
// GET /posts/user/:userId
// Public
const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ _owner: req.params.userId }).populate('_owner', ['_id', 'name', 'surname', 'profilePicture']);
  res.status(200).json(posts);
});

// Get bookmarks for user
// GET /posts/bookmarks
// Private
const getUserBookmarks = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: 'bookmarks',
    populate: {
      path: '_owner',
      select: 'name surname profilePicture'
    }
  });
  res.status(200).json(user.bookmarks);
});

// Set bookmark for user
// POST /posts/bookmarks
// Private
const setUserBookmark = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const user = await User.findById(req.user._id);
  user.bookmarks.push(postId);
  user.save();
  res.status(204).json({
      message: "Bookmarked successfully",
  });
});

// Remove bookmark for user
// DELETE /posts/bookmarks
// Private
const removeUserBookmark = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const user = await User.findById(req.user._id);
  user.bookmarks.splice(user.bookmarks.indexOf(postId), 1);
  user.save();
  res.status(204).json({
      message: "Bookmark successfully removed",
  });
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
  })
  const user = await User.findById(req.user._id);
  user.posts.push(post);

  const populatedPost = await post.populate('_owner', ['profilePicture', 'name', 'surname']);

  res.status(200).json(populatedPost);
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

  const updatedPost = await Post.findOneAndUpdate(req.params.id, req.body, { new: true }).populate('_owner', ['profilePicture', 'name', 'surname']);
  res.status(200).json(updatedPost);
});

// Delete post
// DELETE /posts/:id
// Private
const deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  if (post._owner.toString() != req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized')
  }
  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }
  await Post.deleteOne({ _id: id });

  res.status(200).json({ id });
});

// Like post
// POST /posts/:id/like
// Private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.likedUsers.includes(req.user._id)) return;
  post.likedUsers.push(req.user._id);
  post.likes += 1;
  post.save();

  res.status(200).json(post);
});

// Remove like
// POST /posts/:id/unlike
// Private
const removeLikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likedUsers.includes(req.user._id)) return;
  post.likedUsers.splice(post.likedUsers.indexOf(req.user._id), 1);
  post.likes -= 1;
  post.save();

  res.status(200).json(post);
});

module.exports = {
  getPosts,
  getPost,
  getUserPosts,
  getUserBookmarks,

  setPost,
  setUserBookmark,
  removeUserBookmark,

  likePost,
  removeLikePost,
  updatePost,
  deletePost,
};
