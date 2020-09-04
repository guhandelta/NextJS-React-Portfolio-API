const express = require('express');
const router = express.Router();

// Middleware to check if the user is authenticated/admin
const { checkJWT, checkRole } = require('../controllers/auth');

const { getBlogs } = require('../controllers/blogs');

router.get('', getBlogs);

module.exports = router;
