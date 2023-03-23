const { Schema, model, Types: { ObjectId } } = require('mongoose');

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
  likes:{
    type: Number,
    default: 0,
  },
  _owner: { type: ObjectId, ref: 'User' }
}, 
  {
    timestamps:true,
  }
);

const Post = model('Post', postSchema);

module.exports = Post;
