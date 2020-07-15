const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();

// connect to database
const mongoConnectionURL = process.env.MONGODB_SRV; 
mongoose
    .connect(mongoConnectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: "Dashboard",
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(`${err}: Failed to connect to MongoDB`));

// default all api endpoints to the defined routes in `api.js`
const app = express();
app.use(express.json());
app.use("/api", require("./api.js"));

if (process.env.ENV === "PRODUCTION") {
    const reactPath = path.resolve(__dirname, "..", "client", "build");
    app.use(express.static(reactPath));
    app.get("*", (req, res) => {
        res.sendFile(path.join(reactPath, "index.html"));
    });
}

// handle errors
app.use((err, req, res, next) => {
    const status = err.status || 500;
    if (status === 500) {
        console.log("The server errored when processing a request");
        console.log(err);
    }
    res.status(status);
    res.send({
        status,
        message: err.message,
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));