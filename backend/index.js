const express = require('express')
const app = express()
const port = 5002
const mongoDB = require("./db")
const cors = require('cors');
require("dotenv").config();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

mongoDB();
app.get('/', (req, res) => {
    res.send('The Server is up and running...')
})

app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})