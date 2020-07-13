const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_GUILD = '716052909271285803';
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log('Discord - Getting guild/server');
    const guild = client.guilds.resolve(DISCORD_GUILD);
    console.log('Discord - Got guild/server');
    console.log('Discord - Getting users');
    getUsers(client, guild);
    console.log('Discord - Got users');
    console.log('Discord - Fetching posts');
    fetchPosts(client, guild);
    console.log('Discord - fetched posts');
});

client.login(DISCORD_TOKEN);

function fetchPosts(client, guild) {
    //id for topics category (where all the golang, python, etc. channels are)
    const CATEGORY_ID = '716458296030265344';
    //if we want to ignore channels like #battlestations, #coffee, etc.
    const IGNORE_LIST = [];

    const guildChannels = guild.channels.cache;
    const channels = [];

    guildChannels.each(channel => {
        if(channel.parentID === CATEGORY_ID) {
            channels.push({
                "id": channel.id,
                "name": channel.name
            });
        }
    })
    console.log(channels);
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
                "tag": member.user.tag
            }
        )
    })
    users.forEach(user => {
        user.roles = user.roles.map(role => role.name);
    })
    return users;
};

function getUserRoles(user) {

}