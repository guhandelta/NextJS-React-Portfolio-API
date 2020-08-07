const express = require('express');
const router = express.Router();

const { createPortfolio, getPortfolios, getPortfolioById } = require('../controllers/portfolios');

// Path is empty, as /api/v1/portfolios is provided/appended at getPortfolios
router.get('', getPortfolios);
router.get('/:id', getPortfolioById);

router.post('', createPortfolio)

module.exports = router;
