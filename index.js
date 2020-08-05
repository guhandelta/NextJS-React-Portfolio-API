const express = require('express');
const server = express();

server.get('/test', (req, res) => {
    return res.json({ message: 'This endpoint works perfectly.......' })
})

//Check for any env var declared for Port and conv it into int(if any case if its was a string),else go with 3000
const PORT = parseInt(process.env.PORT) || 3001;
server.listen(PORT, (err) => {
    if (err) console.log(err)
    console.log(`Server Running on port: ${PORT}......`);
});
