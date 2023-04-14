const Post = require("../models/Post");

exports.getAllPosts = () => Post.find().populate('owner', 'name surname profilePicture');
