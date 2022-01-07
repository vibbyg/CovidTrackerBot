const Discord = require('discord.js');
const fetch = require('node-fetch');
const axios = require('axios');
//require("dotenv").config();
const bot = new Discord.Client({
    allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: true,
    },
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_PRESENCES",
        "GUILD_MEMBERS",
        "GUILD_MESSAGE_REACTIONS"
    ]
});

bot.commands = new Discord.Collection();

const fs = require('fs');
bot.commands = new Discord.Collection();
bot.login(process.env.BOTTOKEN);

bot.on("ready", () =>{
    console.log("Let's get started!");

    fs.readdir('./commands', (err, files) =>{
        if(err){return console.log(err)};

        let jsfile = files.filter(f => f.split(".").pop() == 'js');
        if(jsfile.length == 0){return console.log("No files could be found")};

        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props);
        })
    })
});


bot.on("messageCreate", async (message) => {
    if(message.author.bot){return};
    if(message.channel.type !== "GUILD_TEXT") {return};
    // signals the start of a possible command
    let prefix = "!";
    let MessageArray = message.content.split(' ');
    console.log(MessageArray);
    let command = MessageArray[0].slice(prefix.length);
    let argument = MessageArray.slice(1);

    if (!message.content.startsWith(prefix)) return;

    let commandfile = bot.commands.get(command);
    if(commandfile) {commandfile.run(bot, message, argument);}
});