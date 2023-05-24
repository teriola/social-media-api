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

    // Check if user has already followed
    if (user.followers.find(e => e == followerId)) throw new Error('User has already followed');

    if (user._id == followerId) throw new Error ('User can\'t follow himself');

    //Add follower
    user.followers.push(followerId);
    user.save();

    return user.followers;
};

exports.editUser = async (id, body) => {
    const user = await this.getUser(id);

    const updatedUser = await User.findByIdAndUpdate(id, body);

    return updatedUser;
}
