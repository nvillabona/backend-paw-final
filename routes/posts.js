const express = require('express');
const router = express.Router();


const { postValidation } = require('../middlewares/posts');
const { getAllPosts, createPost, getPostById, updatePostById, deletePostById, addComment, getPostsByUser } = require('../controllers/postsController');

// Posts Routes
router.get('/', postValidation,  getAllPosts);
router.post('/', postValidation, createPost);
router.get('/:id', getPostById);
router.get('/user/:id', getPostsByUser)
router.put('/:id', updatePostById);
router.delete('/:id', deletePostById);
router.post('/:id/comment', addComment);



module.exports = router;