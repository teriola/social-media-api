const Post = require('../models/Post');

exports.getAllPosts = async () => {
    return Post.find().lean();
};
exports.getPostById = async (id) => {
    const post = Post.findById(id);
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