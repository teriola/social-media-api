const { Schema, model, Types: { ObjectId } } = require('mongoose');
const Comment = require('./Comment');

const postSchema = new Schema({
  text: {
    type: String,
    required: [true, 'Please add text value'],
  },
  picture: {
    type: String,
    required: [true, 'Please add a picture'],
    match: [/^https?:\/\//, 'Invalid profile picture format'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedUsers: [{
    type: ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: ObjectId, 
    ref: 'Comment',
  }],
  _owner: {
    type: ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true,
});

const Post = model('Post', postSchema);

module.exports = Post;
