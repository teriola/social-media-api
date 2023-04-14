const { Schema, model, Types: { ObjectId } } = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../config/constants');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name is too short'],
        maxLength: [12, 'Name is too long'],
    },
    surname: {
        type: String,
        required: [true, 'Surname is required'],
        minLength: [2, 'Surname is too short'],
        maxLength: [12, 'Surname is too long'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        max: 30,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    profilePicture: {
        type: String,
        default: 'https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png',
        match: [/^https?:\/\//, 'Invalid profile picture format'],
    },
    coverPicture: {
        type: String,
        default: 'https://img.rawpixel.com/private/static/images/website/2022-05/rm422-076-x.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=444e119094ef45a3248aa529fb696b2b',
        match: [/^https?:\/\//, 'Invalid cover picture format'],
    },
    description: {
        type: String,
        default: '',
        maxLength: [100, 'Description is too long'],
    },
    theme: {
        type: String,
        enum: ['light', 'dark'],
    },
    posts: [{
        type: ObjectId,
        ref: 'Post',
    }],
    followers: [{
        type: ObjectId,
        ref: 'User',
    }],
    bookmarks: [{
        type: ObjectId,
        ref: 'Post',
    }],
}, {
        timestamps: true,
    });

userSchema.pre('save', function (next) {
    return bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hash => {
            this.password = hash;
            return next();
        });
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
});

const User = model('User', userSchema);

module.exports = User;
