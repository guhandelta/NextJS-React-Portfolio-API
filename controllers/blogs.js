const mongoose = require('mongoose');
const Blog = mongoose.model('Blog')
const slugify = require('slugify');
const uniqueSlug = require('unique-slug');

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
        return res.status(401).send(e.message);
    }
}

exports.getBlogsByUser = async (req, res) => {
    const userId = req.user.sub;
    const blogs = await Blog.find({ // Fetch all the blogs that have a userId and the status is either `draft` or `published`
        // To make sure the deleted blogs | blogs with status `deleted` are not fetched
        userId,
        status: { $in: ['draft', 'published'] }
    });
    return res.json(blogs);
}

const _saveBlog = async blogInstance => {
    try {
        const createdBlog = await blogInstance.save();
        return createdBlog;
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.slug) { //Checking if the error is due to the slug
            // Append some content to make it unique
            blogInstance.slug += `-${uniqueSlug()}`;
            return _saveBlog(blogInstance); //Recurssive fn call => call the fn again with the new slug and repeat the if the issue still persists
        }

        //In case the error is not related to the slug
        throw (err);
    }
}

exports.updateBlog = async (req, res) => {
    const { body, params: { id } } = req; // Destructurizing the id form the params

    // Find the blog to update, by it's id
    Blog.findById(id, async (err, blog) => {
        if (err) {
            res.status(422).send(err.message);
        }

        // if blog contains status | if the status is published | if the blog does not have a slug
        if (body.status && body.status === 'published' && !blog.slug) {
            // Creating a slug for the blog from the blog's title
            blog.slug = slugify(blog.title, {
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                lower: true,      // convert to lower case, defaults to `false`
            })
        }

        blog.set(body); //This will just update the copy/instace of the blog received in findById() and won't make any req to db
        blog.updatedAt = new Date(); //Getting the time the blog was updated

        try {
            const updatedBlog = await _saveBlog(blog);
            return res.json(updatedBlog);
        } catch (err) {
            res.status(422).send(err.message);
        }
    });

}


