const mongoose = require("mongoose");

const Portfolio = mongoose.model('Portfolio'); // Capitalizing the 1st alphabet of a model var is good practice

exports.getPortfolios = async (req, res) => {
    // Portfolio models provide lots of funcitions | find() fetch data from db and find({}) fetches everything
    const portfolios = await Portfolio.find({});
    return res.json(portfolios);
}
