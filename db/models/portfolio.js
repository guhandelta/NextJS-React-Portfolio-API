
const mongoose = require('mongoose');
const Schema = mongoose.Schema;// Creating schema | It's a nice practice capitalizing Schema, as Schema is a cclass and this statement-
//- will create an instance

const portfolioSchema = new Schema({
    title: { type: String, required: true, maxlength: 128 },
    company: { type: String, required: true, maxlength: 128 },
    companyWebsite: { type: String, required: true, maxlength: 128 },
    location: { type: String, required: true },
    jobTitle: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Portfolio', portfolioSchema); //Model name, Schema
