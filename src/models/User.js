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
        default: 'https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png',
        match: [/^https?:\/\//, 'Invalid profile picture format'],
    },
    coverPicture: {
        type: String,
        default: 'https://img.rawpixel.com/private/static/images/website/2022-05/rm422-076-x.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=444e119094ef45a3248aa529fb696b2b',
        match: [/^https?:\/\//, 'Invalid profile picture format'],
    },
    friends: [{ type: ObjectId, ref: 'Post' }],
    description: {
        type: String,
        default: '',
        maxLength: [100, 'Description is too long'],
    },
    bookmarks: [{ type: ObjectId, ref: 'Post' }]
});

const User = model('User', UserSchema);

module.exports = User;
