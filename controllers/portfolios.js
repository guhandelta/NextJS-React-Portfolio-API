const mongoose = require("mongoose");

const Portfolio = mongoose.model('Portfolio'); // Capitalizing the 1st alphabet of a model var is good practice

exports.getPortfolios = async (req, res) => {
    // Portfolio models provide lots of funcitions | find() fetch data from db and find({}) fetches everything
    const portfolios = await Portfolio.find({});
    return res.json(portfolios);
}


exports.getPortfolioById = async (req, res) => {
    try {
        // The id provided in url /api/v1/portfolios/:id -> is available is request, at req.params.id
        const portfolio = await Portfolio.findById(req.params.id);
        return res.json(portfolio);
    } catch (error) {
        return res.status(400).send("API Error!!...");
    }
}
