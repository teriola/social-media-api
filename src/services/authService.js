const User = require("../models/User");
const { createToken } = require("../utils/createToken");

exports.register = async userData => {
    // Check if user is registered
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw new Error('Email is already taken');

    // Create user
    const user = await User.create(userData);
    const accessToken = await createToken(user);
    return {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        profilePicture: user.profilePicture,
        accessToken,
    };
}

exports.login = async ({ email, password }) => {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    // Validate if password is correct
    const isValid = await user.validatePassword(password);
    if (!isValid) throw new Error('Invalid email or password');

    const accessToken = await createToken(user);
    return {
        _id: user._id,
        name: user.name,
        surname: user.surname,
        profilePicture: user.profilePicture,
        accessToken,
    };
}
