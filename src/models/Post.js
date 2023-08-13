const { Schema, model, Types: { ObjectId } } = require('mongoose');

const postSchema = new Schema({
    message: {
        type: String,
        required: [true, 'Message is required'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        match: [/^https?:\/\/.*$/, 'Invalid image format'],
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    bookmarks: [{
        type: ObjectId,
        ref: 'User',
    }],
    comments: [{
        type: ObjectId,
        ref: 'Comment',
    }],
    owner: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true,
});

const Post = model('Post', postSchema);

module.exports = Post;
