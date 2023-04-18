const mongoose = require('mongoose');
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