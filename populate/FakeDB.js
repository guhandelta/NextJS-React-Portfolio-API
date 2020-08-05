
const { portfolios } = require('./data')
const Portfolio = require('../db/models/portfolio')

class FakeDB {

    async clean() {
        await Portfolio.deleteMany({});
    }

    async addData() {
        await Portfolio.create(portfolios);
    }

    async populate() {
        await this.clean();
        await this.addData();
    }
}

// Exporting an instance of the class FakeDB
module.exports = new FakeDB();
