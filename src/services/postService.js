const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const Post = require("../models/Post");
const { parsePost } = require("../utils/parser");
const { getUser } = require("./userService");


exports.getAllPosts = () => Post.find().select('-likes -comments -__v').populate('owner', 'name surname profilePicture');

exports.createPost = async (postData, owner) => {
  // Get user
  const user = await getUser(owner);

  // Create post
  const post = await Post.create({ ...postData, owner });

  // Add post to user posts
  user.posts.push(post._id);

  // Return post and owner
  return parsePost(post, user);
}

exports.getUserPosts = async (id) => {
  // Get user posts
  const posts = await Post.find({ owner: id }).populate('owner', '_id name surname profilePicture');

  // Return in right format
  return posts.map(post => parsePost(post, post.owner));
};

exports.getUserBookmarks = async (id) => {
  // Populates user bookmarks and their owner
  const user = await getUser(id);
  const populatedUser = await user.populate({
    path: 'bookmarks',
    populate: {
      path: 'owner',
      select: 'name surname profilePicture'
    }
  });
  return populatedUser.bookmarks.map(post => parsePost(post, post.owner));
}

exports.setUserBookmark = async (id, postId) => {
  // Get user
  const user = await getUser(id);

  // Check if postId is valid
  if (!mongoose.isValidObjectId(postId)) throw new Error('Post not found');

  // Get post
  const post = await Post.findById(postId);

  // Check if post exists
  if (!post) throw new Error('Post not found');
  // Check if user is owner
  if (post.owner == id) throw new Error('Can\'t bookmark own post')
  // Check if user has already bookmarked
  if (user.bookmarks.some(bookmark => bookmark == postId)) throw new Error('User has already bookmarked');

  user.bookmarks.push(postId);
  user.save();

  return user.bookmarks;
}

exports.removeUserBookmark = async (id, postId) => {
  // Get user
  const user = await getUser(id);

  // Check if postId is valid
  if (!mongoose.isValidObjectId(postId)) throw new Error('Post not found');

  // Get post
  const post = await Post.findById(postId);

  // Check if post exists
  if (!post) throw new Error('Post not found');

  // Check if user has not bookmarked
  const isBookmarked = user.bookmarks.some(bookmark => bookmark == postId);
  if (!isBookmarked) throw new Error('Post not bookmarked');

  user.bookmarks.splice(user.bookmarks.indexOf(postId), 1);
  user.save();
}

exports.removePost = async (_id, userId) => {
  const post = await Post.findById(_id);

  // Checks if post exists
  if (!post) throw new Error('Post not found');

  // Check if user is owner of post
  if (post.owner != userId) throw new Error('Not authorized');

  // Delete post
  await Post.deleteOne({ _id });
}

exports.likePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  // Check if post exists
  if (!post) throw new Error('Post not found');

  // Check if user has already liked
  if (post.likes.includes(userId)) throw new Error('User has already liked');

  post.likes.push(userId);
  post.save();

  return post;
}

exports.unlikePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  // Check if post exists
  if (!post) throw new Error('Post not found');

  // Check if user has liked
  if (!post.likes.includes(userId)) throw new Error('User has not liked');

  post.likes.splice(post.likes.indexOf(userId), 1);
  post.save();

  return post;
}

exports.commentPost = async (postId, owner, text) => {
  const post = await Post.findById(postId);

  if (!post) throw new Error('Post not found');

  // Create comment and add it to post comments
  const comment = await Comment.create({ text, owner });
  post.comments.push(comment._id);
  post.save();

  return post;
}

exports.getPostComments = async (postId) => {
  const post = await Post.findById(postId);

  if (!post) throw new Error('Post not found');

  // Populate comments and their owner
  const populatedPost = await post.populate({
    path: 'comments',
    select: '-__v',
    populate: {
      path: 'owner',
      select: '_id name surname profilePicture',
    },
  });

  return populatedPost.comments;
}

exports.updatePost = async (postId) => {
  const post = await Post.findById(postId);

  if (!post) throw new Error('Post not found');

  // Update post and populate owner
  const updatedPost = await Post.findOneAndUpdate(postId, data, { new: true }).populate('owner');

  return parsePost(updatedPost);
}