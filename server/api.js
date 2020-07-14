const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();
var tools = require('./routes/github');

tools.fetchIssues("MLH-Fellowship", "click")

module.exports = router;

