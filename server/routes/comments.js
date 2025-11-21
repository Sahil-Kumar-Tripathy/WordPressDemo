// server/routes/comments.js
const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// POST /api/comments  -> create comment
router.post('/', async (req, res) => {
  try {
    const { postId, name, email, body } = req.body;
    if (!postId || !name || !body) return res.status(400).json({ error: 'postId, name, body required' });
    const comment = new Comment({ postId, name, email, body });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save comment' });
  }
});

// GET /api/comments?postId=123 -> list comments for post
router.get('/', async (req, res) => {
  try {
    const { postId } = req.query;
    const query = postId ? { postId: Number(postId) } : {};
    const comments = await Comment.find(query).sort({ createdAt: -1 }).limit(200);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

module.exports = router;
