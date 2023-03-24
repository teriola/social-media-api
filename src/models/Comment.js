const { Schema, model, Types: { ObjectId } } = require('mongoose');

const commentSchema = new Schema({
  text: {
    type: String,
    required: [true, 'Please add text value'],
  },
  // likes: {
  //   type: Number,
  //   default: 0,
  // },
  _owner: {
    type: ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true,
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
