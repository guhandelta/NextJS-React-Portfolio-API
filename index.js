const express = require('express');
const server = express();
const mongoose = require('mongoose')

const config = require('./config/dev')

mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('Çonnected to database!');
    }
})

// This is one way of joining routes. This endpoint is for the route /api/v1/portfolios, after reaching this route, the navigation jumps-
//- over to portfolios.js, which takes care of the rest routing, depending upon the route specified after /api/v1, in the req
server.use('/api/v1/portfolios', require('./routes/portfolios'));

//Check for any env var declared for Port and conv it into int(if any case if its was a string),else go with 3000
const PORT = parseInt(process.env.PORT) || 3001;
server.listen(PORT, (err) => {
    if (err) console.log(err)
    console.log(`Server Running on port: ${PORT}......`);
});
