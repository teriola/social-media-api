const { validationResult } = require('express-validator');
const { isAuth } = require('../middlewares/authMiddleware');
const { getAllPosts, createPost, getUserPosts, getUserBookmarks } = require('../services/postService');
const { validatePost } = require('../utils/validations');
const { parseError } = require('../utils/parser');

const router = require('express').Router();

// Get posts
// GET /posts
// Public
router.get('/', async (req, res) => {
    const posts = await getAllPosts();
    res.status(200).json(posts);
});

// Create post
// POST /posts
// Private
router.post('/', 
    isAuth,
    validatePost(),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) throw errors;

            // Create post
            const post = await createPost(req.body, req.user._id);

            res.status(200).json(post);
        } catch (err) {
            res.status(400).json({ 
                errors: parseError(err) 
            });
        }
    });

// Get posts for user
// GET /posts/user/:id
// Public
router.get('/user/:id', async (req, res) => {
    const posts = await getUserPosts(req.params.id);
    res.status(200).json(posts);
});

// Get bookmarks for user
// GET /posts/bookmarks
// Private
router.get('/bookmarks', 
    isAuth,
    async (req, res) => {
        const bookmarks = await getUserBookmarks(req.user._id);

        res.status(200).json(bookmarks);
    });

// Set bookmark for user
// POST /posts/bookmarks
// Private
// const setUserBookmark = asyncHandler(async (req, res) => {
//   const { postId } = req.body;
//   const user = await User.findById(req.user._id);
//   user.bookmarks.push(postId);
//   user.save();
//   console.log(user);
//   res.status(204).json({
//     message: "Bookmarked successfully",
//   });
// });

module.exports = router;


/*
// Remove bookmark for user
// DELETE /posts/bookmarks
// Private
const removeUserBookmark = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const user = await User.findById(req.user._id);
  user.bookmarks.splice(user.bookmarks.indexOf(postId), 1);
  user.save();
  res.status(204).json({
    message: "Bookmark successfully removed",
  });
});

// Get post
// GET /posts/:id
// Public
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  res.status(200).json(post);
});


// Update post
// PUT /posts/:id
// Private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  const updatedPost = await Post.findOneAndUpdate(req.params.id, req.body, { new: true }).populate('_owner', ['profilePicture', 'name', 'surname']);
  res.status(200).json(updatedPost);
});

// Delete post
// DELETE /posts/:id
// Private
const deletePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);

  if (post._owner.toString() != req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized')
  }
  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }
  await Post.deleteOne({ _id: id });

  res.status(200).json({ id });
});

// Like post
// POST /posts/:id/like
// Private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.likedUsers.includes(req.user._id)) return;
  post.likedUsers.push(req.user._id);
  post.likes += 1;
  post.save();

  res.status(200).json(post);
});

// Remove like
// POST /posts/:id/unlike
// Private
const removeLikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likedUsers.includes(req.user._id)) return;
  post.likedUsers.splice(post.likedUsers.indexOf(req.user._id), 1);
  post.likes -= 1;
  post.save();

  res.status(200).json(post);
});

// Post comment
// POST /posts/:id/comment
// Private
const commentPost = asyncHandler(async (req, res) => {
  console.log(req.body);
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post does not exist');
  }
  const comment = await Comment.create({
    text: req.body.text,
    _owner: req.user._id,
  });
  post.comments.push(comment._id);
  post.save();
  res.status(204).json({ message: 'Comment created' });
});

// Get comments
// GET /posts/:id/comments
// Public
const getPostComments = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post does not exist');
  }
  const populatedPost = await post.populate({
    path: 'comments',
    populate: {
      path: '_owner',
    }
  });

  res.status(200).json(populatedPost.comments);
});
*/
