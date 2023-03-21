const Post = require('../models/Post');
const User = require('../models/User');

exports.getAllPosts = async () => {
    const posts = await Post.find().populate('_owner', ['profilePicture', 'firstName', 'lastName']).lean();
    return posts;
};
exports.getPostsByUser = async (userId) => {
    const posts = await Post.find({ _owner: userId });
    return posts;
};
exports.getPostById = async (id) => {
    const post = await Post.findById(id);
    return post;
};
exports.createPost = async ({ text, picture, ownerId }) => {
    const post = new Post({ text, picture, _owner: ownerId });
    await post.save();
    console.log(post);
    return post;
};
// exports.deletePost = async (id) => {
//     await Post.findByIdAndRemove(id);
// };
// exports.editPost = async (id, data) => {
//     await Post.findByIdAndUpdate(id, data, { runValidators: true });
// };
