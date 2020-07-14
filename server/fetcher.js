const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
require('dotenv').config({ path: '../.env'});


const getVideos = async () => {
    const youtube = google.youtube("v3");
    const channel = await youtube.channels.list({
        auth: process.env.YOUTUBE_API_KEY,
        part: "contentDetails,status",
        id: "UCBYaqTVeO-oQW2AlmZVj-Fg"
    });

    if (channel.status !== 200) {
        throw Error(`${channel.status} error: failed to GET channel`);
    }

    const playlistId = channel.data.items[0].contentDetails.relatedPlaylists.uploads;
    const playlist = await youtube.playlistItems.list({
        playlistId,
        auth: process.env.YOUTUBE_API_KEY,
        part: "snippet,contentDetails,status",
        maxResults: 50,
    });

    if (playlist.status !== 200) {
        throw Error(`${playlist.status} error: failed to GET uploads`);
    }

    const videos = playlist.data.items
        .filter((video) => video.snippet.title.includes('MLH Fellowship'))
        .map((video) => {
            return {
                id: video.id,
                title: video.snippet.title,
                description: video.snippet.description,
                thumbnails: video.snippet.thumbnails.standard,
                timestamp: video.snippet.publishedAt,
            }
        });

    console.log(videos);
}

if (module === require.main) {
    getVideos().catch(console.error);
  }
  module.exports = getVideos;

