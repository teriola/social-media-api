const { Schema, model, Types: { ObjectId } } = require('mongoose');

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
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format'],
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
    friends: [{ type: ObjectId, ref: 'post' }],
    posts: [{ type: ObjectId, ref: 'post' }],
    description: {
        type: String,
        maxLength: [100, 'Description is too long'],
    },
});

const User = model('user', UserSchema);

module.exports = User;
