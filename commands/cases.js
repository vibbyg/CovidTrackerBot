const fetch = require('node-fetch');
exports.run = async (bot, message, argument) => {
    let date = new Date();
    let dateYesterday = new Date(date.getTime() - 24*60*60*1000);
    const covidAPI = 'https://api.opencovid.ca/timeseries?stat=cases&loc=prov&date=' 
    let covidAPIRelative = covidAPI + dateFormatter(date);

    // Date is formatted in the appropriate method in order to fetch the COVID API.
    function dateFormatter(date){
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
        dateFormatter(date);

    // fetching API
    let fetchAPI = await fetch(covidAPIRelative);
    let casesValue = await fetchAPI.json();

    let caseSentence = 'Here are the number of cases in ';
    let nocaseSentence = "Case data has not updated today. \n You can either call yesterday's data by using !cases yesterday (province/territory) or call a cute gif using !gif cute";
    // function for determining which message to print.
    let allProv = [["ab", "Alberta", "AB", "alberta"], ["bc", "BC"], ["mb", "MB", "Manitoba", "manitoba"], ["NB", "nb"], ["NL", "nl"], ["NS", "ns"], ["NU", "nu", "Nunavut", "nunavut"], ["NWT, nwt"], ["ON", "on", "Ontario", "ontario"], ["PE", "PEI", "pe", "pei"], ["Quebec", "QC", "qc", "quebec"], ["Repatriated", "repatriated"], ["Saskatchewan", "saskatchewan", "SK", "sk"], ["YT", "yt", "Yukon", "yukon"]]
    function getCases(prov, valueVar){
        let counter = 0;
        let messageToSend = "";
        allProv.forEach(val => {
            if(val.includes(prov)){
                messageToSend = `${caseSentence}${valueVar.cases[counter].province}: ${valueVar.cases[counter].cases} \n| Statistics provided by opencovid.ca |`;
            }
            else{
                counter++;
            }
        });
        if(argument[argument.length - 1] === "dm" && !(messageToSend == "")){
            message.author.send(messageToSend);
        }
        else if(!(messageToSend == "")){
            message.channel.send(messageToSend);
        }
    }
    if(argument.length == 1 && !(casesValue.cases.length == 0)){
        getCases(argument[0], casesValue);
    }
    else if(argument[0] === "yesterday"){
        date = new Date(date.getTime() - 24*60*60*1000);
        covidAPIRelative = covidAPI + dateFormatter(date);
        fetchAPI = await fetch(covidAPIRelative);
        casesValue = await fetchAPI.json();
        console.log(casesValue);
        getCases(argument[1], casesValue);
    }
    else{
        if(argument[argument.length - 1] == "dm"){
            message.author.send(nocaseSentence);
        }
        else{message.reply(nocaseSentence);}
    }
    
}

exports.help = {
    name: 'cases'
}