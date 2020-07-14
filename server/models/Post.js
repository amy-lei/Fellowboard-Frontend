const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    tags: [String],
    title: {
        type: String,
        required: true,
    },
    content: Schema.Types.Mixed,
    isPinned: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: true },
});

// Exports the model
module.exports = Post = mongoose.model('post', PostSchema);