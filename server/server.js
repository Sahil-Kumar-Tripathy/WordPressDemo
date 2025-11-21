// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_wp';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Mongo connected');
    app.listen(PORT, ()=> console.log('Server running on', PORT));
  }).catch(err=> console.error(err));
