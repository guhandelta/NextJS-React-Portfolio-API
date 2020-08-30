const express = require('express');
const router = express.Router();

const {
    createPortfolio,
    getPortfolios,
    getPortfolioById,
    updatePortfolio
} = require('../controllers/portfolios');

// Middleware to check if the user is authenticated/admin
const { checkJWT } = require('../controllers/auth');

// Path is empty, as /api/v1/portfolios is provided/appended at getPortfolios
router.get('', getPortfolios);
router.get('/:id', getPortfolioById);

// Adding the auth middleware, allows only the authenticated users to access this endpoint
router.post('', checkJWT, createPortfolio)

router.patch('/:id', checkJWT, updatePortfolio)

module.exports = router;
