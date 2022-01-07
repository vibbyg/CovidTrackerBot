# CovidTrackerBot

Do you live in Canada and always want to stay up to date with the latest COVID cases in your area? If so, then you're in the right place!
The Covid Tracker Bot is a discord bot that can be added to your server to get the latest updates on COVID cases in your area, along with case information on
previous days and much more! You can also create use the gif command to generate a random gif on the topic of your choosing.

# How it works

The Covid Tracker Bot utilizes the "!" prefix. So, to call a valid command, start the message with ! followed by one of the valid commands:

* hello // the bot says hello back!
* gif // the bot will send you a random gif!
* gif {keyword} // the bot will send you a random gif related to the keyword you entered!
* gif {keyword} dm // the bot will direct message you a random gif related to the keyword you entered!
* cases {province/territory} // this will tell you the number of cases in that province/territory today.
* cases {province/territory} dm // this will direct message you the number of cases in that province/territory today.
* cases yesterday {province/territory} // this will tell you the number of cases in that province/territory from yesterday.
* cases yesterday {province/territory} dm // this will direct message you the number of cases in that province/territory today.

Commands are continuously added, so be out on the look out for any updates!

# How it was made

This Covid Tracker Bot was made with Node JS, and I utilized both FetchAPI and Axios to GET data from Tenor GIF's and Open Covid's APIs. To organize all the commands, I also implemented a command handler.
https://opencovid.ca/,
https://tenor.com/

Enjoy :)
