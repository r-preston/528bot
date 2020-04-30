const Discord = require('discord.js');
const auth = require('./auth.json');
const cron = require('cron');
const $ = require('cheerio');
const Rainfall = require('./rainfall.js');

const request = require('request');
const http = require('http');

require('dotenv').config();

//var five_to_eight_channel_id;// = "692462958562902038";

var valid_channels = [];

var bot = new Discord.Client({
  token: auth.token,
  autorun: true,
  username: "528 bot"
});

var sex_tape_count = 1;
const sex_tape_freq = 500;
var rivers = [];

bot.on('ready', function() {

  var VALID_CHANNELS_s = process.env.VALID_CHANNELS.split(',');
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

  request('http://api.rainchasers.com/v1/river?ts=1357715085', {json: true}, (err, res, body) => {
    if(body.status === 200) {

      //maybe use river and section? it is a bit log
      //rivers = body.data.map(x => `${x.river} ${x.section}`);
      rivers = body.data.map(x => x.river);
      
      //select river immediately
      play_river();

      } else {
        rivers.push('error');
      }
    });
});



var five_to_eight = (() => {

  console.log('trying to five to eight');

  var users = [];

  bot.users.cache.forEach( x => {

    if(!x.bot) {
      users.push(x.id);
    }

  });


  var user = users[getRandInt(users.length)];

  var channel = bot.channels.cache.get(five_to_eight_channel_id);
  var message =
    "it is " + getFiveToEight() +
    "\nCongratulations <@" + bot.users.cache.get(user).id+ '>! you are today\'s special guest' +
    "\nNo one likes you" +
    "\nNo one likes you" +
    "\nWoa-ooo-oooh" +
    "\nYou're a cunt"

  channel.send(message);

  /*
  channel.send("it is " + getFiveToEight());
  channel.send("Congratulations <@" + bot.users.cache.get(user).id+ '>! you are today\'s special guest');
  channel.send("No one likes you");
  channel.send("No one likes you");
  channel.send("Woa-ooo-oooh");
  channel.send("You're a cunt");
  */

}).bind(this);

var test_event = ( () => {

  console.log('test event');

  var users = [];

  /*
  bot.users.cache.forEach( x => {

  n if(!x.bot) {
      users.push(x.id);
    }

  });


  var user = users[getRandInt(users.length)];
  */

}).bind(this);

var play_river = ( () => {

    console.log('changing river name');
  
    bot.user.setActivity('on the River ' + rivers[getRandInt(rivers.length)], {type: 'PLAYING'});
  
}).bind(this);

function getRandInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getFiveToEight() {
  return five_2_eight[getRandInt(five_2_eight.length)];
}

let morning = new cron.CronJob('00 55 07 * * *', five_to_eight); // fires every day, at 01:05:01 and 13:05:01
let afternoon = new cron.CronJob('00 55 19 * * *', five_to_eight); // fires every day, at 01:05:01 and 13:05:01
let riverhour = new cron.CronJob('00 55 0 * * *', play_river);
//let job1 = new cron.CronJob('00 * * * * *', five_to_eight); // fires every day, at 01:05:01 and 13:05:01


morning.start();
afternoon.start();
riverhour.start();
//job1.start();


const five_2_eight = ["528", "five to eight", "7:55", "19:55"]

bot.on('message', function(msg) {


  //console.log(msg);
  
  if(msg.channel === "counting" && msg.content.match(/(^|([0-9]*))21(\ |\?|$|\.|\!).*/i)) {
    msg.channel.send('Consume!!');
    return
  }

  if(msg.channel === "counting" && msg.content === "69") {
    msg.channel.send('Nice');
    return
  }

  //checks if the channel is valid
  if(valid_channels.indexOf(msg.channel.id) === -1) {
    return;
  }

  if(msg.author.bot) {
    return;
  }


  var when_rx = /(^|(.*\ ))when(\ |\?|$|\.|\!).*/i;

  if(msg.content.match(/(^|(.*\ ))owen(\ |\?|$|\.|\!).*/i) && getRandInt(20) === 0) {
    //msg.channel.send('FUCK OFF <@223141837743849473>!');
    msg.channel.send('FUCK OFF Owen!');
  }
  
  if(msg.author.id === "185132843775557638" && getRandInt(30) === 0) {
    msg.channel.send('Stop shit-chatting, Will!');
  }

  if(msg.content.match(/(^|(.*\ ))what is the time(\ |\?|$|\.|\!).*/i) || msg.content.match(/(^|(.*\ ))what time is it(\ |\?|$|\.|\!).*/i)) {
    msg.channel.send('The time is currently ' + getFiveToEight());
  }

  if (msg.content.match(when_rx)) {
    msg.channel.send('At ' + getFiveToEight());
  }

  if(msg.content.indexOf("what time is it") !== -1) {
    msg.channel.send('The time is currently ' + getFiveToEight());
  }

  if(msg.content.match(/(^|(.*\ )|([0-9]*))21(\ |\?|$|\.|\!).*/i)) {
    msg.channel.send('Consume!!');
    return;
  }

  var mine_rx = /(^|(.*\ ))mine(\ |\?|$|\.|\!).*/i;
  if(msg.content.toLowerCase().match(mine_rx)) {
    msg.channel.send('\nM - I - N - E\nDo your press ups!');
  }

  var scot_rx = /(^|(.*\ ))scotland(\ |\?|$|\.|\!).*/i;
  if(msg.content.match(scot_rx) && getRandInt(5) === 1) {
    if(getRandInt(1) === 1) {
      msg.channel.send('Did you go to Scotland?');
    } else {
      msg.channel.send('Did you know I went to Scotland?');
    }
  }
  
  if(msg.content.match(/\~rain/)) {
    var location = msg.content.toLowerCase().split(/\~rain\ /i)[1];
    Rainfall.get_rain_data(location, (output) => {
      var out = "";

      output.forEach(x => {
        out =  out + '\n' + x;
      });

      msg.channel.send(out);
    });
  }

  if(msg.content.match(/\~dart/)) {
    request('http://isthedartrunning.co.uk/dart.json', {json: true}, (err, res, body) => {

      msg.channel.send(body.text + '\nThe dart is currently at: ' + (Math.round(body.current_level *100)/100));

    });
  }

  if(msg.content.match(/\~river/)) {
    var river = msg.content.toLowerCase().split(/\~river\ /i)[1];
    //console.log('river', river);
    request('http://api.rainchasers.com/v1/river?q=' + river, {json: true}, (err, res, body) => {

      if(body.status === 200) {
        var res = "";
        body.data.forEach( (x,i) => {

          if(i == 8) {
            msg.channel.send('too many results');
            return;
          } else if (i > 8) {
            // do nothing
          } else {
            res = res + '\n' + x.river + ' ' + x.section + ' grade ' + x.grade.text;
            if(x.state) {
              res = res + ' currently on ' + (Math.round(100 * x.state.value) /100) + ' (' + x.state.text+  ')';
            }
          }
        });

        msg.channel.send(res);

      } else if(body.status === 202) {
        msg.channel.send('couldn\'t find the ' + river);
      } else {
        msg.channel.send('Something has gone terribly wrong');
      }

    });
  }

  if(msg.content.match(/\~help/)) {
    var message =
      '--- Warwick Canoe Club discord bot ---\n'
      'Type \'~river <river>\' for rain chasers info about <river>\n' +
      'Type \'~dart\' to check if the dart is running\n' +
      'Type \'~dart\' to check if the dart is running\n' +
      'Type \'~rain <location>\' for a rain forcast at <location>\n';

    msg.channel.send(message);
  }

  if(getRandInt(200) === 0) {
    msg.channel.send('```' + msg.content + '```' + ' Title of your sex tape');
    sex_tape_count = 0;
  }

  sex_tape_count++;

});


bot.login(auth.token);
