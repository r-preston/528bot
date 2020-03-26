var Discord = require('discord.js');
var auth = require('./auth.json');

var cron = require('cron');

var five_to_eight_channel_id;// = "692462958562902038";

var valid_channels = [];

var bot = new Discord.Client({
  token: auth.token,
  autorun: true,
  username: "528 bot"
});

bot.on('ready', function() {

  //getting channel id
  bot.channels.cache.forEach(
    x => {
      if(x.name == 'general') {
        five_to_eight_channel_id = x.id;
        valid_channels.push(x.id);
      }
    }
  );
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

//  console.log("Congratulations " + bot.users.cache.get(user).username + '! you are today\'s special guest');

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

  console.log(msg);

  //checks if the channel is valid
  if(valid_channels.indexOf(msg.channel.id) === -1) {
    return;
  }

  if(msg.author.bot) {
    return;
  }

  if (msg.content.indexOf("when") !== -1) {
    msg.channel.send('At ' + getFiveToEight());
  }

  if(msg.content.indexOf("mine") !== -1) {
    msg.channel.send('M - I - N - I');
    msg.channel.send('Do your press ups!');
  }

});



bot.login(auth.token);
