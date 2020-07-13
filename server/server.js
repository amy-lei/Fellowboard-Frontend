const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use("/api", require("./api.js"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

