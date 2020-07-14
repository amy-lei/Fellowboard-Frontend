const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    githubId: {
        type: String,
        required: true,
    },
    username: { // GitHub username
        type: String,
        required: true, 
    },
    avatarUrl: {
        type: String,
        required: true,
    },
    fullname: String, 
    discord: String,
    posts: { type: Array, default: [] },

});

// Exports the model
module.exports = User = mongoose.model('user', UserSchema);