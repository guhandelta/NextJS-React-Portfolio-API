const mongoose = require('mongoose')

const config = require('../config/dev')

exports.connect = () => {

    return mongoose.connect(config.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    }, (err) => {
        if (err) {
            console.error(err)
        } else {
            console.log('Çonnected to database!');
        }
    })
}
