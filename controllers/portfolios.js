const mongoose = require("mongoose");

const Portfolio = mongoose.model('Portfolio'); // Capitalizing the 1st alphabet of a model var is good practice

exports.getPortfolios = async (req, res) => {
    // Portfolio models provide lots of funcitions | find() fetch data from db and find({}) fetches everything
    const portfolios = await Portfolio.find({}).sort({ createdAt: -1 });
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
    console.log(portfolioData);
    const userId = req.user.sub; //Fetching the userId dynamically from the req object
    const portfolio = new Portfolio(portfolioData); // Creating an instance of the Portfolio Model

    portfolio.userId = userId;

    try {
        const newPortfolio = await portfolio.save(); // Creates and return the new portfolio, that was added/created
        return res.json(newPortfolio);
    } catch (error) {
        return res.status(422).send(error.message);
    }
}

exports.updatePortfolio = async (req, res) => {
    const { body, params: { id } } = req; // Destructurizing the id form the params

    try {
        const updatedPortfolio = await Portfolio.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true, useFindAndModify: false });
        // findOneAndUpdate() => Updates a single document based on the filter and sort criteria || _id is how the id is defn in mongodb
        // new, to ensure newPortfolio gets an updated portfolio | runValidators will make sure the validators defn in portfolio modal,-
        //-in mongoDB will be exe
        return res.json(updatedPortfolio);
    } catch (error) {
        return res.status(422).send(error.message);
    }
}

exports.deletePortfolio = async (req, res) => {
    const portfolio = await Portfolio.findOneAndDelete({ _id: req.params.id });
    return res.json({ _id: portfolio.id })
}
