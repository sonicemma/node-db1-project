const express = require("express");
const router = require('../router/router');
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use('/api/accounts', router)

server.get('/', (req, res) => {
    res.status(200).json({api: ''})
})

module.exports = server;
