// server/routes/posts.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const WP_BASE = process.env.WP_BASE || 'https://demo.wp-api.org'; // <-- change to your WP site

// GET /api/posts -> fetch WP posts
router.get('/', async (req, res) => {
  try {
    const wpRes = await axios.get(`${WP_BASE}/wp-json/wp/v2/posts`, { params: req.query });
    res.json(wpRes.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET /api/posts/:id -> single post
router.get('/:id', async (req, res) => {
  try {
    const wpRes = await axios.get(`${WP_BASE}/wp-json/wp/v2/posts/${req.params.id}`);
    res.json(wpRes.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

module.exports = router;
