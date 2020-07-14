<<<<<<< HEAD
const Discord = require('discord.js');
const mongoose = require("mongoose");
const fs = require('fs');
const client = new Discord.Client();
const Post = require("./models/Post");
=======
const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();
>>>>>>> 7632372a9fabc1d8bd8b7073c0a9880c471684b6
require('dotenv').config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_GUILD = '716052909271285803';

<<<<<<< HEAD
const mongoConnectionURL = process.env.MONGODB_SRV; 

async function dbConnect() {
    mongoose
    .connect(mongoConnectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: "Dashboard",
    })
    .then(() => {
        console.log("Connected to MongoDB");
        
    })
    .catch(err => console.log(`${err}: Failed to connect to MongoDB`));
}


const db = mongoose.connection;

client.on('ready', async () => {
    await dbConnect();
=======
async function discordFetch() {
    return 0;
};

client.on('ready', async () => {
>>>>>>> 7632372a9fabc1d8bd8b7073c0a9880c471684b6
    console.log(`Logged in as ${client.user.tag}`);
    console.log('Discord - Getting guild/server');
    const guild = client.guilds.resolve(DISCORD_GUILD);
    console.log('Discord - Got guild/server');
    console.log('Discord - Getting users');
    const users = getUsers(client, guild);
    console.log(`Discord - Got users, ${users.length} found`);
    console.log('Discord - Fetching posts');
    const posts = await fetchPosts(client, guild)
    console.log(`Discord - Fetched posts: ${posts.length}`);
<<<<<<< HEAD
    console.log(`MongoDB - Uploading to database`);
    const [added, skipped] = await addPostsToDatabase(posts);
    console.log(`MongoDB - Uploaded posts to database: ${added} new posts added, ${skipped} old posts skipped`);
    process.exit(0);
=======
>>>>>>> 7632372a9fabc1d8bd8b7073c0a9880c471684b6
});

client.login(DISCORD_TOKEN);

<<<<<<< HEAD
//for debug
function writeToFile(posts) {
    fs.writeFile("./discord_posts.json", JSON.stringify(posts), (err) => {
        if(err) {
            console.log(err);
            return;
        }
    });
    console.log("Wrote to file");
}

=======
>>>>>>> 7632372a9fabc1d8bd8b7073c0a9880c471684b6
async function fetchPosts(client, guild) {
    //id for topics category (where all the golang, python, etc. channels are)
    const CATEGORY_ID = '716458296030265344';
    //if we want to ignore channels like #battlestations, #coffee, etc.
    const IGNORE_LIST = [];

    const guildChannels = guild.channels.cache;
    const topicChannels = [];
<<<<<<< HEAD
    //get all the channels 
=======

>>>>>>> 7632372a9fabc1d8bd8b7073c0a9880c471684b6
    guildChannels.each(channel => {
        if(channel.parentID === CATEGORY_ID) {
            topicChannels.push({
                "id": channel.id,
                "name": channel.name,
            });
        }
    })

    let posts = [];

<<<<<<< HEAD
    //get the posts with links for each channel
=======
>>>>>>> 7632372a9fabc1d8bd8b7073c0a9880c471684b6
    for(let i = 0; i < topicChannels.length; i++) {
        const channel = topicChannels[i];
        try {
            const textChannel = await client.channels.fetch(channel.id);
            const channelPosts = await getPostsFromChannelMessages(textChannel);
            posts.push(channelPosts);
        } catch(e) {
            console.log(e);
        }
    }
<<<<<<< HEAD
    //flatten array from [[Posts], [Posts], [Posts]] to [Post, Post, Post, Post...]
    posts = posts.flat();

    return posts;
=======
    posts = posts.flat();

    return posts;

>>>>>>> 7632372a9fabc1d8bd8b7073c0a9880c471684b6
};

function getUsers(client, guild) {
    const members = guild.members.cache;
    const users = [];
    members.each(member => {
        users.push(
            {
                "displayName": member.displayName,
                "id": member.id,
                "nickname": member.nickname,
                "roles": member.roles.cache.array(),
                "tag": member.user.tag,
            }
        )
    });

    users.forEach(user => {
        user.roles = user.roles.map(role => role.name);
    });

    return users;
};

async function getPostsFromChannelMessages(channel) {
    try {
        //default fetch is 50 messages
        const channelMessages = await channel.messages.fetch();
        const channelName = `#${channel.name}`;
<<<<<<< HEAD
        // console.log(channelName);
=======
        console.log(channelName);
>>>>>>> 7632372a9fabc1d8bd8b7073c0a9880c471684b6
        const posts = [];

        channelMessages.forEach(msg => {
            if (msg.content.includes('https://') || msg.content.includes('http://')) {
                if(msg.embeds || msg.embeds.length) {
                    msg.embeds.forEach(e => {
                        posts.push({
                            "creator": "server",
                            "tags": [channelName],
<<<<<<< HEAD
                            "title": e.title ? e.title : `${channelName} Post`,
=======
                            "title": e.title ? e.title : msg.content,
>>>>>>> 7632372a9fabc1d8bd8b7073c0a9880c471684b6
                            "type": "discord",
                            "timestamp": new Date(msg.createdTimestamp),
                            "isPublic": true,
                            "content": {
                                "url": e.url,
                                "desc": e.description ? e.description : ""
                            }
                        });
                    })
                    
                }
            }
        });
        return posts;
    } catch(e) {
        console.log(e);
    }

<<<<<<< HEAD
}

function setupDatabaseCollection() {

}

async function addPostsToDatabase(posts) {
    let added = 0;
    let skipped = 0;
    for(let i = 0; i < posts.length; i++) {
        
        const post = Post(posts[i]);
        
        try {
            const exists = await Post.findOne(posts[i]);
            if(!exists) {
                await post.save();
                console.log(`added ${post.title} to database`);
                added++;
            }
            else {
                console.log(`${post.title} already exists, skipping`);
                skipped++;
            }
        } catch (e) {
            console.log(e);
        }
    }
    return [added, skipped];
=======
>>>>>>> 7632372a9fabc1d8bd8b7073c0a9880c471684b6
}