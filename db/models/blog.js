
const mongoose = require('mongoose');
const Schema = mongoose.Schema;// Creating schema | It's a nice practice capitalizing Schema, as Schema is a class and this statement-
//- will create an instance

const blogSchema = new Schema({
    slug: { type: String, unique: true, sparse: true }, //sparse - blogs don't have a slug during creation and get one during publishing
    title: { type: String, required: true, maxlength: 128 },
    subtitle: { type: String, required: true, maxlength: 128 },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    status: { type: String, default: 'draft', enum: ['draft', 'published'] },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Blog', blogSchema); //Model name, Schema
