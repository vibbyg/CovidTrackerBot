const fetch = require('node-fetch');
exports.run = async (bot, message, argument) => {
    let caseSentence = `Here are the number of cases in ${argument[0]}:`;
    const opencovidAPI = "https://api.opencovid.ca/timeseries?stat=cases&loc=prov&date=" + dateFormatter();
    function dateFormatter(){
        const date = new Date();
        let dmy = "";
        if(date.getMonth().toString().length === 1){
            if(date.getDay().toString().length === 1){
                dmy =  "0" + date.getDate().toString() + "-0" + (date.getMonth() + 1).toString() + "-" + date.getFullYear().toString();
                return dmy;
            }
            else{
                dmy =  date.getDate().toString() + "-0" + (date.getMonth() + 1).toString() + "-" + date.getFullYear().toString();
                return dmy;
            }
        }
        else if (date.getDay().toString().length === 1){
            dmy =  "0" + date.getDate().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getFullYear().toString();
            return dmy;
        }
        else{
            dmy = date.getDate().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getFullYear().toString();
            return dmy;
        }
        }
        dateFormatter();
    let fetchAPI = await fetch(opencovidAPI);
    let casesValue = await fetchAPI.json();
    // let fetchAPI = async () => {
    //     let response = await axios.get(opencovidAPI);
    //     let caseData = response.data;
    //     return caseData;
    // }
    // let casesValue = await fetchAPI();
    if(casesValue.cases === ""){
        message.channel.send("L");
    }
    if(argument[0] === "ab"){
        message.channel.send(`${caseSentence} + ${casesValue.cases[0].cases}`);
    }
    if(argument[0] === "bc"){
        console.log(opencovidAPI);
        message.channel.send(`${caseSentence} + ${casesValue.cases[1].cases}`);
    }
    
}

exports.help = {
    name: 'cases'
}