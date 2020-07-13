const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_GUILD = '716052909271285803';
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    const guild = client.guilds.resolve(DISCORD_GUILD);
    const members = guild.members.cache;
    console.log(members.length);
});

client.login(DISCORD_TOKEN);

async function fetchPosts(client) {
    
};

async function getUsers(client) {
    const guild = client.guilds.resolve(DISCORD_GUILD);
    const members = guild.members.cache;
    const users = [];
    
};