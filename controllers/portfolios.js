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

exports.createPortfolio = async (req, res) => {

    const portfolioData = req.body;
    const userId = 'google-oauth2|101848771434318992569';
    const portfolio = new Portfolio(portfolioData); // Creating an instance of the Portfolio Model

    portfolio.userId = userId;

    try {
        const newPortfolio = await portfolio.save(); // Creates and return the new portfolio, that was added/created
        return res.json(newPortfolio);
    } catch (error) {
        return res.status(422).send(error.message);
    }
}
