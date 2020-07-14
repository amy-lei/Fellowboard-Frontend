const express = require("express");
const fetch = require('node-fetch');
const router = express.Router();
const tools = require('./routes/github');

tools.fetchIssues("MLH-Fellowship", "click")
tools.fetchPRs("MLH-Fellowship", "httpie")

module.exports = router;

