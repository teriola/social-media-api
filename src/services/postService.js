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
    return posts.map(post => formatPost(post, post.owner));
};

