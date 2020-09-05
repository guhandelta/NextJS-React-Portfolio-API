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


exports.updateBlog = async (req, res) => {
    const { body, params: { id } } = req; // Destructurizing the id form the params

    // Find the blog to update, by it's id
    Blog.findById(id, async (err, blog) => {
        if (err) {
            res.status(422).send(err.message);
        }

        blog.set(body); //This will just update the copy/instace of the blog received in findById() and won't make any req to db
        blog.updatedAt = new Date(); //Getting the time the blog was updated

        try {
            const updatedBlog = await blog.save();
            return res.json(updatedBlog);
        } catch (err) {
            res.status(422).send(err.message);
        }
    });

}

