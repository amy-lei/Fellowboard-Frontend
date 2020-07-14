const { google } = require('googleapis');
const mongoose = require("mongoose");
const Post = require('./models/Post');
require('dotenv').config();

// connect to database
const mongoConnectionURL = process.env.MONGODB_SRV; 

const connectToDB = async () => {
    mongoose
    .connect(mongoConnectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: "Dashboard",
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(`${err}: Failed to connect to MongoDB`));
}

const getVideos = async () => {
    await connectToDB();

    // get the MLH channel
    const youtube = google.youtube("v3");
    const channel = await youtube.channels.list({
        auth: process.env.YOUTUBE_API_KEY,
        part: "contentDetails,status",
        id: "UCBYaqTVeO-oQW2AlmZVj-Fg"
    });

    if (channel.status !== 200) {
        throw Error(`${channel.status} error: failed to GET channel`);
    }

    // get all of (up to 50) MLH's uploaded videos
    const playlistId = channel.data.items[0].contentDetails.relatedPlaylists.uploads;
    const playlist = await youtube.playlistItems.list({
        playlistId,
        auth: process.env.YOUTUBE_API_KEY,
        part: "snippet,status,contentDetails",
        maxResults: 50,
    });

    if (playlist.status !== 200) {
        throw Error(`${playlist.status} error: failed to GET uploads`);
    }

    // keep only MLH Fellowship videos, and keep only relevant info
    const videos = playlist.data.items
        .filter((video) => video.snippet.title.includes('MLH Fellowship'))
        .map((video) => {
            return {
                creator: "server",
                type: "youtube",
                tags: ["MLH-Workshop"],
                title: video.snippet.title,
                content: {
                    id: video.contentDetails.videoId,
                    description: video.snippet.description,
                    thumbnails: video.snippet.thumbnails.standard,
                },
                timestamp: new Date(video.snippet.publishedAt),
                isPublic: true,
            }
        });
    console.log(`found ${videos.length} videos`);

    // add videos to db iff they don't already exist
    const allVideos = [];
    for (let i = 0; i < videos.length; i++) {
        const post = Post(videos[i]);
        const found = await Post.find({ content: videos[i].content }); // videoId is unique
        if (found.length === 0) {
            const savedPost = await post.save();
            allVideos.push(savedPost);
        }
    }
    console.log(allVideos);
    console.log(`added ${allVideos.length} videos`);
    process.exit(0);
}

if (module === require.main) {
    getVideos().catch(console.error);
}
module.exports = getVideos;

