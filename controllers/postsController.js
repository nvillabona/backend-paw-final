const express = require('express');
const { validationResult } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');

// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json({
            ok: true,
            posts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error,
        });
    }
};

// Create a new post
const createPost = async (req, res) => {
    const user = await User.findById(req.body.user)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.array(),
        });
    }

    try {
        const post = new Post({...req.body, creator: user.username}) ;

        await post.save();
        res.status(200).json({
            ok: true,
            message: "Post saved successfully",
            post,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error,
        });
    }
};

// Get a specific post by ID
const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                ok: false,
                error: 'Post not found',
            });
        }
        res.status(200).json({
            ok: true,
            post,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error,
        });
    }
};

// Update a specific post by ID
const updatePostById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.array(),
        });
    }

    try {
        const postId = req.params.id;
        const { title, content } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, content },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({
                ok: false,
                error: 'Post not found',
            });
        }
        res.status(200).json({
            ok: true,
            post: updatedPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error,
        });
    }
};

// Delete a specific post by ID
const deletePostById = async (req, res) => {
    try {
        const postId = req.params.id;

        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({
                ok: false,
                error: 'Post not found',
            });
        }
        res.status(200).json({
            ok: true,
            post: deletedPost,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error,
        });
    }
};

// Get posts by user ID
const getPostsByUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const posts = await Post.find({ user: userId });

        res.status(200).json({
            ok: true,
            posts,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error,
        });
    }
};

// Add a comment to a post
const addComment = async (req, res) => {
    const postId = req.params.id;
    const { content, user } = req.body;

    try {
        let post = await Post.findById(postId);
        console.log(post);
        if (!post) {
            return res.status(404).json({
                ok: false,
                error: 'Post not found',
            });
        }

        const newComment = {
            content,
            user,
            createdAt: new Date(),
        };
        console.log(post.title)
        post.comments.push(newComment);
        await post.save();

        res.status(201).json({
            ok: true,
            comment: newComment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error,
        });
    }
};

    module.exports = {
        getAllPosts,
        createPost,
        getPostById,
        updatePostById,
        deletePostById,
        getPostsByUser,
        addComment
    };
