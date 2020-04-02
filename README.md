# Warwick Canoe 528 Discord Bot

## 'Features'

1. Will 528 a random user in the channel at the appropriate time. (hopefuly working)
2. Chance (1 in 20) of responding to any mention of owen with a "FUCK OFF"
3. 1 in 30 chance of telling Will to "Stop shit-chatting" (credit to Owen)
3. After seeing when in a sentence will respon with some variant of "528", "five to eight", ect.
4. Respond to any mention of a number with % 100 == 21 with "Consume!!"
5. Type "~dart" to find out if the dart is running. (Uses isthedartrunning.co.uk)
6. Type "~river <river>" to get the rain chasers information about a river (taken from rain chasers api)
7. 1 in 200 chance to respond to any message on a valid channel with "Title of your sex tape".
8. Type "~help" for a list of comands
9. Type "~rain <location" for a forcast in <location" (credit to Rowan)

## Todo

1. Fix the five 2 eighting. (works on my machine but my server doesn't like cron)
2. Make the "~river <river>" search better. Currently you can only search by rivers not by section. e.g. "dart" will work and return all section but "upper dart" returns nothing. A large part of this because rain chasers's search functionality is not good and I'm just using their API.
3. Implement circling games?

## How to test

You will need a server or channel on the warwick canoe server to test it on. (Consider the 528test channel)

You will also need to contact me for the authentication token.

First clone the repo then create a .env file with two variables `FIVE_CHANNEL` and `VALID_CHANNELS`.

`FIVE_CHANNEL` should contain a single chanel. This will be the channel that the 528ing is done on. (528 currently doesn't work).

`VALID_CHANNELS` should contain a series of channel names seperated by commas. This is list of channels that the bot will send messages to.

An example .env file would look like: 

```
FIVE_CHANNEL=five2eightme
VALID_CHANNELS=five2eightme,otherstuff,anotherchannel
```

To start the bot run `$npm run dev`. The bot will restart when it detects a file has been changed.

