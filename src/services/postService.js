const Post = require('../models/Post');
const User = require('../models/User');

exports.getAllPosts = async () => {
    const posts = await Post.find().populate('_owner', ['profilePicture', 'name', 'surname']).lean();
    return posts;
};
exports.getPostsByUser = async (userId) => {
    const posts = await Post.find({ _owner: userId }).populate('_owner', ['profilePicture', 'name', 'surname']);
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
exports.editPost = async (id, data) => {
    await Post.findByIdAndUpdate(id, data, { runValidators: true });
};
exports.getBookmarksByUser = async (id) => {
    const user = await User.findById(id).populate('bookmarks');
    return user.bookmarks;
}

// exports.likePost = async (postId, data) => {
//     await Post.findByIdAndUpdate(postId, data);
// }
// exports.deletePost = async (id) => {
//     await Post.findByIdAndRemove(id);
// };
