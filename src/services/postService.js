const Post = require("../models/Post");
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
    return {
        _id: post._id,
        message: post.message,
        image: post.image,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        owner: {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            profilePicture: user.profilePicture,
        },
    };
}

exports.getUserPosts = async (id) => {
    const posts = await Post.find({ owner: id }).populate('owner', '_id name surname profilePicture');
    return posts.map(post => ({
        _id: post._id,
        message: post.message,
        image: post.image,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        owner: {
            _id: post.owner._id,
            name: post.owner.name,
            surname: post.owner.surname,
            profilePicture: post.owner.profilePicture,
        },
    }));
};

