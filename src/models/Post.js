const { Schema, model, Types: { ObjectId } } = require('mongoose');

const PostSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        match: [/^https?:\/\//, 'Invalid profile picture format'],
    },
    _owner: { type: ObjectId, ref: 'User' }
});

const Post = model('post', PostSchema);

module.exports = Post;