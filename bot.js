var Discord = require('discord.js');
var auth = require('./auth.json');

var cron = require('cron');



var bot = new Discord.Client({
  token: auth.token,
  autorun: true,
  username: "528 bot"
});

bot.on('ready', function() {
  console.log('Logged in as %s - %s\n', bot.user.tag);
});

var five_to_eight = (() => {

  var channel = bot.channels.cache.get("692462958562902038");
  channel.send("it is " + getFiveToEight());
  channel.send("Congratulations you are todays special guest!");
  channel.send("No one likes you");
  channel.send("No one likes you");
  channel.send("Woa-ooo-ooo");
  channel.send("You're a cunt");

}).bind(this);


function getFiveToEight() {
  return five_2_eight[Math.floor(Math.random() * Math.floor(five_2_eight.length-1))];
}

let job = new cron.CronJob('00 55 07,19 * * *', five_to_eight); // fires every day, at 01:05:01 and 13:05:01

job.start();


const five_2_eight = ["528", "five to eight", "7:55", "19:55"]

bot.on('message', function(msg) {

  console.log(msg.content.indexOf("when"));

  if (msg.content.indexOf("when") !== -1) {
    console.log('sending message')
    msg.channel.send('At ' + getFiveToEight());
  }

  if(msg.content.indexOf("mine") !== -1) {
    msg.channel.send('M - I - N - I');
    msg.channel.send('Do your press ups!');
  }

});



bot.login(auth.token);
