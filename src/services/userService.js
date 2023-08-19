const User = require("../models/User");
const mongoose = require('mongoose');

exports.getUser = async (id) => {
    // Check if id is valid
    if (!mongoose.isValidObjectId(id)) throw new Error('User not found');

    // Get user and validate
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');

    return user;
}

exports.getUserFollowers = async (id) => {
    const user = await this.getUser(id);

    // Return user followers
    const { followers } = await user.populate('followers');

    return followers.map(({ _id, name, surname, profilePicture }) => ({
        _id,
        name,
        surname,
        profilePicture,
    }));
}

exports.postUserFollower = async (id, followerId) => {
    const user = await this.getUser(id);
    const followerUser = await this.getUser(followerId);

    // Check if user has already followed
    if (user.followers.find(e => e == followerId)) throw new Error('User has already followed');

    if (user._id == followerId) throw new Error('User can\'t follow himself');

    //Add follower
    user.followers.push(followerId);
    user.save();
    followerUser.following.push(id);
    followerUser.save();

    return user.followers;
};

exports.deleteUserFollower = async (id, followerId) => {
    const user = await this.getUser(id);
    const followerUser = await this.getUser(followerId);

    // Check if the user is trying to unfollow themselves
    if (user._id === followerId) {
        throw new Error("User can't unfollow themselves");
    }

    // Check if the user is following the follower (if not, they can't unfollow)
    const followerIndex = user.followers.indexOf(followerId);
    if (followerIndex === -1) {
        throw new Error('User is not following this follower');
    }

    // Remove follower
    user.followers.splice(followerIndex, 1);
    await user.save();

    // Remove user from follower's following list
    const followingIndex = followerUser.following.indexOf(id);
    if (followingIndex !== -1) {
        followerUser.following.splice(followingIndex, 1);
        await followerUser.save();
    }

    return user.followers;
}

exports.editUser = async (id, body) => {
    const user = await this.getUser(id);

    const updatedUser = await User.findByIdAndUpdate(id, body);

    return updatedUser;
}
