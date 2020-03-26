var Discord = require('discord.js');
var auth = require('./auth.json');
var cron = require('cron');

require('dotenv').config();

console.log(process.env.FIVE_CHANNEL);

var five_to_eight_channel_id;// = "692462958562902038";

var valid_channels = [];

var bot = new Discord.Client({
  token: auth.token,
  autorun: true,
  username: "528 bot"
});

bot.on('ready', function() {

  var VALID_CHANNELS_s = process.env.VALID_CHANNELS.split(',');
  console.log(VALID_CHANNELS_s);
  //getting channel id
  bot.channels.cache.forEach(
    x => {
      if(VALID_CHANNELS_s.indexOf(x.name) !== -1) {
        valid_channels.push(x.id);
      }

      if(x.name == process.env.FIVE_CHANNEL) {
        five_to_eight_channel_id = x.id;
        valid_channels.push(x.id);
      }
    }
  );

  console.log('Bot ready!');
  console.log('Working on channels: ', ... VALID_CHANNELS_s);
  console.log('Five 2 eighting on channel: ', process.env.FIVE_CHANNEL);
});



var five_to_eight = (() => {

  var users = [];

  bot.users.cache.forEach( x => {

    if(!x.bot) {
      users.push(x.id);
    }

  });


  var user = users[getRandInt(users.length)];

  var channel = bot.channels.cache.get(five_to_eight_channel_id);
  channel.send("Congratulations <@" + bot.users.cache.get(user).id+ '>! you are today\'s special guest');
  channel.send("it is " + getFiveToEight());
  channel.send("No one likes you");
  channel.send("No one likes you");
  channel.send("Woa-ooo-ooo");
  channel.send("You're a cunt");

}).bind(this);

var test_event = ( () => {
  var users = [];

  bot.users.cache.forEach( x => {

    if(!x.bot) {
      users.push(x.id);
    }

  });


  var user = users[getRandInt(users.length)];


  var channel = bot.channels.cache.get(five_to_eight_channel_id);
  channel.send("Congratulations <@" + bot.users.cache.get(user).id+ '>! you are today\'s special guest');


}).bind(this);

function getRandInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getFiveToEight() {
  return five_2_eight[getRandInt(five_2_eight.length)];
}

let job = new cron.CronJob('00 55 07,19 * * *', five_to_eight); // fires every day, at 01:05:01 and 13:05:01
let job1 = new cron.CronJob('00,30 * * * * *', test_event); // fires every day, at 01:05:01 and 13:05:01

job.start();
//job1.start();


const five_2_eight = ["528", "five to eight", "7:55", "19:55"]

bot.on('message', function(msg) {

  //console.log(msg);
  console.log('recieved');

  //checks if the channel is valid
  if(valid_channels.indexOf(msg.channel.id) === -1) {
    return;
  }

  if(msg.author.bot) {
    return;
  }

  if (msg.content.toLowerCase().indexOf("when") !== -1) {
    msg.channel.send('At ' + getFiveToEight());
  }

  if(msg.content.toLowerCase().indexOf("what time is it") !== -1) {
    msg.channel.send('The time is currently ' + getFiveToEight());
  }

  
  if(msg.content.toLowerCase().indexOf("mine") !== -1) {
    msg.channel.send('M - I - N - E');
    msg.channel.send('Do your press ups!');
  }

  if(msg.content.toLowerCase().indexOf("scotland") !== -1) {
    if(getRandInt(1) === 1){ 
      msg.channel.send('Did you go to Scotland?');
    } else {
      msg.channel.send('Did you know I went to Scotland?');
    }
  }

});



bot.login(auth.token);
