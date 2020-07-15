const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();
const tools = require('./routes/github');

tools.fetchUsers();

module.exports = router;

