
const mongoose = require('mongoose');
const Schema = mongoose.Schema;// Creating schema | It's a nice practice capitalizing Schema, as Schema is a cclass and this statement-
//- will create an instance

const portfolioSchema = new Schema({
    title: String,
    description: String
})

module.exports = mongoose.model('Portfolio', portfolioSchema); //Model name, Schema
