const { Schema, model, Types: { ObjectId } } = require('mongoose');

const PostSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        match: [/^https?:\/\//, 'Invalid profile picture format'],
    },
    createdOn: {
        type: String,
        default: new Date().toISOString(),
    },
    likes: [{
        type: ObjectId,
        ref: 'User',
    }],
    comments: [{
      type: ObjectId, 
      ref: 'Comment',
    }],
    _owner: { type: ObjectId, ref: 'User' }
});

const Post = model('Post', PostSchema);

module.exports = Post;
