const Post = require('../models/Post');
const User = require('../models/User');

exports.getAllPosts = async () => {
    const posts = await Post.find().populate('_owner', ['profilePicture', 'firstName', 'lastName']).lean();
    return posts;
};
exports.getPostsByUser = async (userId) => {
    const posts = await User.find(userId).populate('posts', ['text', 'pictute', 'createdOn']);
    return posts;
};
exports.getPostById = async (id) => {
    const post = await Post.findById(id);
    console.log(post);
};
exports.deletePost = async (id) => {
    await Post.findByIdAndRemove(id);
};
exports.editPost = async (id, data) => {
    await Post.findByIdAndUpdate(id, data, { runValidators: true });
};
exports.createPost = async (req, res, next) => {
    try {
        const { text, picture, ownerId } = req.body;
        const post = new Post({ text, picture, _owner: ownerId });
        await post.save();
        res.status(200).json(post);
    } catch (err) {
        next(err)
    }
};