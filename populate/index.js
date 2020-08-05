const mongoose = require('mongoose')

const config = require('../config/dev')

const fakeDB = require('./FakeDB');


mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}, async (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('> Initiating Database population!...');
        await fakeDB.populate();
        await mongoose.connection.close();
        console.log('> Database populate complete!...');
    }
})

