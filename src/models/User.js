const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    // Required
    firstName: {
        type: String,
        required: true,
        minLength: [2, 'Name should be at least 2 characters long'],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [2, 'Surname should be at least 2 characters long'],
    },
    email: {
        type: String,
        required: true,
        max: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password should be at least 6 characters long'],
    },
    // Non-required
    profilePicture: {
        type: String,
        default: '',
        match: [/^https?:\/\//, 'Invalid profile picture format'],
    },
    coverPicture: {
        type: String,
        default: '',
        match: [/^https?:\/\//, 'Invalid profile picture format'],
    },
    friends: {
        type: Array,
        default: [],
    },
});

const User = model('user', UserSchema);

module.exports = User;
