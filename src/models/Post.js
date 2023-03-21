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
    createdOn: {
        type: String,
        default: new Date().toISOString(),
    },
    _owner: { type: ObjectId, ref: 'User' }
});

const Post = model('Post', PostSchema);

module.exports = Post;