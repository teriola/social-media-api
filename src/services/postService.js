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
exports.createPost = async ({ message, image, ownerId }) => {
    const post = new Post({ message, image, _owner: ownerId });
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

exports.likePost = async (postId, loggedUser) => {
  const post = await Post.findById(postId);
  const user = await User.findById(loggedUser._id);
  console.log(loggedUser);

  // if (school.likes.users.includes(userId)) return school;
  // school.likes.users.push(userId);
  // school.likes.count += 1;
  // user.likedSchools.push(schoolId);
  // await user.save();
  // await school.save();
  // return school;
  // Check if user has already liked
  // if (post.likes.includes(userId)) throw new Error('User has already liked');

  // post.likes.push(userId);
  // post.save();
  //
  // return post;
}

// exports.deletePost = async (id) => {
//     await Post.findByIdAndRemove(id);
// };
