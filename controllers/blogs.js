const mongoose = require('mongoose');
const Blog = mongoose.model('Blog')

exports.getBlogs = async (req, res) => {
    const blogs = await Blog.find({ status: 'published' }).sort({ createdAt: -1 });
    res.json(blogs);

}

exports.getBlogById = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
}

exports.getBlogBySlug = async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug });
    res.json(blog);
}

exports.createBlog = async (req, res) => {
    const blogData = req.body;
    blogData.userId = req.user.sub; // to get the ID of the user
    const blog = new Blog(blogData);

    try {
        const blogPost = await blog.save();
        return res.json(blogPost);
    } catch (e) {
        return res.status(401).send(e);
    }
}
