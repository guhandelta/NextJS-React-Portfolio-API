const express = require('express');
const router = express.Router();

// Middleware to check if the user is authenticated/admin
const { checkJWT, checkRole } = require('../controllers/auth');

const {
    getBlogs,
    getBlogById,
    getBlogBySlug,
    createBlog
} = require('../controllers/blogs');

router.get('', getBlogs);
router.get('/:id', getBlogById);
router.get('/s/:slug', getBlogBySlug); // getBlogs route and getBlogById route are bascically the same, but the getBlogBySlug requires-
//- a unique address, so `/s` is added.

router.post('', checkJWT, checkRole('ádmin'), createBlog);

module.exports = router;
