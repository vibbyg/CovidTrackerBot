const axios = require('axios');

exports.run = async (bot, message, argument) => {
    let keyword = argument[0];
    
    tenorurl = `https://g.tenor.com/v1/search?q=${keyword}&key=${process.env.TENORTOKEN}&limit=8`;
    let fetchTenorAPI = await axios.get(tenorurl);
    let tenordata = await fetchTenorAPI.data;
    let index = Math.floor(Math.random() * 8);
    if(argument.length == 0){
        console.log(tenordata);
        message.channel.send(tenordata.results[index].url);
    }
    else if(!(keyword == "") && argument[1] == "dm"){
        message.author.send(tenordata.results[index].url);
    }
    else if(!(keyword == "")){
        message.channel.send(tenordata.results[index].url);
    }
}

exports.help = {
    name: 'gif'
}