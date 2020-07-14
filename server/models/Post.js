const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    creator: Schema.Types.Mixed, // Mixed because it can be either user created
    tags: [String],              // (ObjectId) or server created (String) from
    title: {                     // fetching Discord, YouTube, Github).
        type: String,
        required: true,
    },
    content: Schema.Types.Mixed,
    timestamp: { type: Date, default: Date.now },
    isPublic: { type: Boolean, default: true },
});

// Exports the model
module.exports = Post = mongoose.model('post', PostSchema);