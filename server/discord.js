const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_GUILD = '716052909271285803';

async function discordFetch() {
    return 0;
};

client.on('ready', async () => {
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
});

client.login(DISCORD_TOKEN);

async function fetchPosts(client, guild) {
    //id for topics category (where all the golang, python, etc. channels are)
    const CATEGORY_ID = '716458296030265344';
    //if we want to ignore channels like #battlestations, #coffee, etc.
    const IGNORE_LIST = [];

    const guildChannels = guild.channels.cache;
    const topicChannels = [];

    guildChannels.each(channel => {
        if(channel.parentID === CATEGORY_ID) {
            topicChannels.push({
                "id": channel.id,
                "name": channel.name,
            });
        }
    })

    let posts = [];

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
    posts = posts.flat();

    return posts;

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
        console.log(channelName);
        const posts = [];

        channelMessages.forEach(msg => {
            if (msg.content.includes('https://') || msg.content.includes('http://')) {
                if(msg.embeds || msg.embeds.length) {
                    msg.embeds.forEach(e => {
                        posts.push({
                            "creator": "server",
                            "tags": [channelName],
                            "title": e.title ? e.title : msg.content,
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

}